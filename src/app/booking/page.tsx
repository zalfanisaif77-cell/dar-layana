
'use client';
import {FormEvent,useEffect,useState} from 'react';
import {Header,Footer,PageHero} from '@/components/SiteChrome';
import {property,extras} from '@/lib/property';
import {publicEstimate,stayNights,examplePrices,type MealOption} from '@/lib/booking-pricing';
import {backendConfigured,getSupabase} from '@/lib/supabase';

type BookingType='sejour'|'evenement';
const fmt=(value:number)=>value.toLocaleString('fr-TN',{maximumFractionDigits:0})+' TND';

export default function Booking(){
 const [step,setStep]=useState(1),[kind,setKind]=useState<BookingType>('sejour');
 const [arrival,setArrival]=useState(''),[departure,setDeparture]=useState('');
 const [adults,setAdults]=useState(2),[children,setChildren]=useState(0),[ages,setAges]=useState<number[]>([]);
 const [meals,setMeals]=useState<MealOption[]>([]),[special,setSpecial]=useState('');
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[phone,setPhone]=useState('');
 const [privacy,setPrivacy]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[completed,setCompleted]=useState(false);
 const nights=stayNights(arrival,departure);
 const estimate=kind==='sejour'?publicEstimate(arrival,departure,adults,children,meals):null;
 const today=new Date().toLocaleDateString('en-CA');
 useEffect(()=>{const q=new URLSearchParams(window.location.search);
  const first=q.get('arrivee'),last=q.get('depart'),a=Number(q.get('adultes')),c=Number(q.get('enfants')),g=Number(q.get('voyageurs'));
  const offer=q.get('offre');
  if(first)setArrival(first);if(last)setDeparture(last);
  if(a>=1&&a<=10)setAdults(a);else if(g>=1&&g<=10)setAdults(g);
  if(c>=0&&c<=9)setChildren(c);
  if(offer&&/événement|corporate|mariage/i.test(offer))setKind('evenement');
 },[]);
 useEffect(()=>{setAges(old=>Array.from({length:children},(_,i)=>old[i]??5));},[children]);
 function toggleMeal(meal:MealOption){setMeals(old=>old.includes(meal)?old.filter(x=>x!==meal):[...old,meal]);}
 function validStay(){
  if(kind==='evenement')return true;
  if(!arrival||!departure){setMessage('Sélectionnez les dates d’arrivée et de départ.');return false;}
  if(arrival<today||nights<2||nights>10){setMessage('Les annonces indiquent un séjour de 2 à 10 nuits. Sélectionnez une période future correspondante.');return false;}
  return true;
 }
 function validateGuests(){
  if(adults<1||adults+children>10){setMessage('La capacité annoncée est de 10 personnes au maximum, sous réserve de confirmation.');return false;}
  if(ages.some(a=>!Number.isInteger(a)||a<0||a>17)){setMessage('Indiquez un âge valide pour chaque enfant.');return false;}
  return true;
 }
 function next(){setMessage('');if(!validateGuests()||!validStay())return;setStep(s=>Math.min(3,s+1));}
 function buildText(){
  const total=adults+children;
  const extrasList=meals.map(m=>extras.find(e=>e.key===m)?.label||m);
  return [
   'Bonjour Dar Layana, je souhaite demander une disponibilité.',
   '',
   'Type : '+(kind==='sejour'?'Villa entière — séjour':'Événement / projet sur devis'),
   'Arrivée : '+(arrival||'À convenir'),
   'Départ : '+(departure||'À convenir'),
   'Durée : '+(nights?nights+' nuit(s)':'À définir'),
   'Adultes : '+adults,
   'Enfants : '+children+(children?' (âges : '+ages.join(', ')+')':''),
   'Total participants : '+total,
   'Options : '+(extrasList.length?extrasList.join(', '):'Aucune'),
   estimate?'Estimation indicative affichée : '+fmt(estimate.total):'Tarif : sur devis',
   'Commentaire : '+(special.trim()||'Aucun'),
   '',
   'Nom : '+name.trim(),
   'Email : '+email.trim(),
   'Téléphone : '+phone.trim(),
   'Je souhaite recevoir la confirmation des disponibilités et le tarif définitif.',
   'Les prix indiqués sont non contractuels.'
  ].join('\n');
 }
 function validateContact(){setMessage('');
  if(!name.trim()||!email.trim()||!phone.trim()){setMessage('Merci de compléter votre nom, votre email et votre téléphone.');return false;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setMessage('Adresse email invalide.');return false;}
  if(!privacy){setMessage('Veuillez accepter l’utilisation de vos coordonnées pour traiter cette demande.');return false;}
  return validateGuests()&&validStay();
 }
 function whatsapp(){if(!validateContact())return;
  window.location.href='https://wa.me/'+property.phoneWhatsapp+'?text='+encodeURIComponent(buildText());
 }
 async function send(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!validateContact())return;
  if(!backendConfigured){setMessage('L’envoi par formulaire n’est pas encore actif. Utilisez WhatsApp ou appelez directement la maison.');return;}
  setBusy(true);
  const details=buildText();
  const {error}=await getSupabase()!.from('booking_requests').insert({
   guest_name:name.trim(),email:email.trim(),phone:phone.trim(),
   offer_name:kind==='sejour'?'Villa entière':'Événement sur devis',
   arrival_date:arrival||null,departure_date:departure||null,
   guests:adults+children,message:details,status:'pending'
  });
  setBusy(false);
  if(error){setMessage('La demande n’a pas pu être enregistrée. Utilisez WhatsApp ou appelez la maison.');return;}
  setCompleted(true);setMessage('Votre demande est enregistrée. Elle ne constitue pas une réservation confirmée.');
 }
 return <><Header/><PageHero kicker="Demande de réservation" title="Votre séjour à Dar Layana." text="Choisissez vos dates, précisez vos voyageurs et vos prestations, puis demandez une confirmation personnalisée. Aucun paiement ne sera prélevé."/>
 <section className="section bookingPage"><div className="container">
 <div className="stepsNav" aria-label="Étapes de réservation">{['Séjour & voyageurs','Options & envies','Coordonnées & demande'].map((title,i)=><div className={'stepTab '+(step===i+1?'current ':'')+(step>i+1?'passed':'')} key={title}><span>{i+1}</span><strong>{title}</strong></div>)}</div>
 <div className="bookingColumns">
 <div className="bookingStepper">
 {step===1&&<section className="panel">
 <div className="kicker">Étape 1 / 3</div><h2 className="serif formHeading">Choisissez votre expérience</h2>
 <div className="bookingMode"><button type="button" className={kind==='sejour'?'selected':''} onClick={()=>setKind('sejour')}><strong>Villa entière</strong><span>La maison rien que pour votre séjour</span></button>
 <button type="button" className={kind==='evenement'?'selected':''} onClick={()=>setKind('evenement')}><strong>Événement sur demande</strong><span>Un projet à discuter avec la direction</span></button></div>
 <div className="formGrid bookingFields">
 <div className="field"><label htmlFor="booking-arrival">Date d’arrivée</label><input id="booking-arrival" type="date" min={today} value={arrival} onChange={e=>{setArrival(e.target.value);setMessage('');}}/></div>
 <div className="field"><label htmlFor="booking-departure">Date de départ</label><input id="booking-departure" type="date" min={arrival||today} value={departure} onChange={e=>{setDeparture(e.target.value);setMessage('');}}/></div>
 </div>
 <p className="miniHint">Pour les séjours, l’annonce publiée mentionne un minimum de 2 nuits et un maximum de 10 nuits. Pour un événement, vous pouvez préciser les dates plus tard.</p>
 <div className="guestCounters">
 <div><strong>Adultes</strong><small>18 ans et plus</small><div className="counter"><button type="button" aria-label="Retirer un adulte" disabled={adults<=1} onClick={()=>setAdults(x=>x-1)}>−</button><span>{adults}</span><button type="button" aria-label="Ajouter un adulte" disabled={adults+children>=10} onClick={()=>setAdults(x=>x+1)}>+</button></div></div>
 <div><strong>Enfants</strong><small>Moins de 18 ans</small><div className="counter"><button type="button" aria-label="Retirer un enfant" disabled={children<=0} onClick={()=>setChildren(x=>x-1)}>−</button><span>{children}</span><button type="button" aria-label="Ajouter un enfant" disabled={adults+children>=10} onClick={()=>setChildren(x=>x+1)}>+</button></div></div>
 </div>
 {children>0&&<div className="childAges"><strong>Âge des enfants</strong><div className="formGrid">{ages.map((age,i)=><div className="field" key={i}><label htmlFor={'age-'+i}>Enfant {i+1}</label><select id={'age-'+i} value={age} onChange={e=>setAges(current=>current.map((x,j)=>j===i?Number(e.target.value):x))}>{Array.from({length:18},(_,x)=><option key={x} value={x}>{x} an{x>1?'s':''}</option>)}</select></div>)}</div></div>}
 <p className="miniHint">Les sources indiquent 8 ou 10 personnes selon l’annonce. Les groupes de 9 à 10 personnes nécessitent une confirmation expresse.</p>
 {message&&<p className="notice" role="alert">{message}</p>}
 <button className="btn nextButton" type="button" onClick={next}>Continuer vers les options →</button>
 </section>}
 {step===2&&<section className="panel">
 <div className="kicker">Étape 2 / 3</div><h2 className="serif formHeading">Ajoutez ce qui rend le séjour unique</h2><p className="muted">Prestations annoncées à la carte. Les prix sont indicatifs et la disponibilité est vérifiée par Dar Layana.</p>
 <div className="mealChoices">{extras.map(item=><label className={'mealChoice '+(meals.includes(item.key)?'chosen':'')} key={item.key}><input type="checkbox" checked={meals.includes(item.key)} onChange={()=>toggleMeal(item.key)}/>
 <div><strong>{item.label}</strong><small>{item.detail}</small></div><span>{fmt(item.price)}</span></label>)}</div>
 <div className="field fieldTop"><label htmlFor="special-needs">Une occasion, des besoins particuliers ?</label><textarea id="special-needs" rows={5} value={special} onChange={e=>setSpecial(e.target.value)} maxLength={2000} placeholder="Transfert aéroport, anniversaire, demande spéciale, repas, conditions d'accessibilité…"/></div>
 <div className="bookingActions"><button className="btn ghost" type="button" onClick={()=>setStep(1)}>← Retour</button><button className="btn" type="button" onClick={next}>Continuer →</button></div>
 </section>}
 {step===3&&<section className="panel">
 <div className="kicker">Étape 3 / 3</div><h2 className="serif formHeading">Où pouvons-nous vous répondre ?</h2>
 {completed?<div role="status"><h3>Demande enregistrée.</h3><p>Merci, l’équipe pourra consulter les informations dans le back-office. Les dates ne sont pas encore confirmées.</p></div>:
 <form onSubmit={send}><div className="formGrid bookingFields">
 <div className="field"><label htmlFor="guest-name">Nom complet *</label><input id="guest-name" required autoComplete="name" maxLength={120} value={name} onChange={e=>setName(e.target.value)}/></div>
 <div className="field"><label htmlFor="guest-phone">Téléphone *</label><input id="guest-phone" type="tel" required autoComplete="tel" maxLength={40} value={phone} onChange={e=>setPhone(e.target.value)}/></div>
 <div className="field wide"><label htmlFor="guest-email">Email *</label><input id="guest-email" type="email" required autoComplete="email" maxLength={200} value={email} onChange={e=>setEmail(e.target.value)}/></div>
 </div>
 <label className="consent"><input type="checkbox" checked={privacy} onChange={e=>setPrivacy(e.target.checked)}/> J’accepte que Dar Layana utilise mes coordonnées pour répondre à ma demande de séjour. *</label>
 {message&&<p className="notice" role="status">{message}</p>}
 <div className="bookingActions"><button type="button" className="btn ghost" onClick={()=>setStep(2)}>← Retour</button>
 <button type="button" className="btn whatsappButton" onClick={whatsapp}>Demander via WhatsApp</button>
 {backendConfigured&&<button type="submit" className="btn" disabled={busy}>{busy?'Enregistrement…':'Envoyer la demande sur le site'}</button>}
 </div>
 <p className="miniHint">WhatsApp ouvrira une conversation préremplie vers le numéro public de Dar Layana, s’il est actif sur WhatsApp. Vous pourrez vérifier votre message avant de l’envoyer. Sinon, appelez directement le {property.phoneDisplay}.</p>
 </form>}
 </section>}
 </div>
 <aside className="bookingSummary"><div className="summaryImage"><img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75" alt="Villa d’illustration et non photographie de Dar Layana"/><span>Visuel d’illustration</span></div>
 <div className="summaryInner"><div className="kicker">Votre demande Dar Layana</div><h3>Une villa à Hammamet</h3><p className="muted">{property.location}</p>
 <div className="summaryRows"><div><span>Type</span><strong>{kind==='sejour'?'Villa privative':'Événement sur devis'}</strong></div>
 <div><span>Dates</span><strong>{arrival||'À choisir'} → {departure||'À choisir'}</strong></div>
 <div><span>Durée</span><strong>{nights?nights+' nuit(s)':'À choisir'}</strong></div><div><span>Voyageurs</span><strong>{adults+children} ({adults} adulte{adults>1?'s':''}, {children} enfant{children>1?'s':''})</strong></div></div>
 {estimate?<div className="estimate"><div className="estimateHead">Estimation indicative</div>
 <div><span>Hébergement ({estimate.nights} nuits)</span><strong>{fmt(estimate.accommodation)}</strong></div>
 {estimate.breakfast>0&&<div><span>Petit-déjeuner</span><strong>{fmt(estimate.breakfast)}</strong></div>}
 {estimate.lunch>0&&<div><span>Déjeuner</span><strong>{fmt(estimate.lunch)}</strong></div>}
 {estimate.dinner>0&&<div><span>Dîner</span><strong>{fmt(estimate.dinner)}</strong></div>}
 <div><span>Nettoyage (annonce publique)</span><strong>{fmt(estimate.cleaning)}</strong></div>
 <div className="estimateTotal"><strong>Total indicatif</strong><strong>{fmt(estimate.total)}</strong></div>
 <p className="miniHint">Prix publiés : {fmt(examplePrices.weekday)} en semaine, {fmt(examplePrices.weekend)} le week-end, {fmt(examplePrices.weekly)}/nuit pour 7 nuits ou plus. Les périodes spéciales, taxes éventuelles et remises peuvent modifier le résultat.</p>
 </div>:<p className="notice">Le tarif dépend des dates et de la formule. Nous vous adresserons un devis.</p>}
 <p className="miniHint">L’annonce mentionne aussi une caution de {fmt(examplePrices.guarantee)}, sous réserve de confirmation. Elle n’est pas ajoutée à cette estimation.</p>
 <a href={property.publishedPriceSource} target="_blank" rel="noopener noreferrer" className="textLink">Voir l’annonce tarifaire source →</a>
 <hr className="divider"/><p className="miniHint">{property.bookingNote}</p><a href={'tel:'+property.phoneInternational} className="textLink">Une question ? {property.phoneDisplay}</a>
 </div></aside></div></div></section><Footer/></>;
}
