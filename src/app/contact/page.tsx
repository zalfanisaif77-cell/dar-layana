'use client';
import {FormEvent,useState} from 'react';
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import {backendConfigured,getSupabase} from '@/lib/supabase';
export default function Contact(){
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[message,setMessage]=useState(''),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();if(!backendConfigured)return;setBusy(true);
  const {error}=await getSupabase()!.from('contact_messages').insert({name,email,message,status:'new'});
  setBusy(false);setStatus(error?'Envoi impossible pour le moment.':'Message envoyé. Merci de nous avoir contactés.');
 }
 return <><Header/><PageHero kicker="Contact" title="Nous sommes à votre écoute." text="Une question, un événement à organiser ou une demande particulière ? Contactez Dar Layana."/><section className="section"><div className="container grid2"><form className="panel" onSubmit={submit}>
 {!backendConfigured&&<p className="notice">La messagerie en ligne sera activée après configuration de la base de données.</p>}
 <div className="field"><label>Nom *</label><input required maxLength={120} autoComplete="name" value={name} onChange={e=>setName(e.target.value)}/></div>
 <div className="field fieldTop"><label>Email *</label><input required type="email" maxLength={200} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
 <div className="field fieldTop"><label>Votre message *</label><textarea required rows={6} maxLength={3000} value={message} onChange={e=>setMessage(e.target.value)}/></div>
 {status&&<p className="notice" role="status">{status}</p>}<button type="submit" className="btn fieldTop" disabled={!backendConfigured||busy||status.startsWith('Message envoyé')}>{busy?'Envoi…':'Envoyer le message'}</button>
 </form><div><h2>Dar Layana, Hammamet</h2><p className="lead">Nous échangeons avec vous pour organiser séjours et expériences selon votre occasion.</p><a className="btn ghost" href="/booking">Demander une réservation</a></div></div></section><Footer/></>;
}