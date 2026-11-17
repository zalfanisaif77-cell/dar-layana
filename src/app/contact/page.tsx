
'use client';
import {FormEvent,useState} from 'react';
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import {backendConfigured,getSupabase} from '@/lib/supabase';
import {property} from '@/lib/property';
export default function Contact(){
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[message,setMessage]=useState(''),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setStatus('');if(!backendConfigured){setStatus('La messagerie n’est pas encore connectée. Contactez-nous par téléphone.');return;}setBusy(true);
  const {error}=await getSupabase()!.from('contact_messages').insert({name,email,message,status:'new'});
  setBusy(false);setStatus(error?'Envoi impossible pour le moment.':'Message enregistré. L’équipe pourra en prendre connaissance.');
 }
 return <><Header/><PageHero kicker="Contact" title="Votre prochain séjour commence ici." text="Une question sur la villa, les repas ou un événement ? Contactez notre équipe et présentez-nous votre projet."/>
 <section className="section"><div className="container grid2"><div className="panel">
 <h2>Nous écrire</h2><p className="muted">Notre formulaire d’envoi est en cours de connexion. Vous pouvez nous appeler directement.</p>
 <form onSubmit={submit}>
 <div className="field"><label>Nom *</label><input required maxLength={120} autoComplete="name" value={name} onChange={e=>setName(e.target.value)}/></div>
 <div className="field fieldTop"><label>Email *</label><input type="email" required maxLength={200} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
 <div className="field fieldTop"><label>Message *</label><textarea required rows={6} maxLength={3000} value={message} onChange={e=>setMessage(e.target.value)}/></div>
 {status&&<p className="notice" role="status">{status}</p>}<button className="btn fieldTop" type="submit" disabled={!backendConfigured||busy}>{busy?'Envoi…':'Envoyer le message'}</button>
 </form></div><div><div className="kicker">Dar Layana</div><h2>Sidi Jadidi, près de Hammamet.</h2><p className="lead">{property.address}</p><p><a className="btn" href={'tel:'+property.phoneInternational}>Appeler {property.phoneDisplay}</a></p><p><a href={property.googleMaps} target="_blank" rel="noopener noreferrer" className="textLink">Voir l’emplacement Google Maps →</a></p><p className="muted">Pour les dates et l’estimation d’un séjour, utilisez le formulaire de réservation.</p><a className="textLink" href="/booking">Préparer une demande de séjour →</a></div></div></section><Footer/></>;
}
