
import Link from 'next/link';
import {Header,Footer} from '@/components/SiteChrome';
import BookingWidget from '@/components/BookingWidget';
import OfferCollection from '@/components/OfferCollection';
import {photos} from '@/lib/catalog';
export default function Home(){return <><Header/><main>
  <section className="hero" style={{backgroundImage:'url('+photos.pool+')'}}>
    <div className="container heroContent"><div className="eyebrow">Maison de la Douceur · Hammamet</div>
    <h1>Des instants qui restent.</h1>
    <p>Dar Layana vous invite à ralentir, vous retrouver et célébrer ce qui compte, dans l’atmosphère chaleureuse d’une maison d’hôtes à Hammamet.</p>
    <div className="actions"><Link className="btn" href="/booking">Imaginer mon séjour</Link><Link className="btn ghost" href="/experiences">Explorer les expériences</Link></div>
    </div>
  </section>
  <div className="demoRibbon">Visuels d’ambiance illustratifs · photographies officielles à intégrer</div>
  <BookingWidget/>
  <section className="section"><div className="container grid2">
    <div><div className="kicker">L’esprit Dar Layana</div><h2>Bien plus qu’une nuit.</h2>
    <p className="lead">Un cadre privé pour profiter du temps ensemble. Une parenthèse de détente, un repas partagé, un événement qui vous ressemble : chaque occasion mérite une attention particulière.</p>
    <p className="muted">Notre promesse : vous aider à imaginer un moment à votre rythme, en toute simplicité et avec des prestations clairement présentées.</p>
    <Link className="textLink" href="/house">Découvrir l’esprit de la maison →</Link></div>
    <img className="portrait" src={photos.lounge} alt="Photo d'ambiance d'un espace de vie élégant, illustrative" loading="lazy"/>
  </div></section>
  <section className="values"><div className="container grid3">
    <div><span className="valueNumber">01</span><h3>Un cadre pour se retrouver</h3><p>Des moments ensemble loin de l’agitation quotidienne.</p></div>
    <div><span className="valueNumber">02</span><h3>Des expériences à composer</h3><p>Séjour, table et événements à organiser selon vos envies.</p></div>
    <div><span className="valueNumber">03</span><h3>Un contact humain</h3><p>Une demande personnalisée plutôt qu’une réservation impersonnelle.</p></div>
  </div></section>
  <section className="section alt"><div className="container">
    <div className="sectionHead"><div><div className="kicker">Ce que nous proposons</div><h2>Un lieu, plusieurs façons de le vivre.</h2></div><Link href="/experiences" className="textLink">Toutes les expériences →</Link></div>
    <OfferCollection kind="services"/>
  </div></section>
  <section className="section"><div className="container grid2">
    <img src={photos.table} className="roundedImage" alt="Table gastronomique, photographie d'ambiance illustrative" loading="lazy"/>
    <div><div className="kicker">Pour chaque occasion</div><h2>Des moments à votre image.</h2>
    <p className="lead">Week-end en couple, retrouvailles en famille, dîner à thème ou événement privé : discutons ensemble du format qui convient à votre occasion.</p>
    <Link className="btn" href="/booking?offre=Événement%20privé">Parlons de votre projet</Link></div>
  </div></section>
  <section className="band"><div className="container bandInner"><div><div className="eyebrow">Faites le premier pas</div><h2>Votre prochain souvenir commence ici.</h2><p>Décrivez votre projet et recevez une réponse sur les possibilités, les services et les tarifs.</p></div><Link className="btn light" href="/booking">Faire une demande</Link></div></section>
</main><Footer/></>}
