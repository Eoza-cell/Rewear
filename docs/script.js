const productsSeed=[
{id:1,title:"Veste denim vintage",category:"Vêtements",price:8500,size:"M",condition:"Très bon état",seller:"Aïcha",city:"Ouagadougou",tag:"COUP DE CŒUR",image:""},
{id:2,title:"Sac en cuir camel",category:"Accessoires",price:12000,size:"Unique",condition:"Excellent état",seller:"Mariam",city:"Bobo-Dioulasso",tag:"PIÈCE UNIQUE",image:""},
{id:3,title:"Sneakers rétro",category:"Chaussures",price:18000,size:"39",condition:"Très bon état",seller:"Yanis",city:"Ouagadougou",tag:"BON PLAN",image:""},
{id:4,title:"Chemise lin naturel",category:"Vêtements",price:6500,size:"L",condition:"Comme neuf",seller:"Inès",city:"Koudougou",tag:"SELECTION",image:""},
{id:5,title:"Lunettes soleil rétro",category:"Accessoires",price:4500,size:"Unique",condition:"Bon état",seller:"Kader",city:"Ouagadougou",tag:"PETIT PRIX",image:""},
{id:6,title:"Baskets minimalistes",category:"Chaussures",price:14500,size:"40",condition:"Excellent état",seller:"Sonia",city:"Bobo-Dioulasso",tag:"COUP DE CŒUR",image:""},
{id:7,title:"Pull doux oversize",category:"Vêtements",price:7000,size:"XL",condition:"Très bon état",seller:"Fatou",city:"Ouahigouya",tag:"SELECTION",image:""},
{id:8,title:"Lampe design",category:"Maison",price:9500,size:"Unique",condition:"Bon état",seller:"Nadia",city:"Ouagadougou",tag:"TROUVAILLE",image:""}
];
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
let products=[...productsSeed,...JSON.parse(localStorage.getItem("rewear-products")||"[]")];let favorites=JSON.parse(localStorage.getItem("rewear-favs")||"[]");let category="Tout",onlyFav=false;
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
function artClass(category){return ({Vêtements:"mode",Chaussures:"shoes",Accessoires:"accessoires",Maison:"maison",Électronique:"tech",Livres:"livres"})[category]||"autres"}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}
function render(){let q=$("#searchInput").value.toLowerCase(),sort=$("#sortSelect").value;let list=products.filter(p=>(category==="Tout"||p.category===category)&&(!onlyFav||favorites.includes(p.id))&&(p.title+" "+p.category+" "+p.seller).toLowerCase().includes(q));if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);$("#productGrid").innerHTML=list.map(p=>`<article class="product-card" data-product="${p.id}"><div class="product-image">${p.image?`<img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy">`:`<div class="bf-art bf-${artClass(p.category)}"><span>REWEAR</span><b>${escapeHtml(p.category)}</b><small>🇧🇫 · TROUVAILLE LOCALE</small></div>`}<span class="product-tag">${p.tag||"NOUVEAUTÉ"}</span><button class="heart ${favorites.includes(p.id)?"active":""}" data-fav="${p.id}" aria-label="Ajouter aux favoris">${favorites.includes(p.id)?"♥":"♡"}</button></div><div class="product-info"><div class="product-line"><h3>${escapeHtml(p.title)}</h3><span class="product-price">${money(p.price)}</span></div><div class="product-meta">${p.size} · ${p.condition||"Bon état"}</div><div class="product-bottom"><span class="seller">📍 ${escapeHtml(p.city||"Burkina Faso")} · ${escapeHtml(p.seller||"Membre REWEAR")}</span><button class="contact-btn" data-contact="${p.id}">Contacter ↗</button></div></div></article>`).join("");$("#emptyState").hidden=list.length>0;$("#favCount").textContent=favorites.length;$$("[data-fav]").forEach(b=>b.onclick=()=>toggleFav(+b.dataset.fav));$$("[data-contact]").forEach(b=>b.onclick=()=>toast("La messagerie sera activée avec ton compte REWEAR."))}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toggleFav(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("rewear-favs",JSON.stringify(favorites));render()}
$$(".category-card").forEach(b=>b.onclick=()=>{$$(".category-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");category=b.dataset.category;onlyFav=false;$("#favFilter").classList.remove("active");render();$("#shop").scrollIntoView({behavior:"smooth"})});
$("#searchInput").oninput=render;$("#sortSelect").onchange=render;$("#favFilter").onclick=()=>{onlyFav=!onlyFav;$("#favFilter").classList.toggle("active",onlyFav);render()};$("#favNav").onclick=()=>{onlyFav=true;$("#favFilter").classList.add("active");render();$("#shop").scrollIntoView({behavior:"smooth"})};$("#searchToggle").onclick=()=>{$("#searchInput").focus();$("#shop").scrollIntoView({behavior:"smooth"})};$("#viewAll").onclick=()=>{$("#searchInput").value="";category="Tout";onlyFav=false;$$(".category-card").forEach(x=>x.classList.toggle("selected",x.dataset.category==="Tout"));$("#favFilter").classList.remove("active");render()};
function openModal(){$("#sellModal").classList.add("open");document.body.style.overflow="hidden"}function closeModal(){$("#sellModal").classList.remove("open");document.body.style.overflow=""}
["#sellTop","#sellHero","#sellBanner","#mobileSell"].forEach(s=>$(s).onclick=openModal);$$("[data-close]").forEach(b=>b.onclick=closeModal);$("#sellModal").onclick=e=>{if(e.target===$("#sellModal"))closeModal()};document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#sellForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);let item={id:Date.now(),title:f.get("title"),category:f.get("category"),price:+f.get("price"),size:f.get("size")||"Non précisé",condition:f.get("condition")||"Bon état",city:f.get("city")||"Ouagadougou",description:f.get("description")||"",seller:(rewearUser?.name||"Membre REWEAR"),tag:"NOUVEAUTÉ",image:window.rewearUploadedImage||f.get("image")||""};products.unshift(item);let saved=JSON.parse(localStorage.getItem("rewear-products")||"[]");saved.unshift(item);localStorage.setItem("rewear-products",JSON.stringify(saved));category="Tout";$$(".category-card").forEach(x=>x.classList.toggle("selected",x.dataset.category==="Tout"));e.target.reset();window.rewearUploadedImage="";closeModal();render();toast("Ton article est ajouté à la vitrine !");$("#shop").scrollIntoView({behavior:"smooth"})};
$("#newsletterForm").onsubmit=e=>{e.preventDefault();toast("Merci ! Tu es dans la liste REWEAR ✳");e.target.reset()};$("#menuBtn").onclick=()=>$("#mobileMenu").classList.toggle("open");$$(".mobile-menu a").forEach(a=>a.onclick=()=>$("#mobileMenu").classList.remove("open"));render();

// Fiche détaillée d'un article — démonstration locale
function openProductDetails(id){
 const p=products.find(item=>String(item.id)===String(id)); if(!p)return;
 let layer=document.getElementById("productDetailModal");
 if(!layer){layer=document.createElement("div");layer.id="productDetailModal";layer.className="modal-backdrop detail-modal";layer.innerHTML='<div class="modal"><button class="close-modal" data-detail-close aria-label="Fermer">×</button><div id="productDetailContent"></div></div>';document.body.appendChild(layer);
 layer.addEventListener("click",e=>{if(e.target===layer||e.target.closest("[data-detail-close]"))layer.classList.remove("open")});
 layer.addEventListener("click",e=>{const fav=e.target.closest("[data-detail-fav]");if(fav){toggleFav(Number(fav.dataset.detailFav));openProductDetails(fav.dataset.detailFav)}});
 }
 $("#productDetailContent").innerHTML='<div class="detail-layout">'+(p.image?'<img class="detail-photo" src="'+escapeHtml(p.image)+'" alt="'+escapeHtml(p.title)+'">':'<div class="detail-photo bf-art bf-'+artClass(p.category)+'"><span>REWEAR</span><b>'+escapeHtml(p.category)+'</b><small>🇧🇫 · TROUVAILLE LOCALE</small></div>')+'<div class="detail-copy"><div class="eyebrow">TROUVAILLE REWEAR</div><h2>'+escapeHtml(p.title)+'</h2><div class="detail-price">'+money(p.price)+'</div><p class="detail-description">'+escapeHtml(p.description||"Un article proposé par la communauté REWEAR. Consulte les informations avec le vendeur avant tout achat.")+'</p><div class="detail-meta">Catégorie : '+escapeHtml(p.category)+'<br>État : '+escapeHtml(p.condition||"Bon état")+'<br>Taille : '+escapeHtml(p.size||"Non précisée")+'<br>Vendeur : '+escapeHtml(p.seller||"Membre REWEAR")+'</div><div class="detail-actions"><button class="detail-fav" data-detail-fav="'+p.id+'">'+(favorites.includes(p.id)?"♥ Retirer des favoris":"♡ Ajouter aux favoris")+'</button><button class="detail-contact" data-detail-contact>Contacter le vendeur</button></div><small class="demo-note">Démo : aucun achat ni message réel n\'est envoyé.</small></div></div>';
 layer.classList.add("open");
 layer.querySelector("[data-detail-contact]").onclick=()=>toast("La messagerie sera disponible après connexion d'un vrai service de discussion.");
}
$("#productGrid").addEventListener("click",e=>{
 if(e.target.closest("[data-fav]")||e.target.closest("[data-contact]"))return;
 const card=e.target.closest("[data-product]");if(card)openProductDetails(card.dataset.product);
});

/* REWEAR Burkina Faso : filtres locaux et messagerie de démonstration */
const rewearBaseRender=render;
render=function(){
 rewearBaseRender();
 const city=document.getElementById("cityFilter")?.value||"";
 const min=Number(document.getElementById("minPrice")?.value||0);
 const max=Number(document.getElementById("maxPrice")?.value||0);
 let visible=0;
 document.querySelectorAll("#productGrid .product-card").forEach(card=>{
  const p=products.find(x=>String(x.id)===card.dataset.product);
  const ok=p&&(!city||p.city===city)&&p.price>=min&&(!max||p.price<=max);
  card.hidden=!ok;if(ok)visible++;
 });
 document.getElementById("emptyState").hidden=visible>0;
};
["cityFilter","minPrice","maxPrice"].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener(id==="cityFilter"?"change":"input",render)});
function openConversation(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 let layer=document.getElementById("rewearChat");
 if(!layer){
  layer=document.createElement("div");layer.id="rewearChat";layer.className="modal-backdrop";
  layer.innerHTML='<div class="modal chat-modal"><button class="close-modal" data-chat-close>×</button><div class="eyebrow">MESSAGERIE REWEAR</div><h2 id="chatTitle">Discussion</h2><p class="modal-intro" id="chatProduct"></p><div id="chatMessages" class="chat-messages"></div><form id="chatForm"><input name="message" maxlength="500" required placeholder="Écris ton message…"><button class="primary-btn submit-btn">Envoyer</button></form><small class="demo-note">Démo locale : messages visibles uniquement sur cet appareil.</small></div>';
  document.body.appendChild(layer);
  layer.addEventListener("click",e=>{if(e.target===layer||e.target.closest("[data-chat-close]"))layer.classList.remove("open")});
 }
 const key="rewear-chat-"+id;
 document.getElementById("chatTitle").textContent="Contacter "+(p.seller||"le vendeur");
 document.getElementById("chatProduct").textContent=p.title+" · "+money(p.price)+" · "+(p.city||"Burkina Faso");
 const paint=()=>{const arr=JSON.parse(localStorage.getItem(key)||"[]");document.getElementById("chatMessages").innerHTML=arr.map(m=>'<p class="chat-bubble">'+escapeHtml(m)+'</p>').join("")||'<p class="chat-empty">Écris au vendeur au sujet de cette annonce.</p>';};
 document.getElementById("chatForm").onsubmit=e=>{e.preventDefault();const value=new FormData(e.target).get("message").trim();if(!value)return;const arr=JSON.parse(localStorage.getItem(key)||"[]");arr.push(value);localStorage.setItem(key,JSON.stringify(arr));e.target.reset();paint();};
 paint();layer.classList.add("open");
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-contact]");if(b){e.preventDefault();e.stopImmediatePropagation();openConversation(Number(b.dataset.contact));}},true);
render();

