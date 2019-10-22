import Player from "./Player";
import Ball from "./Ball";

/**
 ** Tipo Bounce. Contiene tres valores.
 ** intersects: indica si el jugador y la bola se intersectan
 ** angleX: componente X de un vector unitario que indica el ángulo en que
 ** se encuentran la bola y el centro de la barra. Solo existe en caso de
 ** que la bola rebote.
 ** angleY: Componente Y del mismo vector unitario que angleX.
 */
interface Bounce {
  intersects: boolean;
  angleX?: number;
  angleY?: number;
}

/***
 ** Método encargado de revisar la intersección entre un jugador y la bola.
 ** No es necesario modificar este código, pero puedes hacerlo para cambiar
 ** su funcionamiento general si esto te ayuda en algo.
 ** Retorna un tipo Bounce.
 */
export function checkIntersection(player: Player, ball: Ball): Bounce {
  // compute a center-to-center vector
  const ballRadius = ball.getRadius();
  const ballX = ball.getCoordX();
  const ballY = ball.getCoordY();
  const playerX = player.getCoordX();
  const playerY = player.getCoordY();
  const playerWidth = player.getBarWidth();
  const playerHeight = player.getBarHeight();
  const distX = ballX - playerX - playerWidth / 2;
  const distY = ballY - playerY - playerHeight / 2;
  var absDistX = Math.abs(distX);
  var absDistY = Math.abs(distY);

  if (absDistX > playerWidth / 2 + ballRadius) {
    return { intersects: false };
  }
  if (absDistY > playerHeight / 2 + ballRadius) {
    return { intersects: false };
  }
  const dx = absDistX - playerWidth / 2;
  const dy = absDistY - playerHeight / 2;
  const uz = Math.sqrt(dx * dx + dy * dy);
  const ux = ((distX > 0 ? 1 : -1) * dx) / uz;
  const uy = ((distY > 0 ? 1 : -1) * dy) / uz;

  if (absDistX <= playerWidth / 2) {
    return { intersects: true, angleX: ux, angleY: uy };
  }
  if (absDistY <= playerHeight / 2) {
    return { intersects: true, angleX: ux, angleY: uy };
  }

  return {
    intersects: dx * dx + dy * dy <= ballRadius * ballRadius,
    angleX: ux,
    angleY: uy,
  };
}
