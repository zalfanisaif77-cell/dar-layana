import {Header,Footer,PageHero} from '@/components/SiteChrome';
const imgs=['pool-night','dining','pool-family','terrace','pool-day','living-room','pool-dinner','romantic-room'];
export default function Page(){return <><Header/><PageHero kicker="Galerie" title="Des moments à imaginer." text="Images de démonstration extraites des captures sociales fournies. Pour la production, remplace-les par les photos originales haute résolution."/><section className="section"><div className="container galleryGrid">{imgs.map(i=><img key={i} src={`/images/${i}.jpg`} alt={i}/>)}</div></section><Footer/></>}
