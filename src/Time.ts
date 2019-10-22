/**
 ** No te preocupes mucho por este código, es justo lo que vimos en clase.
 */
class Time {
  // diferencia de tiempo entre último update y update actual
  public static deltaTime: number = 0;
  private static previousTime: number = Date.now();

  public static update() {
    const currentTime = Date.now();
    // Convertir diferencia de tiempo a segundos, en vez de ms
    Time.deltaTime = (currentTime - Time.previousTime) / 1000;
    Time.previousTime = currentTime;
  }
}

export default Time;
