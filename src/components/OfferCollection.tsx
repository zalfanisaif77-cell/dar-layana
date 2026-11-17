
'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {defaultRooms,defaultServices,type Offer} from '@/lib/catalog';
import {backendConfigured,getSupabase} from '@/lib/supabase';

export default function OfferCollection({kind}:{kind:'rooms'|'services'}){
  const [items,setItems]=useState<Offer[]>(kind==='rooms'?defaultRooms:defaultServices);
  const [notice,setNotice]=useState('');
  useEffect(()=>{
    if(!backendConfigured)return;
    let active=true;
    getSupabase()!.from(kind).select('id,name,description,image_url,price_from,capacity,category,active,sort_order')
      .eq('active',true).order('sort_order',{ascending:true})
      .then(({data,error})=>{
        if(!active)return;
        if(error){setNotice('Catalogue momentanément indisponible : aperçu des offres affiché.');return;}
        setItems((data||[]) as Offer[]);
      });
    return ()=>{active=false;};
  },[kind]);
  if(!backendConfigured) return null;
  return <><div className="grid3 offerGrid">{items.map(item=><article className="card" key={item.id}>
    <img src={item.image_url||'/images/terrace.svg'} alt={'Illustration de '+item.name} loading="lazy"/>
    <div className="cardBody">
      {kind==='services'&&<span className="pill">{item.category||'Expérience'}</span>}
      <h3>{item.name}</h3><p className="muted">{item.description}</p>
      <div className="cardBottom">
        <span className="smallLabel">{item.price_from!==null&&item.price_from!==undefined ? 'À partir de '+Number(item.price_from).toLocaleString('fr-TN')+' TND':'Tarif et disponibilité sur demande'}</span>
        <Link className="textLink" href={'/booking?offre='+encodeURIComponent(item.name)}>Demander un devis →</Link>
      </div>
    </div>
  </article>)}</div>
  {items.length===0&&<p className="notice">Les offres seront publiées prochainement.</p>}
  {notice&&<p className="notice">{notice}</p>}
  </>;
}
