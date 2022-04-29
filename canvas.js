const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
/*
//Retângulo
c.fillStyle = 'rgba(100, 0, 0, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0, 100, 0, 0.5)';
c.fillRect(400, 100, 100, 100);
c.fillStyle = 'rgba(0, 0, 100, 0.5)';
c.fillRect(300, 300, 100, 100);

//Linha
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = '#fa34a3';
c.stroke();

//Arco / Círculo
for (let i = 0; i < 200; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 50, 0, Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
}
*/

let mouse = {
  largura: undefined,
  altura: undefined,
};

let circunferenciaMaxima = 50;
//let circunferenciaMinima = 5;

let arrayDeCores = ["#ff7f3f", "orange", "gold", "wheat", "#f6d860"];

window.addEventListener("mousemove", function (evento) {
  mouse.largura = evento.x;
  mouse.altura = evento.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  iniciar();
});

function Circulo(
  largura,
  altura,
  velocidadeLargura,
  velocidadeAltura,
  circunferencia
) {
  this.largura = largura;
  this.altura = altura;
  this.velocidadeLargura = velocidadeLargura;
  this.velocidadeAltura = velocidadeAltura;
  this.circunferencia = circunferencia;
  this.circunferenciaMinima = circunferencia;
  this.cor = arrayDeCores[Math.floor(Math.random() * arrayDeCores.length)];

  this.desenhar = function () {
    c.beginPath();
    c.arc(
      this.largura,
      this.altura,
      this.circunferencia,
      0,
      Math.PI * 2,
      false
    );
    c.fillStyle = this.cor;
    c.fill();
  };

  this.atualizar = function () {
    if (
      this.largura + this.circunferencia > innerWidth ||
      this.largura - this.circunferencia < 0
    ) {
      this.velocidadeLargura = -this.velocidadeLargura;
    }
    this.largura += this.velocidadeLargura;

    if (
      this.altura + this.circunferencia > innerHeight ||
      this.altura - this.circunferencia < 0
    ) {
      this.velocidadeAltura = -this.velocidadeAltura;
    }
    this.altura += this.velocidadeAltura;

    // Interatividade
    if (
      mouse.largura - this.largura < 50 &&
      mouse.largura - this.largura > -50 &&
      mouse.altura - this.altura < 50 &&
      mouse.altura - this.altura > -50 &&
      this.circunferencia < circunferenciaMaxima
    ) {
      this.circunferencia += 1;
    } else if (this.circunferencia > this.circunferenciaMinima) {
      this.circunferencia -= 1;
    }

    this.desenhar();
  };
}

let arrayDeCirculos = [];

function iniciar() {
  arrayDeCirculos = [];

  for (let i = 0; i < 600; i++) {
    let circunferencia = Math.random() * 5 + 1;
    let largura =
      Math.random() * (innerWidth - circunferencia * 2) + circunferencia;
    let altura =
      Math.random() * (innerHeight - circunferencia * 2) + circunferencia;
    let velocidadeAltura = (Math.random() - 0.5) * 4;
    let velocidadeLargura = (Math.random() - 0.5) * 4;
    arrayDeCirculos.push(
      new Circulo(
        largura,
        altura,
        velocidadeLargura,
        velocidadeAltura,
        circunferencia
      )
    );
  }
}

//Circulo Animado

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < arrayDeCirculos.length; i++) {
    arrayDeCirculos[i].atualizar();
  }
}

iniciar();
animate();
