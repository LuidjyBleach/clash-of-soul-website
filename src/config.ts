export const links = {
  repository: 'https://github.com/LuidjyBleach/clash-of-soul-updates',
  releases: 'https://github.com/LuidjyBleach/clash-of-soul-updates/releases',
  latest: 'https://github.com/LuidjyBleach/clash-of-soul-updates/releases/latest',
  discord: 'https://discord.gg/YpMH77Bw5',
  twitch: 'https://www.twitch.tv/luidjy_skyblex',
  tiktok: 'https://www.tiktok.com/@luidjy_',
  youtube: 'https://www.youtube.com/@skyblex',
  contact: '',
};
export const communityLinks = [
  {title:'Discord',description:'Échangez avec la communauté',url:links.discord,label:'Rejoindre le Discord'},
  {title:'Twitch',description:'Retrouvez les prochains directs',url:links.twitch,label:'Suivre sur Twitch'},
  {title:'TikTok',description:'Découvrez les prochaines vidéos courtes',url:links.tiktok,label:'Suivre sur TikTok'},
  {title:'YouTube',description:'Découvrez les prochaines vidéos',url:links.youtube,label:'Voir la chaîne YouTube'},
] as const;
export const releaseApi = 'https://api.github.com/repos/LuidjyBleach/clash-of-soul-updates/releases';
// Populate only after explicit approval of each screenshot and its publication rights.
export const gallery = [
  {title:'Accueil',description:'Les modes de jeu, le profil, les quêtes et les fonctionnalités principales.',shots:[{id:'home',alt:'Écran d’accueil du jeu : duel local, jeu en ligne, Palais du Roi Spirituel et quêtes Alpha. Les zones de compte sont masquées.',width:1901,height:1001}]},
  {title:'Duels',description:'Deux instants de véritables affrontements : personnages, main, Reiatsu et phases de jeu.',shots:[{id:'duel-1',alt:'Duel au tour 11, phase de combat, avec cinq personnages Shinigami sur le plateau. Les avatars et le pseudonyme sont masqués.',width:1875,height:949},{id:'duel-2',alt:'Autre duel au tour 5, phase principale, avec trois personnages Shinigami face à Grimmjow. Les avatars et le pseudonyme sont masqués.',width:1859,height:961}]},
  {title:'Collection',description:'Parcourez vos cartes, filtrez la collection et consultez les détails des personnages.',shots:[{id:'collection',alt:'Interface Collection : filtres de cartes, grille et détails de Candice Catnipp. Les zones de compte sont masquées.',width:1905,height:1009}]},
  {title:'Constructeur de decks',description:'Composez un deck de 40 cartes avec les filtres et le récapitulatif de votre sélection. La capture montre un deck en cours de construction, à 32 sur 40.',shots:[{id:'deckbuilder',alt:'Constructeur de decks : filtres, cartes et deck Shinigami en cours de composition, à 32 cartes sur 40. Les zones de compte sont masquées.',width:1899,height:1009}]},
];