/* Profil de démonstration + connexion Puter */
const accountModal=document.getElementById("accountModal");
const profileKey="rewear-profile";
let rewearUser=JSON.parse(localStorage.getItem(profileKey)||"null");
function updateAccountUI(){
 const btn=document.getElementById("accountBtn"),status=document.getElementById("accountStatus");
 if(rewearUser){btn.textContent=rewearUser.name||"Mon compte";status.textContent="Connecté : "+(rewearUser.name||"Membre REWEAR")+" · "+(rewearUser.city||"Burkina Faso");document.getElementById("profileName").value=rewearUser.name||"";document.getElementById("profileCity").value=rewearUser.city||"Ouagadougou";document.getElementById("puterSignOut").hidden=false;}
 else{btn.textContent="Connexion";status.textContent="Tu peux créer un profil local ou te connecter avec Puter.";document.getElementById("puterSignOut").hidden=true;}
}
document.getElementById("accountBtn").addEventListener("click",()=>accountModal.classList.add("open"));
document.querySelector("[data-account-close]").addEventListener("click",()=>accountModal.classList.remove("open"));
accountModal.addEventListener("click",e=>{if(e.target===accountModal)accountModal.classList.remove("open")});
document.getElementById("puterSignIn").addEventListener("click",async()=>{
 const status=document.getElementById("accountStatus");status.textContent="Connexion à Puter en cours…";
 try{
  if(!window.puter)throw new Error("Puter.js ne s'est pas chargé. Vérifie ta connexion internet puis actualise la page.");
  if(puter.auth.isSignedIn && !puter.auth.isSignedIn()){
   if(puter.ui && typeof puter.ui.authenticateWithPuter==="function"){
    await puter.ui.authenticateWithPuter();
   }else{
    await puter.auth.signIn();
   }
  }
  const user=await puter.auth.getUser();
  rewearUser={...(rewearUser||{}),puterUsername:user.username||user.name||"Membre Puter",name:document.getElementById("profileName").value.trim()||user.username||"Membre REWEAR",city:document.getElementById("profileCity").value,auth:"puter"};
  localStorage.setItem(profileKey,JSON.stringify(rewearUser));updateAccountUI();toast("Connexion Puter réussie.");
 }catch(err){status.textContent="Connexion impossible : "+(err.msg||err.message||err.error||"autorise la fenêtre de connexion Puter puis réessaie.");}
});
document.getElementById("saveProfile").addEventListener("click",()=>{
 const name=document.getElementById("profileName").value.trim();if(!name){toast("Choisis un nom public.");return;}
 rewearUser={name,city:document.getElementById("profileCity").value,auth:"local-demo"};localStorage.setItem(profileKey,JSON.stringify(rewearUser));updateAccountUI();toast("Profil enregistré sur cet appareil.");
});
document.getElementById("puterSignOut").addEventListener("click",async()=>{
 try{if(window.puter&&puter.auth.isSignedIn())await puter.auth.signOut();}catch(e){}
 rewearUser=null;localStorage.removeItem(profileKey);updateAccountUI();toast("Déconnexion effectuée.");
});
updateAccountUI();

