
import Link from 'next/link';
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import {namedBedrooms,property} from '@/lib/property';
import {photos} from '@/lib/catalog';
export const metadata={title:'Chambres et suites | Dar Layana Hammamet',description:'Quatre chambres dont deux suites à Dar Layana, villa privative située à Sidi Jadidi près de Hammamet. Découvrez les espaces de nuit et demandez un séjour.'};
export default function Page(){return <><Header/><PageHero kicker="Nos espaces" title="Quatre chambres pour se sentir chez soi." text="Deux suites et deux chambres doubles sont mentionnées dans les annonces de Dar Layana. La maison est proposée en formule privative ; les conditions de location par chambre sont à confirmer."/>
 <section className="section"><div className="container"><div className="sectionHead"><div><div className="kicker">Chambres & suites</div><h2>Le repos, au cœur du séjour.</h2></div><Link href="/booking" className="btn">Demander la villa</Link></div>
 <div className="roomGrid">{namedBedrooms.map((r,i)=><article key={r.title} className="roomFeature"><img src={i%2===0?photos.bedroom:photos.lounge} loading="lazy" alt={'Photo d’ambiance illustrative pour '+r.title}/><div><span className="pill">{r.kind}</span><h3>{r.title}</h3><p className="roomSubtitle">{r.subtitle}</p><p className="muted">{r.description}</p><Link className="textLink" href="/booking">Se renseigner sur ce séjour →</Link></div></article>)}</div>
 <p className="notice">Photos d’illustration. Les noms des suites Soltana, Letaifa et de la chambre Eline proviennent d’une annonce publique ; le nom et la configuration de la quatrième chambre sont à confirmer. <a href={property.externalGallery} target="_blank" rel="noopener noreferrer">Voir l’annonce source</a>.</p>
 </div></section><Footer/></>}
