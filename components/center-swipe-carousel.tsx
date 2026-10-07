"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function CenterSwipeCarousel({
  children,
  className,
  ariaLabel,
  itemSelector = ".campaign-actions__item",
}: {
  children: ReactNode;
  className: string;
  ariaLabel: string;
  itemSelector?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia("(max-width: 640px)");
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(itemSelector),
    );
    let frame = 0;

    const updateCenteredCard = () => {
      window.cancelAnimationFrame(frame);
      if (!media.matches) {
        cards.forEach((card) => card.classList.remove("is-centered"));
        return;
      }

      frame = window.requestAnimationFrame(() => {
        const center = track.getBoundingClientRect().left + track.clientWidth / 2;
        let nearest: HTMLElement | undefined;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - center);
          if (distance < nearestDistance) {
            nearest = card;
            nearestDistance = distance;
          }
        });

        cards.forEach((card) => {
          card.classList.toggle("is-centered", card === nearest);
        });
      });
    };

    track.addEventListener("scroll", updateCenteredCard, { passive: true });
    window.addEventListener("resize", updateCenteredCard);
    media.addEventListener("change", updateCenteredCard);
    updateCenteredCard();

    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener("scroll", updateCenteredCard);
      window.removeEventListener("resize", updateCenteredCard);
      media.removeEventListener("change", updateCenteredCard);
      cards.forEach((card) => card.classList.remove("is-centered"));
    };
  }, [itemSelector]);

  return (
    <div
      ref={trackRef}
      className={className}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carrossel"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
