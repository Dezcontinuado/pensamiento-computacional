# animación en p5js

setup() y draw(): Entiende que **setup()** corre una vez y **draw()** funciona como un bucle continuo (normalmente 60 fps) para crear animaciones.

Las funciones de color en p5.js permiten definir el color de fondo, relleno y trazo (bordes) de las formas. Las principales son background(), fill(), stroke(), junto con noFill() y noStroke() para eliminar color. Estas funciones utilizan modelos como RGB o HSB, definidos por colorMode(), y aceptan valores de 0 a 255. 

## Configuración de Color:

**background(v1, v2, v3, [alpha]):** Establece el color de fondo del lienzo.

**fill(v1, v2, v3, [alpha]):** Define el color de relleno para las formas.

**stroke(v1, v2, v3, [alpha]):** Define el color del borde (trazo) de las formas.

**color(v1, v2, v3, [alpha]):** Crea un objeto de color (p5.Color) para usarlo más tarde.

## Gestión de Modos:

**colorMode(MODE, [max]):** Cambia el modo de color a RGB, HSB (Tono, Saturación, Brillo) o HSL.

**noFill():** Desactiva el relleno de las figuras.

**noStroke():** Desactiva el trazo de las figuras.

## Crear Movimiento

(draw): Declara una variable (ej. let x = 0;) fuera de las funciones y auméntala dentro de draw() (ej. x += 2;) para cambiar la posición.

**example**

let x = 0;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220); // Borra el fondo
  ellipse(x, 200, 50, 50); // Dibuja la forma
  x += 2; // Actualiza la posición
}

## Usar frameRate()

La función frameRate(n) establece cuántos fotogramas por segundo (FPS) se dibujarán. P5.js usa 60 FPS por defecto. 

**Acelerar:** frameRate(120); (intenta aumentar la velocidad).

**Decelerar:** frameRate(10); (hace la animación más lenta). 

**example**

function setup() {
  createCanvas(400, 400);
  frameRate(30); // Reduce la velocidad a 30 fotogramas por segundo
}