/* Assistant OUEDRAOGO — Clan Zenin, propulsé par Puter.js */
const assistantPanel=document.getElementById("assistantPanel");
document.getElementById("assistantLaunch").addEventListener("click",()=>assistantPanel.classList.toggle("open"));
document.getElementById("assistantClose").addEventListener("click",()=>assistantPanel.classList.remove("open"));
function addAssistantMessage(content,who){
 const node=document.createElement("div");node.className="assistant-msg "+who;node.textContent=content;document.getElementById("assistantMessages").appendChild(node);document.getElementById("assistantMessages").scrollTop=999999;return node;
}
document.getElementById("assistantForm").addEventListener("submit",async e=>{
 e.preventDefault();const input=document.getElementById("assistantInput"),question=input.value.trim();if(!question)return;
 addAssistantMessage(question,"user");input.value="";const waiting=addAssistantMessage("OUEDRAOGO réfléchit…","bot");
 try{
  if(!window.puter)throw new Error("Puter.js ne s'est pas chargé. Recharge la page.");
  const system="Tu es OUEDRAOGO, l'assistant IA officiel de REWEAR, marketplace créée par le Clan Zenin pour le Burkina Faso. Réponds en français simple, naturel et utile. Aide à rechercher des articles, rédiger des annonces, expliquer les catégories, donner des conseils d'achat et de vente prudents. Le marché cible est le Burkina Faso, les prix sont en FCFA et les villes incluent Ouagadougou, Bobo-Dioulasso, Koudougou, Ouahigouya, Banfora, Kaya, Fada N'Gourma, Tenkodogo, Gaoua et Dori. Ne prétends jamais voir les stocks, annonces, paiements ou livraisons en temps réel. N'invente pas de vendeurs ni de disponibilité. Ne demande jamais d'adresse personnelle, de numéro privé, de mot de passe ou de code. Conseille les utilisateurs de faire les échanges dans un lieu public et de solliciter un adulte de confiance pour les transactions importantes. Tu es transparent sur les limites du prototype.";
  const response=await puter.ai.chat([{role:"system",content:system},{role:"user",content:question}],{model:"gpt-5.4-nano"});
  let answer=response?.message?.content??response?.text??response;
  if(Array.isArray(answer))answer=answer.map(x=>x.text||"").join("\n");
  waiting.textContent=String(answer||"Je n'ai pas reçu de réponse. Réessaie.");
 }catch(err){waiting.textContent="Je n'ai pas pu répondre : "+(err.message||"service indisponible")+". Réessaie plus tard.";}
});

/* Ajout d'une photo depuis la galerie du téléphone, compressée pour la démo locale */
const photoField=document.querySelector('#sellForm input[name="photoFile"]');
if(photoField)photoField.addEventListener("change",()=>{
 const file=photoField.files&&photoField.files[0];if(!file)return;
 if(!file.type.startsWith("image/")){toast("Choisis une image.");return;}
 const reader=new FileReader();reader.onload=()=>{
  const img=new Image();img.onload=()=>{
   const scale=Math.min(1,900/Math.max(img.width,img.height));const canvas=document.createElement("canvas");canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);window.rewearUploadedImage=canvas.toDataURL("image/jpeg",.72);toast("Photo prête pour ton annonce.");
  };img.src=reader.result;
 };reader.readAsDataURL(file);
});
