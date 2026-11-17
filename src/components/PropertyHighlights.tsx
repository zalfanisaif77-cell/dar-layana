
import {propertyFeatures} from '@/lib/property';
export default function PropertyHighlights(){return <div className="amenitiesGrid">
 {propertyFeatures.map(f=><article className="amenity" key={f.title}>
 <span className="amenityEmoji" aria-hidden="true">{f.symbol}</span>
 <h3>{f.title}</h3><p>{f.text}</p>
 </article>)}
 </div>}
