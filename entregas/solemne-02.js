// ============================================
// Los Gangsters tambien lloran. Pablo Chill-E
// ============================================
let jugadorX = 500; // Empieza en el centro de la nueva pantalla
let jugadorY = 560; // Ajustado para que camine sobre el suelo gris
let anchoJugador = 30;
let altoJugador = 60;
let velocidadJugador = 6;

// Balas (líneas amarillas)
let lineasX = [];
let lineasY = [];
let anchoLinea = 5;
let altoLinea = 10;
let velocidadLineas = 6;

// Control del estado del juego
let juegoTerminado = false;
let mostrarInstrucciones = true;

// __________________VARIABLES DEL FONDO URBANO_______________________

let windows = [];

function setup() {
  createCanvas(1000, 700); // Tamaño del fondo urbano

  // Crear ventanas del fondo
  createWindows();
}

function draw() {
  // __________________ PANTALLA GAME OVER _______________________
  if (juegoTerminado) {
    background(78, 1, 16); // Fondo rojizo
    
    fill(255);
    textFont('Monospace');
    textAlign(CENTER, CENTER);
    
    textSize(60);
    text("Game Over", width / 2, height / 2);
    
    noStroke()
    textSize(20);
    text("click para reiniciar", width / 2, height / 2 + 60);
    
    return; // Detiene el resto del juego
  }

  // ___________________ DIBUJO DEL FONDO _____________________
  // Fondo noche
  background(25, 30, 45);

  // Nubes
  drawClouds();

  // Ciudad fondo
  drawCity();

  // Suelo
  noStroke();
  fill(20, 20, 25);
  rect(0, 620, width, 80);

  // Reflejos en el suelo
  fill(255, 180, 60, 70);
  ellipse(250, 640, 120, 25);
  ellipse(750, 640, 120, 25);

  // Edificios
  drawBuildingBase(80, 140);
  drawBuildingBase(560, 140);

  // Ventanas dinámicas
  updateWindows();

  // Postes
  drawPole(40);
  drawPole(940);

  // Cables
  drawCables();

  // _________________ LÓGICA DEL JUGADOR ________________________
  // Controles con teclado: Tecla A (65) y Tecla D (68)
  if (keyIsDown(65)) {
    jugadorX = jugadorX - velocidadJugador;
    mostrarInstrucciones = false; 
  }
  if (keyIsDown(68)) {
    jugadorX = jugadorX + velocidadJugador;
    mostrarInstrucciones = false; 
  }

  // Restringir movimiento al ancho de la pantalla
  jugadorX = constrain(jugadorX, 0, width - anchoJugador);

  // Dibujar personaje (Silueta negra)
  noStroke();
  fill(0, 0, 0); 
  rect(jugadorX, jugadorY, anchoJugador, altoJugador);

  // __________________ OBSTÁCULOS Y COLISIONES ________________
  // Crear una nueva línea cada 20 fotogramas 
  if (frameCount % 20 === 0) {
    lineasX.push(random(0, width - anchoLinea));
    lineasY.push(-altoLinea); 
  }

  // Mover y dibujar las líneas
  for (let i = 0; i < lineasY.length; i++) {
    // Movimiento hacia abajo
    lineasY[i] = lineasY[i] + velocidadLineas;

    //  línea 
    fill(230, 175, 46); 
    rect(lineasX[i], lineasY[i], anchoLinea, altoLinea);

    //  colisión
    if (lineasX[i] < jugadorX + anchoJugador &&
        lineasX[i] + anchoLinea > jugadorX &&
        lineasY[i] < jugadorY + altoJugador &&
        lineasY[i] + altoLinea > jugadorY) {
      
      juegoTerminado = true;
    }
  }

  // Marco de dibujo exterior
  noFill();
  stroke(0);
  strokeWeight(8);
  rect(5, 5, width - 10, height - 10);

  // _________________ INSTRUCCIONES ______________
  if (mostrarInstrucciones) {
    fill(255); 
    textFont('Monospace');
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Pulsa A y D para moverte", width / 2, height / 4);
  }
}

// ______________REINICIO______________

function mousePressed() {
  if (juegoTerminado) {
    lineasX = [];       
    lineasY = [];       
    jugadorX = 500;     // reinicia en el centro
    juegoTerminado = false; 
    mostrarInstrucciones = true; 
  }
}

// ______________FUNCIONES AUXILIARES DEL FONDO______________

function drawBuildingBase(x, y) {
  stroke(0);
  strokeWeight(4);

  // Cuerpo edificio
  fill(120, 55, 30);
  rect(x, y, 340, 480);

  // Textura ladrillos
  stroke(100, 40, 20);
  for (let i = x + 10; i < x + 330; i += 25) {
    for (let j = y + 10; j < y + 470; j += 18) {
      line(i, j, i + 10, j);
    }
  }

  // Franjas crema
  noStroke();
  fill(220, 205, 170);
  rect(x, y + 150, 340, 20);
  rect(x, y + 300, 340, 20);

  // Techo
  fill(15);
  rect(x, y - 10, 340, 25);

  // Laterales techo
  triangle(x, y + 15, x - 15, y - 10, x, y - 10);
  triangle(x + 340, y + 15, x + 355, y - 10, x + 340, y - 10);

  // Puerta
  drawDoor(x + 145, y + 340);
}

function drawDoor(x, y) {
  fill(10);
  stroke(0);
  strokeWeight(4);
  rect(x, y, 55, 140);

  // Abertura luz de la puerta
  fill(255, 220, 100);
  triangle(x + 55, y + 140, x + 55, y + 95, x, y + 140);
}

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
      on: random() > 0.3,
      timer: int(random(80, 300))
    });
  }
}

function updateWindows() {
  for (let w of windows) {
    w.timer--;
    if (w.timer <= 0) {
      w.on = random() > 0.3;
      w.timer = int(random(120, 400));
    }
    drawWindow(w.x, w.y, w.blinds, w.on);
  }
}

function drawWindow(x, y, blinds, lightOn) {
  if (lightOn) {
    noStroke();
    fill(255, 210, 80, 60);
    rect(x - 5, y - 5, 70, 70);
  }

  stroke(0);
  strokeWeight(3);
  if (lightOn) {
    fill(255, 210, 90);
  } else {
    fill(35, 35, 45);
  }
  rect(x, y, 60, 60);

  // División de la ventana
  line(x + 30, y, x + 30, y + 60);

  // Persianas
  if (blinds) {
    for (let i = 10; i < 60; i += 10) {
      line(x, y + i, x + 60, y + i);
    }
  }
}

function drawPole(x) {
  stroke(0);
  strokeWeight(8);
  line(x, 260, x, 620);

  // Soportes del poste
  line(x - 25, 300, x + 25, 300);
  line(x - 25, 330, x + 25, 330);
  line(x - 25, 360, x + 25, 360);

  // Lámpara
  strokeWeight(3);
  line(x, 360, x + 20, 390);
  fill(20);
  arc(x + 30, 400, 40, 30, PI, TWO_PI);

  // Haz de luz
  noStroke();
  fill(255, 220, 120, 60);
  triangle(x + 30, 410, x, 650, x + 60, 650);
}

function drawCables() {
  stroke(0);
  strokeWeight(3);
  noFill();
  bezier(40, 300, 250, 340, 750, 340, 940, 300);
  bezier(40, 330, 250, 360, 750, 360, 940, 330);
  bezier(40, 360, 250, 390, 750, 390, 940, 360);
}

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

function drawCity() {
  fill(70, 75, 90);
  noStroke();
  rect(420, 420, 50, 200);
  rect(490, 370, 60, 250);
}
