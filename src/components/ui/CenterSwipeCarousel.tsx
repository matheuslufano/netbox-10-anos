"use client";
import { useEffect, useRef, type ReactNode } from "react";
/** Centraliza cartões no mobile e sinaliza seu estado por data-centered, sem depender do CSS. */
export function CenterSwipeCarousel({ children, className, ariaLabel, styleHooks, focusTheme = false, }: {
  children: ReactNode;
  className: string;
  ariaLabel: string;
  styleHooks?: string;
  focusTheme?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track)
      return;
    const media = window.matchMedia("(max-width: 640px)");
    const focusMedia = window.matchMedia("(max-width: 640px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const focusSection = focusTheme
      ? track.closest<HTMLElement>("[data-participation-section]")
      : null;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    let frame = 0;
    let themeObserver: IntersectionObserver | undefined;
    let wasInFocusArea = false;
    let revealAnimation: Animation | undefined;
    const updateFocusTheme = () => {
      if (!focusSection)
        return;
      const bounds = focusSection.getBoundingClientRect();
      const focusAreaTop = window.innerHeight * 0.28;
      const focusAreaBottom = window.innerHeight * 0.72;
      const isInFocusArea = bounds.bottom > focusAreaTop && bounds.top < focusAreaBottom;
      const shouldReveal = focusMedia.matches && isInFocusArea;
      if (shouldReveal && !wasInFocusArea && !reducedMotion.matches) {
        revealAnimation?.cancel();
        revealAnimation = track.animate([
          { opacity: 0.45, transform: "translateY(28px) scale(0.98)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ], { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
      }
      wasInFocusArea = shouldReveal;
      const selectedMode = document.body.dataset.themeMode;
      const shouldUseDarkTheme = selectedMode === "dark" || (focusMedia.matches && isInFocusArea);
      document.body.dataset.theme = shouldUseDarkTheme ? "dark" : "light";
    };
    const observeFocusSection = () => {
      if (!focusSection || !("IntersectionObserver" in window)) {
        updateFocusTheme();
        return;
      }
      themeObserver?.disconnect();
      const inset = Math.round(window.innerHeight * 0.28);
      themeObserver = new IntersectionObserver(updateFocusTheme, {
        rootMargin: `-${inset}px 0px -${inset}px 0px`,
      });
      themeObserver.observe(focusSection);
      updateFocusTheme();
    };
    const updateCenteredCard = () => {
      window.cancelAnimationFrame(frame);
      if (!media.matches) {
        cards.forEach((card) => { delete card.dataset.centered; });
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
          card.dataset.centered = String(card === nearest);
        });
      });
    };
    const handleNextClick = (event: MouseEvent) => {
      if (!media.matches || !(event.target instanceof Element))
        return;
      if (!event.target.closest("[data-carousel-next]"))
        return;
      const nextCard = cards[1];
      if (!nextCard)
        return;
      const trackBounds = track.getBoundingClientRect();
      const cardBounds = nextCard.getBoundingClientRect();
      track.scrollBy({
        left: cardBounds.left + cardBounds.width / 2 -
          (trackBounds.left + trackBounds.width / 2),
        behavior: "smooth",
      });
    };
    track.addEventListener("scroll", updateCenteredCard, { passive: true });
    track.addEventListener("click", handleNextClick);
    window.addEventListener("resize", updateCenteredCard);
    media.addEventListener("change", updateCenteredCard);
    if (focusSection) {
      observeFocusSection();
      window.addEventListener("resize", observeFocusSection);
      focusMedia.addEventListener("change", updateFocusTheme);
      window.addEventListener("netbox:theme-auto-resume", updateFocusTheme);
    }
    updateCenteredCard();
    return () => {
      window.cancelAnimationFrame(frame);
      revealAnimation?.cancel();
      track.removeEventListener("scroll", updateCenteredCard);
      track.removeEventListener("click", handleNextClick);
      window.removeEventListener("resize", updateCenteredCard);
      media.removeEventListener("change", updateCenteredCard);
      themeObserver?.disconnect();
      window.removeEventListener("resize", observeFocusSection);
      focusMedia.removeEventListener("change", updateFocusTheme);
      window.removeEventListener("netbox:theme-auto-resume", updateFocusTheme);
      if (focusSection &&
        document.body.dataset.themeMode !== "dark") {
        document.body.dataset.theme = "light";
      }
      cards.forEach((card) => { delete card.dataset.centered; });
    };
  }, [focusTheme]);
  return (<div
    ref={trackRef}
    className={className}
    data-ui={["center-swipe-carousel", styleHooks].filter(Boolean).join(" ")}
    role="region"
    aria-label={ariaLabel}
    aria-roledescription="carrossel"
    tabIndex={0}
  >
    {children}
  </div>);
}
