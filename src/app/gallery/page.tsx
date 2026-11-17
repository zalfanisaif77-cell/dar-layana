
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import {photos} from '@/lib/catalog';
import {property} from '@/lib/property';
const gallery=[['pool','Ambiance piscine'],['bedroom','Ambiance chambre'],['lounge','Ambiance salon'],['table','La table'],['garden','Ambiance terrasse'],['celebration','Moments à célébrer']];
export const metadata={title:'Photos et galerie | Dar Layana à Hammamet',description:'Découvrez l’univers de Dar Layana à Hammamet. Consultez les photos publiées de la propriété et explorez la galerie d’ambiance.'};
export default function Page(){return <><Header/><PageHero kicker="Galerie" title="Imaginons vos moments Dar Layana." text="À défaut d'une bibliothèque de photographies officielles fournie pour ce nouveau site, les visuels de cette page sont des inspirations et non des images de la propriété."/>
 <section className="section"><div className="container"><div className="authenticPhotos"><div><div className="kicker">Photographies réelles de Dar Layana</div><h2>Voir la maison telle qu’elle est.</h2><p>Les annonces publiées contiennent des photographies de la propriété. Consultez-les avant de faire votre demande.</p></div><a href={property.externalGallery} className="btn" target="_blank" rel="noopener noreferrer">Voir les photos de l’annonce</a></div>
 <div className="kicker">Galerie d’ambiance</div><h2>Une inspiration pour votre escapade.</h2><div className="galleryGrid">{gallery.map(([id,label])=><figure key={id}><img src={photos[id as keyof typeof photos]} loading="lazy" alt={label+' — image illustrative et non photographie officielle de Dar Layana'}/><figcaption>{label} <span>· Illustration</span></figcaption></figure>)}</div></div></section><Footer/></>}
