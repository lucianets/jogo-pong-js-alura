//variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro/2;
//velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
//variáveis Raquete
let xRaquete = 5;
let yRaquete = 150;
let lRaquete = 10;
let aRaquete = 90;
let vYRaquete = 3;
//variáveis Oponente
let xOponente = 585;
let yOponente = 150;
let lOponente = 10;
let aOponente = 90;
let vYOponente;

let colidiu = false;

//placar jogo
let meusPontos = 0;
let pontosOponente = 0;

let dOponenteBolinha = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;


function preload()
{
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  colisaoRaquetebiblioteca(xRaquete,yRaquete);
  colisaoRaquetebiblioteca(xOponente,yOponente);
  incluiPlacar(meusPontos,150,26);
  incluiPlacar(pontosOponente,450,26);
  marcaPonto();
}

function mostraBolinha()
{
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha()
{
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda()
{
  if (xBolinha+raio > width || xBolinha-raio < 0)
  {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha+raio > height || yBolinha-raio < 0)
  {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y)
{
  rect(x, y, lRaquete, aRaquete);
}

function movimentaMinhaRaquete()
{
  if (keyIsDown(UP_ARROW))
  {
    yRaquete -= vYRaquete;
  }
  if (keyIsDown(DOWN_ARROW))
  {
    yRaquete += vYRaquete;
  }
}

function verificaColisaoRaquete()
{
  if (xBolinha-raio < xRaquete+lRaquete && yBolinha-raio < yRaquete+aRaquete && yBolinha+raio > yRaquete)
  {
    velocidadeXBolinha *= -1;
    //velocidadeYBolinha *= -1;
  }

}

function colisaoRaquetebiblioteca(x,y)
{
  colidiu = collideRectCircle(x,y,lRaquete,aRaquete,xBolinha,yBolinha,raio);
  if(colidiu)
  {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente()
{
  vYOponente = yBolinha - yOponente - lOponente/2 -dOponenteBolinha;
  yOponente += vYOponente;

  if(pontosOponente > meusPontos)
  {
    dOponenteBolinha = 100;
  }
  if(pontosOponente < meusPontos && dOponenteBolinha > 50)
  {
    dOponenteBolinha -= 3;
  }
}

function incluiPlacar(pontos,x,y)
{
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(x-20, y-16, 40, 20);
  fill(255);
  text(pontos, x, y);
}

function marcaPonto()
{
  if (xBolinha+raio > width)
  {
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha-raio < 0)
  {
    pontosOponente += 1;
    ponto.play();
  }
}