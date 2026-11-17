
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import OfferCollection from '@/components/OfferCollection';
export const metadata={title:'Expériences & événements | Dar Layana Hammamet',description:'Séjour, gastronomie, événements privés et rencontres corporate : explorez les possibilités de Dar Layana à Hammamet.'};
export default function Page(){return <><Header/><PageHero kicker="Expériences & événements" title="Vos envies donnent le ton." text="Une escapade paisible, une table à partager, un événement ou une rencontre d’équipe : à Dar Layana, chaque projet commence par une conversation."/><section className="section"><div className="container"><OfferCollection kind="services"/><p className="galleryNote">Les services, disponibilités, capacités et devis sont à confirmer directement avec l’établissement.</p></div></section><Footer/></>}
