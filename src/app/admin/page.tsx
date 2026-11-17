'use client';
import {FormEvent,useCallback,useEffect,useState} from 'react';
import Link from 'next/link';
import {backendConfigured,getSupabase} from '@/lib/supabase';
type Offer={id?:string;name:string;description:string;image_url:string;price_from:number|null;capacity:number|null;category:string|null;sort_order:number;active:boolean};
type Booking={id:string;created_at:string;guest_name:string;email:string;phone:string;offer_name:string;arrival_date:string|null;departure_date:string|null;guests:number;message:string|null;status:string;admin_notes:string|null};
type Message={id:string;created_at:string;name:string;email:string;message:string;status:string};
type Tab='Dashboard'|'Réservations'|'Messages'|'Séjours'|'Services';
const blank:Offer={name:'',description:'',image_url:'',price_from:null,capacity:null,category:null,sort_order:10,active:true};
const statuses=['pending','contacted','confirmed','cancelled'];
export default function Admin(){
 const sb=getSupabase();
 const [user,setUser]=useState(false),[authorized,setAuthorized]=useState(false),[ready,setReady]=useState(false),[email,setEmail]=useState(''),[password,setPassword]=useState('');
 const [tab,setTab]=useState<Tab>('Dashboard'),[bookings,setBookings]=useState<Booking[]>([]),[messages,setMessages]=useState<Message[]>([]),[rooms,setRooms]=useState<Offer[]>([]),[services,setServices]=useState<Offer[]>([]);
 const [editing,setEditing]=useState<Offer|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(''),[notes,setNotes]=useState<Record<string,string>>({});
 const load=useCallback(async()=>{
  if(!sb)return;
  const [b,m,r,s]=await Promise.all([
   sb.from('booking_requests').select('*').order('created_at',{ascending:false}).limit(250),
   sb.from('contact_messages').select('*').order('created_at',{ascending:false}).limit(250),
   sb.from('rooms').select('*').order('sort_order'),
   sb.from('services').select('*').order('sort_order')
  ]);
  if(b.error||m.error||r.error||s.error){setError('Lecture refusée. Vérifiez le schéma et les droits administrateur.');return;}
  setBookings(b.data||[]);setMessages(m.data||[]);setRooms(r.data||[]);setServices(s.data||[]);
  setNotes(Object.fromEntries((b.data||[]).map(x=>[x.id,x.admin_notes||''])));
 },[sb]);
 useEffect(()=>{if(!sb){setReady(true);return;}let alive=true;
  sb.auth.getUser().then(async ({data})=>{if(!alive)return;
   const present=Boolean(data.user);setUser(present);
   if(present){const {data:allow}=await sb.rpc('is_admin');if(alive)setAuthorized(Boolean(allow));}
   if(alive)setReady(true);
  });
  return ()=>{alive=false};
 },[sb]);
 useEffect(()=>{if(authorized)void load();},[authorized,load]);
 async function login(e:FormEvent){e.preventDefault();if(!sb)return;setBusy(true);setError('');
  const {data,error:failure}=await sb.auth.signInWithPassword({email,password});
  setBusy(false);if(failure){setError('Identifiants incorrects.');return;}
  setUser(Boolean(data.user));const {data:allow}=await sb.rpc('is_admin');setAuthorized(Boolean(allow));
  if(!allow)setError('Ce compte ne dispose pas des droits administrateur.');
 }
 async function logout(){await sb?.auth.signOut();setUser(false);setAuthorized(false);setPassword('');}
 async function bookingUpdate(id:string,status:string,admin_notes?:string){
  if(!sb)return;const update=admin_notes===undefined?{status}:{admin_notes};
  const {error:failure}=await sb.from('booking_requests').update(update).eq('id',id);
  if(failure)setError('Mise à jour impossible.');else await load();
 }
 async function messageUpdate(id:string,status:string){if(!sb)return;const {error:failure}=await sb.from('contact_messages').update({status}).eq('id',id);if(failure)setError('Mise à jour impossible.');else await load();}
 async function saveOffer(e:FormEvent){e.preventDefault();if(!sb||!editing)return;setBusy(true);setError('');
  const table=tab==='Séjours'?'rooms':'services';
  const {id,...payload}=editing;
  const {error:failure}=id?await sb.from(table).update(payload).eq('id',id):await sb.from(table).insert(payload);
  setBusy(false);if(failure)setError('Enregistrement impossible.');else{setEditing(null);await load();}
 }
 async function upload(file:File){if(!sb||!editing)return;
  if(file.size>8*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type)){setError('Image JPG, PNG ou WebP de 8 Mo maximum.');return;}
  setBusy(true);const path=crypto.randomUUID()+'.'+(file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg');
  const {error:failure}=await sb.storage.from('dar-layana-images').upload(path,file,{contentType:file.type});
  setBusy(false);if(failure){setError('Échec du transfert de la photo.');return;}
  const url=sb.storage.from('dar-layana-images').getPublicUrl(path).data.publicUrl;
  setEditing({...editing,image_url:url});
 }
 if(!backendConfigured)return <div className="login"><div className="loginBox"><h1>Back-office à configurer</h1><p>Connectez Supabase, appliquez le schéma SQL et créez un compte administrateur (voir SETUP.md).</p><Link className="btn" href="/">Retour au site</Link></div></div>;
 if(!ready)return <div className="login">Vérification de la session…</div>;
 if(!authorized)return <div className="login"><form onSubmit={login} className="loginBox"><div className="brand">DAR LAYANA<small>ESPACE DE GESTION</small></div><h1>Connexion sécurisée</h1>
  <p className="muted">{user?'Compte connecté, sans droits administrateur.':'Connectez-vous avec votre compte professionnel autorisé.'}</p>
  <label>Email</label><input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/>
  <label>Mot de passe</label><input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/>
  {error&&<p className="notice" role="alert">{error}</p>}<button className="btn" type="submit" disabled={busy}>Se connecter</button>
  {user&&<button type="button" className="btn ghost" onClick={logout}>Changer de compte</button>}</form></div>;
 return <div className="adminWrap"><div className="adminLayout"><aside className="sidebar"><Link href="/" className="brand">DAR LAYANA<small>GESTION</small></Link>
 <div className="sideNav">{(['Dashboard','Réservations','Messages','Séjours','Services'] as Tab[]).map(t=><button key={t} onClick={()=>{setTab(t);setEditing(null);setError('')}} className={tab===t?'active':''}>{t}</button>)}</div>
 <button className="btn ghost adminLogout" onClick={logout}>Se déconnecter</button></aside>
 <main className="adminMain"><div className="adminTop"><div><div className="kicker">Back-office Dar Layana</div><h1>{tab}</h1></div><div className="adminActions"><button onClick={()=>void load()}>Actualiser</button><Link className="btn" href="/">Voir le site</Link></div></div>
 {error&&<p role="alert" className="notice">{error}</p>}
 {tab==='Dashboard'&&<><div className="statGrid">{[['Demandes',bookings.length],['En attente',bookings.filter(b=>b.status==='pending').length],['Messages nouveaux',messages.filter(m=>m.status==='new').length],['Offres publiées',[...rooms,...services].filter(o=>o.active).length]].map(([label,value])=><div className="stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
  <div className="panel panelTop"><h2 className="serif bigSub">Dernières demandes</h2><div className="adminTableWrap"><table className="table"><thead><tr><th>Date</th><th>Client</th><th>Projet</th><th>Statut</th></tr></thead><tbody>{bookings.slice(0,8).map(b=><tr key={b.id}><td>{new Date(b.created_at).toLocaleDateString('fr-TN')}</td><td>{b.guest_name}</td><td>{b.offer_name}</td><td>{b.status}</td></tr>)}</tbody></table></div></div></>}
 {tab==='Réservations'&&<div className="panel"><p className="muted">Les demandes ne sont pas des réservations confirmées. Vérifiez manuellement les disponibilités et contactez le client.</p><div className="adminTableWrap"><table className="table"><thead><tr><th>Client</th><th>Projet</th><th>Dates</th><th>Notes et statut</th></tr></thead><tbody>{bookings.map(b=><tr key={b.id}><td><strong>{b.guest_name}</strong><br/><a href={'mailto:'+b.email}>{b.email}</a><br/><a href={'tel:'+b.phone}>{b.phone}</a></td><td>{b.offer_name}<br/>{b.guests} pers.<p>{b.message}</p></td><td>{b.arrival_date||'—'}<br/>{b.departure_date||'—'}</td><td><select className="formControl" value={b.status} onChange={e=>void bookingUpdate(b.id,e.target.value)} aria-label={'Statut '+b.guest_name}>{statuses.map(s=><option key={s} value={s}>{s}</option>)}</select><textarea rows={2} className="formControl fieldTop" value={notes[b.id]||''} onChange={e=>setNotes({...notes,[b.id]:e.target.value})} placeholder="Notes internes"/><button onClick={()=>void bookingUpdate(b.id,b.status,notes[b.id]||'')}>Enregistrer les notes</button></td></tr>)}</tbody></table></div></div>}
 {tab==='Messages'&&<div className="panel"><div className="adminTableWrap"><table className="table"><thead><tr><th>Contact</th><th>Message</th><th>Statut</th></tr></thead><tbody>{messages.map(m=><tr key={m.id}><td>{m.name}<br/><a href={'mailto:'+m.email}>{m.email}</a></td><td>{m.message}</td><td><select className="formControl" aria-label={'État '+m.name} value={m.status} onChange={e=>void messageUpdate(m.id,e.target.value)}><option value="new">Nouveau</option><option value="handled">Traité</option></select></td></tr>)}</tbody></table></div></div>}
 {(tab==='Séjours'||tab==='Services')&&<><div className="adminActions" style={{marginBottom:16}}><button className="btn" onClick={()=>setEditing({...blank})}>+ Nouvelle offre</button></div>
 {editing&&<form className="panel" onSubmit={saveOffer}><h2 className="serif bigSub">Éditer une offre</h2><div className="adminForm">
 <div><label>Nom *</label><input required maxLength={160} value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})}/></div>
 <div><label>Catégorie</label><input maxLength={100} value={editing.category||''} onChange={e=>setEditing({...editing,category:e.target.value})}/></div>
 <div className="wide"><label>Description *</label><textarea required rows={4} maxLength={3000} value={editing.description} onChange={e=>setEditing({...editing,description:e.target.value})}/></div>
 <div className="wide"><label>Photo (URL)</label><input type="url" value={editing.image_url} onChange={e=>setEditing({...editing,image_url:e.target.value})}/></div>
 <div className="wide"><label>Ou importer une photo originale (JPG/PNG/WebP, max 8 Mo)</label><input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file);}}/></div>
 <div><label>Prix à partir de (TND), facultatif</label><input type="number" min={0} step="0.001" value={editing.price_from??''} onChange={e=>setEditing({...editing,price_from:e.target.value===''?null:Number(e.target.value)})}/></div>
 <div><label>Capacité, facultative</label><input type="number" min={1} value={editing.capacity??''} onChange={e=>setEditing({...editing,capacity:e.target.value===''?null:Number(e.target.value)})}/></div>
 <div><label>Position</label><input type="number" value={editing.sort_order} onChange={e=>setEditing({...editing,sort_order:Number(e.target.value)})}/></div>
 <div><label>Visibilité</label><select value={editing.active?'on':'off'} onChange={e=>setEditing({...editing,active:e.target.value==='on'})}><option value="on">Publié</option><option value="off">Masqué</option></select></div>
 <div className="adminActions wide"><button type="submit" className="btn" disabled={busy}>{busy?'Traitement…':'Enregistrer'}</button><button type="button" onClick={()=>setEditing(null)}>Annuler</button></div></div></form>}
 <div className="grid3">{(tab==='Séjours'?rooms:services).map(o=><article className="card" key={o.id}>{o.image_url&&<img src={o.image_url} loading="lazy" alt=""/>}<div className="cardBody"><span className="pill">{o.active?'Publié':'Masqué'}</span><h3>{o.name}</h3><p className="muted">{o.description}</p><p>{o.price_from==null?'Sur demande':o.price_from+' TND'}</p><button onClick={()=>setEditing({...o})} className="btn">Modifier</button></div></article>)}</div></>}
 </main></div></div>;
}