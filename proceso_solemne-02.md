## Solemne 02

# sketch basado en un disco de música chilena.

La idea principal es crear esta atmosfera de melancolia, que representa este albun para nosotros. 

La idea parte por una lluvia de balas, en un ambiente marginal, que simbolice las raices y apele al recuerdo y melancolia mezclada con la brutalidad
y exposición a circunstacias de vulnerabilidad. 

Partimos creando un espacio de "barrio" utilizando bloques habitacionales caracteristicos de las poblaciones y sectores marginales
que constantemente son mencionados o relacionados a la música urbana chilena. Y es a este escenario al cual le vamos agregando distintas animaciones
desde "la lluvia de balas", las ventanas prendindo y apagando y al hombre de traje caminando.


## código 01
```txt
// ======================================
// ESCENA URBANA LLUVIOSA
// ======================================

let rain = [];
let windows = [];

function setup() {

  createCanvas(1000, 700);

  // lluvia
  for (let i = 0; i < 500; i++) {
    rain.push(new Drop());
  }

  // crear ventanas
  createWindows();
}

function draw() {

  // fondo noche
  background(25, 30, 45);

  // nubes
  drawClouds();

  // ciudad fondo
  drawCity();

  // lluvia
  for (let drop of rain) {
    drop.fall();
    drop.show();
  }

  // suelo
  noStroke();
  fill(20, 20, 25);
  rect(0, 620, width, 80);

  // reflejos
  fill(255, 180, 60, 70);
  ellipse(250, 640, 120, 25);
  ellipse(750, 640, 120, 25);

  // edificios
  drawBuildingBase(80, 140);
  drawBuildingBase(560, 140);

  // ventanas dinámicas
  updateWindows();

  // postes
  drawPole(40);
  drawPole(940);

  // cables
  drawCables();

  // marco dibujo
  noFill();
  stroke(0);
  strokeWeight(8);
  rect(5, 5, width - 10, height - 10);
}

// ======================================
// BASE EDIFICIOS
// ======================================

function drawBuildingBase(x, y) {

  stroke(0);
  strokeWeight(4);

  // cuerpo edificio
  fill(120, 55, 30);
  rect(x, y, 340, 480);

  // textura ladrillos
  stroke(100, 40, 20);

  for (let i = x + 10; i < x + 330; i += 25) {

    for (let j = y + 10; j < y + 470; j += 18) {

      line(i, j, i + 10, j);
    }
  }

  // franjas crema
  noStroke();
  fill(220, 205, 170);

  rect(x, y + 150, 340, 20);
  rect(x, y + 300, 340, 20);

  // techo
  fill(15);
  rect(x, y - 10, 340, 25);

  // laterales techo
  triangle(x, y + 15, x - 15, y - 10, x, y - 10);

  triangle(x + 340, y + 15, x + 355, y - 10, x + 340, y - 10);

  // puerta
  drawDoor(x + 145, y + 340);
}

// ======================================
// PUERTA
// ======================================

function drawDoor(x, y) {

  fill(10);
  stroke(0);
  strokeWeight(4);

  rect(x, y, 55, 140);

  // abertura
  fill(255, 220, 100);

  triangle(x + 55, y + 140, x + 55, y + 95, x, y + 140);
}

// ======================================
// VENTANAS
// ======================================

function createWindows() {

  addBuildingWindows(80, 140);
  addBuildingWindows(560, 140);
}

function addBuildingWindows(x, y) {

  let positions = [

    [x + 50, y + 40, true],
    [x + 145, y + 40, false],
    [x + 240, y + 40, true],

    [x + 50, y + 190, false],
    [x + 145, y + 190, false],
    [x + 240, y + 190, false],

    [x + 50, y + 350, false],
    [x + 240, y + 350, false]
  ];

  for (let p of positions) {

    windows.push({

      x: p[0], 
      y: p[1],
      blinds: p[2],

      // estado inicial
      on: random() > 0.3,

      // velocidad cambio
      timer: int(random(80, 300))
    });
  }
}

function updateWindows() {

  for (let w of windows) {

    // contador
    w.timer--;

    // cambio lento
    if (w.timer <= 0) {

      w.on = random() > 0.3;

      w.timer = int(random(120, 400));
    }

    drawWindow(w.x, w.y, w.blinds, w.on);
  }
}

function drawWindow(x, y, blinds, lightOn) {

  // brillo
  if (lightOn) {

    noStroke();
    fill(255, 210, 80, 60);

    rect(x - 5, y - 5, 70, 70);
  }

  // ventana
  stroke(0);
  strokeWeight(3);

  if (lightOn) {
    fill(255, 210, 90);
  } else {
    fill(35, 35, 45);
  }

  rect(x, y, 60, 60);

  // división
  line(x + 30, y, x + 30, y + 60);

  // persianas
  if (blinds) {

    for (let i = 10; i < 60; i += 10) {

      line(x, y + i, x + 60, y + i);
    }
  }
}

// ======================================
// POSTES
// ======================================

function drawPole(x) {

  stroke(0);
  strokeWeight(8);

  line(x, 260, x, 620);

  // soportes
  line(x - 25, 300, x + 25, 300);
  line(x - 25, 330, x + 25, 330);
  line(x - 25, 360, x + 25, 360);

  // lámpara
  strokeWeight(3);

  line(x, 360, x + 20, 390);

  fill(20);

  arc(x + 30, 400, 40, 30, PI, TWO_PI);

  // luz
  noStroke();

  fill(255, 220, 120, 60);

  triangle(x + 30, 410, x, 650, x + 60, 650);
}

// ======================================
// CABLES
// ======================================

function drawCables() {

  stroke(0);
  strokeWeight(3);
  noFill();

  bezier(40, 300, 250, 340, 750, 340, 940, 300);

  bezier(40, 330, 250, 360, 750, 360, 940, 330);

  bezier(40, 360, 250, 390, 750, 390, 940, 360);
}

// ======================================
// NUBES
// ======================================

function drawClouds() {

  stroke(0);
  strokeWeight(4);

  fill(60);

  for (let x = 0; x < width; x += 120) {

    arc(x + 40, 80, 90, 60, PI, TWO_PI);
    arc(x + 90, 80, 90, 60, PI, TWO_PI);
    arc(x + 140, 80, 90, 60, PI, TWO_PI);
    arc(x + 65, 50, 100, 70, PI, TWO_PI);
  }
}

// ======================================
// CIUDAD FONDO
// ======================================

function drawCity() {

  fill(70, 75, 90);

  noStroke();

  rect(420, 420, 50, 200);
  rect(490, 370, 60, 250);

}

// ======================================
// LLUVIA
// ======================================

class Drop {

  constructor() {

    this.x = random(width);
    this.y = random(-height, height);

    this.len = random(10, 25);
    this.speed = random(5, 12);
  }

  fall() {

    this.y += this.speed;
    this.x -= 2;

    if (this.y > height) {

      this.y = random(-200, -100);
      this.x = random(width);
    }
  }

  show() {

    stroke(200, 220, 255, 120);
    strokeWeight(2);

    line(
      this.x,
      this.y,
      this.x - 4,
      this.y + this.len
    );
  }
}

```

