export default function SocialIcon({platform}:{platform:'Discord'|'Twitch'|'TikTok'|'YouTube'}){
 return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {platform==='Discord'&&<><path d="m8 5-4 2-2 11 5 2 1-2m8-13 4 2 2 11-5 2-1-2M8 5l1 2a17 17 0 0 1 6 0l1-2M6 16c4 3 8 3 12 0"/><circle cx="8.5" cy="12.5" r="1" fill="currentColor"/><circle cx="15.5" cy="12.5" r="1" fill="currentColor"/></>}
  {platform==='Twitch'&&<><path d="M4 3h17v12l-5 5h-5l-4 3v-3H3V6zm3 0v13h4v3l3-3h3l4-4"/><path d="M12 7v5m5-5v5"/></>}
  {platform==='TikTok'&&<><path d="M14 3h3c0 3 2 5 5 5v3a9 9 0 0 1-5-2v7a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3z"/></>}
  {platform==='YouTube'&&<><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3z" fill="currentColor" stroke="none"/></>}
 </svg>;
}
