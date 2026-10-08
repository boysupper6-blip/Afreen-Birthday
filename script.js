const screens=[...document.querySelectorAll(".screen")];
const particles=document.getElementById("particles");
const toast=document.getElementById("toast");
let particleTimer;

function showScreen(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
  spawnBurst();
}

function spawnParticle(){
  const p=document.createElement("span");
  p.className="particle";
  p.textContent=["♡","✦","·","✧","❀"][Math.floor(Math.random()*5)];
  p.style.left=Math.random()*100+"vw";
  p.style.bottom="-5vh";
  p.style.animationDuration=(7+Math.random()*7)+"s";
  p.style.fontSize=(10+Math.random()*14)+"px";
  particles.appendChild(p);
  setTimeout(()=>p.remove(),15000);
}
function spawnBurst(){
  for(let i=0;i<8;i++) setTimeout(spawnParticle,i*90);
}
particleTimer=setInterval(spawnParticle,650);
for(let i=0;i<12;i++) setTimeout(spawnParticle,i*180);

document.getElementById("startBtn").addEventListener("click",()=>showScreen("story"));
document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>showScreen(btn.dataset.next));
});

const cake=document.getElementById("cake");
const hint=document.getElementById("cakeHint");
cake.addEventListener("click",()=>{
  if(cake.classList.contains("blown")) return;
  cake.classList.add("blown");
  hint.textContent="Wish made. ✨";
  toast.textContent="And just like that… birthday magic. ♡";
  toast.classList.add("show");
  spawnBurst();
  setTimeout(()=>showScreen("finale"),1500);
});
cake.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();cake.click()}});

document.getElementById("replayBtn").addEventListener("click",()=>{
  cake.classList.remove("blown");
  hint.textContent="tap the cake ♡";
  showScreen("home");
});
