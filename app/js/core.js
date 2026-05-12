(function(){
'use strict';
const VERSION='caetano-pro-2026-05-12';
const STORE='caetano_local_store_v1';
function uid(){return 'id_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9)}
function now(){return new Date().toISOString()}
function money(v){return (Number(v||0)).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function num(v){ if(typeof v==='number') return v; let s=String(v??'').trim(); if(!s) return 0; if(s.includes(',')&&s.includes('.')) s=s.replace(/\./g,'').replace(',','.'); else if(s.includes(',')) s=s.replace(',','.'); return Number(s)||0; }
function onlyDigits(s){return String(s||'').replace(/\D+/g,'')}
function fmtDate(iso){ if(!iso)return ''; const p=String(iso).slice(0,10).split('-'); return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:String(iso)}
function today(){return new Date().toISOString().slice(0,10)}
function load(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return {}}}
function save(db){localStorage.setItem(STORE,JSON.stringify(db||{}))}
function seed(){const db=load(); db.tenants=db.tenants||{caetano:{id:'caetano',nome:'Caetano Carnes e Rotisseria',ativo:true,modules:{pdv:true,estoque:true,cozinha:true,nfe:true,financeiro:true,etiquetas:true,clientes:true,fornecedores:true,auditoria:true}}}; db.users=db.users||{}; db.products=db.products||{}; db.lots=db.lots||{}; db.sales=db.sales||{}; db.orders=db.orders||{}; db.suppliers=db.suppliers||{}; db.customers=db.customers||{}; db.nfes=db.nfes||{}; db.finance=db.finance||{}; db.audit=db.audit||{}; save(db); return db}
function col(name){const db=seed(); db[name]=db[name]||{}; save(db); return {all:()=>Object.values(load()[name]||{}),get:(id)=>load()[name]?.[id]||null,set:(id,data)=>{const db=load();db[name]=db[name]||{};db[name][id]={...(db[name][id]||{}),...data,id,updatedAt:now()};save(db);return db[name][id]},add:(data)=>{const id=data.id||uid(); return col(name).set(id,{...data,id,createdAt:data.createdAt||now()})},remove:(id,meta)=>{const db=load(); const old=db[name]?.[id]; if(old){delete db[name][id]; db.audit=db.audit||{}; const aid=uid(); db.audit[aid]={id:aid,tenantId:currentTenant(),acao:'delete',colecao:name,documento:id,antes:old,motivo:meta?.motivo||'',usuario:currentUser()?.email||'local',createdAt:now()}; save(db)} }} }
function currentUser(){try{return JSON.parse(localStorage.getItem('caetano_user')||'null')}catch(e){return null}}
function currentTenant(){return currentUser()?.tenantId||localStorage.getItem('caetano_tenant')||'caetano'}
function requireRole(roles){const u=currentUser(); if(!u){location.href='index.html'; return null} if(roles&&!roles.includes(u.role)){alert('Acesso não autorizado para este perfil.'); location.href='index.html'; return null} return u}
async function login(email,password,roleHint){ email=String(email||'').trim().toLowerCase(); if(!email) throw new Error('Informe o e-mail.'); let fbUser=null; try{ if(window.firebase&&window.CAETANO_FIREBASE_CONFIG?.apiKey&&!window.CAETANO_FIREBASE_CONFIG.apiKey.includes('COLE_AQUI')){ if(!firebase.apps.length) firebase.initializeApp(window.CAETANO_FIREBASE_CONFIG); const cred=await firebase.auth().signInWithEmailAndPassword(email,password); fbUser=cred.user; }}catch(e){ console.warn('[Firebase Auth]',e.message); throw e }
 let role=roleHint||'admin'; if(email.includes('pdv')) role='pdv'; if(email.includes('cozinha')) role='cozinha'; if(email.includes('estoque')) role='estoque'; if(email.includes('cliente')) role='cliente'; if(email.includes('super')) role='superadmin'; const user={uid:fbUser?.uid||email,email,role,tenantId:'caetano',nome:email.split('@')[0],loginAt:now()}; localStorage.setItem('caetano_user',JSON.stringify(user)); localStorage.setItem('caetano_last_email',email); return user; }
function logout(){localStorage.removeItem('caetano_user'); location.href='index.html'}
function toast(msg){let t=document.querySelector('.toast'); if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)} t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200)}
function renderRows(tbody, rows, cols){tbody.innerHTML=rows.map(r=>'<tr>'+cols.map(c=>`<td data-label="${c.label}">${c.html?c.html(r):escapeHtml(r[c.key]??'')}</td>`).join('')+'</tr>').join('')}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
async function viaCep(cep){cep=onlyDigits(cep); if(cep.length!==8) throw new Error('CEP inválido.'); const r=await fetch(`https://viacep.com.br/ws/${cep}/json/`); const j=await r.json(); if(j.erro) throw new Error('CEP não encontrado.'); return j}
function applyTheme(){const t=localStorage.getItem('caetano_theme')||'dark';document.documentElement.setAttribute('data-theme',t)}
function toggleTheme(){const t=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';localStorage.setItem('caetano_theme',t);applyTheme()}
window.Caetano={VERSION,uid,now,money,num,onlyDigits,fmtDate,today,load,save,seed,col,currentUser,currentTenant,requireRole,login,logout,toast,renderRows,escapeHtml,viaCep,applyTheme,toggleTheme};
document.addEventListener('DOMContentLoaded',()=>{applyTheme();seed();document.querySelectorAll('[data-logout]').forEach(b=>b.onclick=logout);document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.onclick=toggleTheme);document.querySelectorAll('[data-hamb]').forEach(b=>b.onclick=()=>document.querySelector('.sidebar')?.classList.toggle('open'))});
})();
