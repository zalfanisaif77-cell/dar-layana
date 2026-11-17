
import Link from 'next/link';
import {property} from '@/lib/property';
const nav=[['/house','La villa'],['/rooms','Chambres'],['/experiences','Services'],['/gallery','Photos'],['/contact','Contact']];
export function Header(){return <header className="nav"><div className="container navin">
 <Link href="/" className="brand" aria-label="Dar Layana, accueil">DAR LAYANA<small>MAISON DE LA DOUCEUR · HAMMAMET</small></Link>
 <nav className="links" aria-label="Menu principal">{nav.map(([href,title])=><Link key={href} href={href}>{title}</Link>)}<Link href="/booking" className="btn">Réserver votre séjour</Link></nav>
 <details className="mobileMenu"><summary>Menu</summary><nav aria-label="Navigation mobile">{nav.map(([href,title])=><Link key={href} href={href}>{title}</Link>)}<Link href="/booking">Demander une réservation</Link></nav></details>
 </div></header>}
export function Footer(){return <footer className="footer"><div className="container footerGrid">
 <div><Link href="/" className="brand" style={{color:'white'}}>DAR LAYANA<small>MAISON DE LA DOUCEUR</small></Link>
 <p>Villa privative et maison d’hôtes à Sidi Jadidi, près de Hammamet. Séjours, piscine, convivialité et expériences sur demande.</p>
 <p className="finePrint">Photos d’ambiance illustratives en attendant les originaux de la villa. Conditions et prix à confirmer avec l’établissement.</p></div>
 <div><h4>Découvrez</h4><p><Link href="/house">La maison</Link><br/><Link href="/rooms">Les 4 chambres</Link><br/><Link href="/experiences">Équipements & restauration</Link><br/><Link href="/gallery">Photos</Link><br/><Link href="/booking">Réservation</Link></p></div>
 <div><h4>Nous contacter</h4><p>{property.address}<br/><a href={'tel:'+property.phoneInternational}>{property.phoneDisplay}</a><br/><a target="_blank" rel="noopener noreferrer" href={property.googleMaps}>Itinéraire Google Maps</a></p></div>
 </div><div className="container footerBottom">© {new Date().getFullYear()} Dar Layana · <Link href="/admin">Administration</Link></div></footer>}
export function PageHero({kicker,title,text}:{kicker:string,title:string,text:string}){return <section className="pageHero"><div className="container"><div className="kicker">{kicker}</div><h1>{title}</h1><p className="lead">{text}</p></div></section>}
