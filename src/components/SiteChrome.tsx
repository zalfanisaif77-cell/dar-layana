
import Link from 'next/link';
const nav=[['/house','La maison'],['/rooms','Séjours'],['/experiences','Expériences'],['/gallery','Galerie'],['/contact','Contact']];
export function Header(){return <header className="nav"><div className="container navin">
  <Link href="/" className="brand" aria-label="Dar Layana, accueil">DAR LAYANA<small>MAISON DE LA DOUCEUR · HAMMAMET</small></Link>
  <nav className="links" aria-label="Navigation principale">{nav.map(([href,title])=><Link key={href} href={href}>{title}</Link>)}<Link className="btn" href="/booking">Demander un séjour</Link></nav>
  <details className="mobileMenu"><summary>Menu</summary><nav aria-label="Navigation mobile">{nav.map(([href,title])=><Link key={href} href={href}>{title}</Link>)}<Link href="/booking">Demander un séjour</Link></nav></details>
</div></header>}

export function Footer(){return <footer className="footer"><div className="container footerGrid">
  <div><div className="brand" style={{color:'white'}}>DAR LAYANA<small>MAISON DE LA DOUCEUR</small></div><p>Un lieu à Hammamet pour se retrouver, se ressourcer et imaginer ses moments précieux.</p><p className="finePrint">Les photos d’ambiance de cette maquette ne représentent pas nécessairement Dar Layana. Prestations et tarifs sur confirmation.</p></div>
  <div><h4>Explorer</h4><p><Link href="/house">La maison</Link><br/><Link href="/rooms">Séjours</Link><br/><Link href="/experiences">Expériences & événements</Link><br/><Link href="/gallery">Galerie</Link></p></div>
  <div><h4>Votre projet</h4><p><Link href="/booking">Demander des disponibilités</Link><br/><Link href="/contact">Nous écrire</Link></p><p>Hammamet, Tunisie</p></div>
</div><div className="container footerBottom">© {new Date().getFullYear()} Dar Layana · <Link href="/admin">Espace de gestion</Link></div></footer>}
export function PageHero({kicker,title,text}:{kicker:string,title:string;text:string}){return <section className="pageHero"><div className="container"><div className="kicker">{kicker}</div><h1>{title}</h1><p className="lead">{text}</p></div></section>}
