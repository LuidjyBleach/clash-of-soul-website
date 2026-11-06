import { useEffect, useRef, useState } from 'react';
import { gallery } from '../config';
export default function Gallery() {
  const [selected,setSelected]=useState<number|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{if(selected!==null)dialog.current?.showModal();else dialog.current?.close();},[selected]);
  return <div className="gallery" aria-label="Aperçus du jeu"><div className="gallery-heading"><h3>Un aperçu de votre aventure</h3><span>CAPTURES EN ATTENTE DE VALIDATION</span></div><div className="gallery-grid">{gallery.map((item,i)=><figure key={item.title}>{item.src?<button onClick={()=>setSelected(i)} aria-label={'Agrandir : '+item.title}><img src={import.meta.env.BASE_URL+item.src} alt={item.alt} loading="lazy" width="640" height="360"/></button>:<div className={'gallery-placeholder gallery-placeholder-'+i}><span className="placeholder-mark">✦</span><small>CAPTURE À VALIDER</small></div>}<figcaption><b>{item.title}</b><span>{item.description}</span></figcaption></figure>)}</div><dialog ref={dialog} onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}><button className="gallery-close" onClick={()=>setSelected(null)} autoFocus>Fermer ×</button>{selected!==null&&<><img src={import.meta.env.BASE_URL+gallery[selected].src} alt={gallery[selected].alt}/><p>{gallery[selected].title}</p></>}</dialog></div>;
}
