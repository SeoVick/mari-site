// 1) Ideias (apenas exemplos curtos)
const ideiasFofas = [
  "Cozinhar juntos uma receita nova",
  "Fazer um piquenique em casa",
  "Jogar jogos de tabuleiro"
  // ...adicione as outras
];

const ideiasPicantes = [
  "Jogo de massagem com óleo sensual",
  "Beijos demorados em todos os cantos da casa",
  "Banho juntos à meia-luz"
  // ...adicione as outras
];

let allIdeias = ideiasFofas.concat(ideiasPicantes);

// Elementos
const canvas = document.getElementById("raspadinha");
const ctx = canvas.getContext("2d");
const surpresaDiv = document.getElementById("surpresa");
const filtroSelect = document.getElementById("filtro");
const embaralharBtn = document.getElementById("embaralhar");
const cobrirBtn = document.getElementById("cobrir");

let currentIdeas = allIdeias;
let currentIndex = Math.floor(Math.random() * currentIdeas.length);
let isDrawing = false;

// Ajustar canvas
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  coverCanvas();
}

function coverCanvas() {
  ctx.fillStyle = "#B0B0B0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#2b2b2b";
  ctx.font = "18px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Raspe para revelar a surpresa!", canvas.width/2, canvas.height/2);
}

function showSurpresa() {
  surpresaDiv.textContent = currentIdeas[currentIndex];
}

function reshuffle() {
  currentIndex = Math.floor(Math.random() * currentIdeas.length);
  showSurpresa();
  coverCanvas();
}

// Canvas raspadinha
function eraseAt(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("pointerdown", e => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  eraseAt(e.clientX - rect.left, e.clientY - rect.top);
});

window.addEventListener("pointermove", e => {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  eraseAt(e.clientX - rect.left, e.clientY - rect.top);
});

window.addEventListener("pointerup", () => {
  isDrawing = false;
});

// Eventos
embaralharBtn.addEventListener("click", reshuffle);
cobrirBtn.addEventListener("click", coverCanvas);
filtroSelect.addEventListener("change", () => {
  const filtro = filtroSelect.value;
  if(filtro === "fofas") currentIdeas = ideiasFofas;
  else if(filtro === "picantes") currentIdeas = ideiasPicantes;
  else currentIdeas = allIdeias;
  reshuffle();
});

// Inicialização
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
showSurpresa();
