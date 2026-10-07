import { ArrowUpRight, CalendarDays, ListChecks, Megaphone, Trophy, Users } from "lucide-react";
import { Logo } from "@/components/shared";

// Exemplos visuais; não representam números atribuídos a um participante.
const exampleNumbers = ["000007", "000010", "000025", "000031", "000018"];

export function ParticipationArtwork({ step }: { step: number }) {
  return (
    <div className={`participation-art participation-art--${step}`} aria-hidden="true" inert>
      {step === 1 && <>
        <div className="participation-art__document"><Logo /><i /><i /><i /></div>
        <ArrowUpRight className="participation-art__upgrade" />
        <div className="participation-art__people"><Users /></div>
        <Megaphone className="participation-art__megaphone" />
        <div className="participation-art__podium" />
      </>}
      {step === 2 && <>
        <div className="participation-art__globe">
          {exampleNumbers.map(number => <span key={number}>{number}</span>)}
        </div>
        <div className="participation-art__base"><Logo /></div>
      </>}
      {step === 3 && <div className="participation-art__phone">
        <div className="participation-art__notch" /><Logo />
        <div className="participation-art__screen-card"><b>Seus números da sorte</b><div className="participation-art__numbers">{exampleNumbers.slice(0, 4).map(number => <span key={number}>{number}</span>)}</div></div>
        <div className="participation-art__phone-row"><CalendarDays />Próximos sorteios</div>
        <div className="participation-art__phone-row"><Trophy />Resultados</div>
        <div className="participation-art__phone-row"><ListChecks />Histórico de ações</div>
      </div>}
    </div>
  );
}
