
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import OfferCollection from '@/components/OfferCollection';
export const metadata={title:'Séjours à Dar Layana | Maison d’hôtes à Hammamet',description:'Organisez votre séjour à Dar Layana à Hammamet. Découvrez un cadre privé, des espaces de repos et des expériences sur demande.'};
export default function Page(){return <><Header/><PageHero kicker="Séjours" title="Le temps de vous retrouver." text="Que vous veniez à deux, en famille ou entre amis, découvrez nos propositions et contactez-nous pour la configuration, les tarifs et les dates disponibles."/><section className="section"><div className="container"><OfferCollection kind="rooms"/><p className="galleryNote">La capacité, les types de chambres et les tarifs exacts sont communiqués après vérification avec l’établissement. Les photos sont illustratives.</p></div></section><Footer/></>}
