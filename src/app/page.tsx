
import Link from 'next/link';
import {Header,Footer} from '@/components/SiteChrome';
import BookingWidget from '@/components/BookingWidget';
import PropertyHighlights from '@/components/PropertyHighlights';
import {property} from '@/lib/property';
import {photos} from '@/lib/catalog';
export default function Home(){
 const structuredData={'@context':'https://schema.org','@type':'LodgingBusiness',name:'Dar Layana',description:'Villa privative et maison d’hôtes à Sidi Jadidi, près de Hammamet, Tunisie.',telephone:property.phoneInternational,address:{'@type':'PostalAddress',streetAddress:'Sidi Jadidi',postalCode:'8032',addressLocality:'Hammamet',addressCountry:'TN'},amenityFeature:[{ '@type':'LocationFeatureSpecification',name:'Piscine',value:true},{'@type':'LocationFeatureSpecification',name:'Wi-Fi',value:true}],url:'https://darlayana.com'};
 return <><Header/><main>
 <section className="hero" style={{backgroundImage:'url('+photos.pool+')'}}><div className="container heroContent">
 <div className="eyebrow">Villa privative · Sidi Jadidi, Hammamet</div>
 <h1>Une maison entière. Des souvenirs à partager.</h1>
 <p>Quatre chambres, piscine, jacuzzi et espaces de vie : Dar Layana réunit le confort d’une villa et le charme d’un accueil attentionné, à quelques kilomètres de Hammamet.</p>
 <div className="actions"><Link href="/booking" className="btn">Organiser mon séjour</Link><Link href="/house" className="btn ghost">Découvrir la villa</Link></div>
 </div></section><div className="demoRibbon">Photo de couverture illustrative · photos originales Dar Layana à intégrer</div>
 <BookingWidget/>
 <section className="factStrip"><div className="container factStripInner"><div><strong>4</strong><span>chambres dont 2 suites</span></div><div><strong>8–10</strong><span>occupants selon configuration*</span></div><div><strong>2–10</strong><span>nuits selon annonce</span></div><div><strong>Privé</strong><span>séjour sur demande</span></div></div><p className="container miniHint">* La capacité exacte et les conditions sont à valider au moment de votre demande.</p></section>
 <section className="section"><div className="container grid2">
 <div><div className="kicker">L’esprit Dar Layana</div><h2>Votre refuge, loin de l’agitation.</h2>
 <p className="lead">Dans le secteur calme de Sidi Jadidi, Dar Layana propose une façon plus intime de découvrir Hammamet : un séjour au rythme de vos proches, avec piscine, jardin et espaces de détente.</p>
 <p className="muted">Que vous organisiez un week-end en famille ou quelques jours entre amis, la maison se prête aux moments partagés, avec une cuisine équipée et des options de restauration sur demande.</p>
 <Link href="/house" className="textLink">Voir les équipements de la villa →</Link></div>
 <img className="portrait" src={photos.lounge} alt="Intérieur élégant, photographie illustrative et non photo de Dar Layana" loading="lazy"/></div></section>
 <section className="section alt"><div className="container"><div className="kicker">La maison en détail</div><h2>Tout pour profiter pleinement du séjour.</h2><PropertyHighlights/></div></section>
 <section className="section"><div className="container"><div className="sectionHead"><div><div className="kicker">Les espaces de nuit</div><h2>Deux suites et deux chambres.</h2><p className="lead">Des espaces pensés pour les séjours en groupe. Découvrez les quatre chambres mentionnées dans les annonces publiques.</p></div><Link className="textLink" href="/rooms">Découvrir les chambres →</Link></div>
 <div className="galleryGrid homeGallery"><img src={photos.bedroom} alt="Chambre à coucher illustrative" loading="lazy"/><img src={photos.pool} alt="Piscine illustrative" loading="lazy"/><img src={photos.table} alt="Table dressée illustrative" loading="lazy"/></div>
 <p className="galleryNote">Ces images servent d’inspiration visuelle pour la maquette, et ne représentent pas nécessairement l’intérieur réel de la villa. <a href={property.externalGallery} target="_blank" rel="noopener noreferrer">Consulter l’annonce photographique publiée</a>.</p></div></section>
 <section className="section alt"><div className="container grid2"><img src={photos.table} className="roundedImage" alt="Repas à table, illustration d'ambiance" loading="lazy"/><div><div className="kicker">À la carte</div><h2>Les plaisirs de la table, à votre rythme.</h2><p className="lead">Petit-déjeuner, déjeuner ou dîner à la carte : les prestations peuvent s’ajouter à votre séjour. Elles sont proposées séparément, selon confirmation de l’établissement.</p><Link className="textLink" href="/experiences">Voir les services et les prix publiés →</Link></div></div></section>
 <section className="section"><div className="container"><div className="kicker">Vos questions</div><h2>Préparer votre séjour en confiance.</h2><div className="faqGrid">
 <details><summary>Où se trouve Dar Layana ?</summary><p>Dans le secteur de Sidi Jadidi, à proximité de Hammamet, en Tunisie. L’adresse précise et les indications sont confirmées lors de votre réservation.</p></details>
 <details><summary>Quelle est la capacité de la villa ?</summary><p>Les plateformes indiquent 8 à 10 occupants selon la configuration. Indiquez le nombre d’adultes et d’enfants pour obtenir une réponse adaptée.</p></details>
 <details><summary>Peut-on réserver directement sur le site ?</summary><p>Le site recueille les demandes de disponibilité. L’équipe vous confirme ensuite le tarif, les dates et les conditions. Il ne s’agit pas d’une réservation instantanée.</p></details>
 <details><summary>Les repas sont-ils compris dans le prix ?</summary><p>Les repas sont présentés comme prestations supplémentaires sur l’annonce publique. Demandez le détail de la formule souhaitée.</p></details>
 </div></div></section>
 <section className="band"><div className="container bandInner"><div><div className="eyebrow">Votre parenthèse commence ici</div><h2>Des dates en tête ?</h2><p>Demandez les disponibilités de la maison et recevez une réponse personnalisée.</p></div><Link href="/booking" className="btn light">Demander une disponibilité</Link></div></section>
 </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><Footer/></>;
}
