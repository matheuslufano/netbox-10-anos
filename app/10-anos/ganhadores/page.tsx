import Link from "next/link";
import { Header, WinnersPreview } from "@/components/shared";
export default function WinnersPage(){return <><Header returnHome/><main className="subpage"><WinnersPreview/><div className="shell"><p>Nomes, cidades, datas e imagens serão publicados somente após os sorteios e conforme as condições oficiais aprovadas.</p><Link className="outline-button" href="/10-anos">Voltar à campanha</Link></div></main></>}
