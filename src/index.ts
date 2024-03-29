import Engine from "./Engine";
import GameContext from "./GameContext";

//  Nota: No es necesario escribir código nuevo en este archivo.

const canvas = document.getElementById("game-area") as HTMLCanvasElement;
const context = canvas.getContext("2d");



GameContext.context = context;

const engine = new Engine();
engine.start();
canvas.addEventListener("keydown", engine.keydownEventHandler);
canvas.addEventListener("keyup", engine.keyupEventHandler);

canvas.addEventListener("mousedown", engine.mouseDownListener);
canvas.addEventListener("mouseenter", engine.mouseEnterListener);
canvas.addEventListener("mousemove", engine.mouseEnterListener);