# código lluvia

```txt

let rain = [];

  // lluvia 1
  for (let i = 0; i < 500; i++) {
    rain.push(new Drop());
  }
  // lluvia
  for (let drop of rain) {
    drop.fall();
    drop.show();
  }

===================
LLUVIA
===================

class Drop {

  constructor() {

    this.x = random(width);
    this.y = random(-height, height);

    this.len = random(10, 25);
    this.speed = random(5, 12);
  }

  fall() {

    this.y += this.speed;
    this.x -= 2;

    if (this.y > height) {

      this.y = random(-200, -100);
      this.x = random(width);
    }
  }

  show() {

    stroke(200, 220, 255, 120);
    strokeWeight(2);

    line(
      this.x,
      this.y,
      this.x - 4,
      this.y + this.len
    );
  }
```

# código ventanas

```txt

let windows = [];

// crear ventanas
createWindows();

// ventanas dinámicas
updateWindows();

================
VENTANAS
================

function createWindows() {

  addBuildingWindows(80, 140);
  addBuildingWindows(560, 140);
}

function addBuildingWindows(x, y) {

  let positions = [

    [x + 50, y + 40, true],
    [x + 145, y + 40, false],
    [x + 240, y + 40, true],

    [x + 50, y + 190, false],
    [x + 145, y + 190, false],
    [x + 240, y + 190, false],

    [x + 50, y + 350, false],
    [x + 240, y + 350, false]
  ];

  for (let p of positions) {

    windows.push({

      x: p[0], 
      y: p[1],
      blinds: p[2],

      // estado inicial
      on: random() > 0.3,

      // velocidad cambio
      timer: int(random(80, 300))
    });
  }
}

function updateWindows() {

  for (let w of windows) {

    // contador
    w.timer--;

    // cambio lento
    if (w.timer <= 0) {

      w.on = random() > 0.3;

      w.timer = int(random(120, 400));
    }

    drawWindow(w.x, w.y, w.blinds, w.on);
  }
}

function drawWindow(x, y, blinds, lightOn) {

  // brillo
  if (lightOn) {

    noStroke();
    fill(255, 210, 80, 60);

    rect(x - 5, y - 5, 70, 70);
  }

  // ventana
  stroke(0);
  strokeWeight(3);

  if (lightOn) {
    fill(255, 210, 90);
  } else {
    fill(35, 35, 45);
  }

  rect(x, y, 60, 60);

  // división
  line(x + 30, y, x + 30, y + 60);

  // persianas
  if (blinds) {

    for (let i = 10; i < 60; i += 10) {

      line(x, y + i, x + 60, y + i);
    }
  }
}
´´´
