import { Polygon, Sky } from "../utils/Polygon";
import { getPosInWebGL, initGl, initShaders } from "../utils/util";
import { simpleFragmentShader, simpleVertexShader } from "./simpleShader";

export function main () {
  const { gl, canvas } = initGl();
  const program = initShader(gl);
  const sky = new Sky(gl, []);
  gl.clearColor(0, 0, 0, 1);
  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftMouseHandler(e);
        break;
      case 1:
        midMouseHandler(e);
        break;
      default:
        break;
    }
  })

  const leftMouseHandler = (e: MouseEvent) => {
    const { x, y } = getPosInWebGL(e, canvas);
    const vertex = [
      x, y, 0, 10
    ];
    let polygon = sky.getLastChild();
    if (!polygon) {
      polygon = new Polygon(gl, program, [], {}, [gl.POINTS, gl.LINE_STRIP]);
      sky.addChild(polygon);
    }
    polygon.addVertice(vertex);
    sky.draw();
  }
  const midMouseHandler = (e: MouseEvent) => {
    const { x, y } = getPosInWebGL(e, canvas);
    const vertex = [
      x, y, 0, 10
    ];
    const polygon = new Polygon(gl, program, vertex, {}, [gl.POINTS, gl.LINE_STRIP]);
    sky.addChild(polygon);
    sky.draw();
  }
}

function initShader(gl: WebGL2RenderingContext) {
  const vs = simpleVertexShader();
  const fs = simpleFragmentShader();
  return initShaders(gl, vs, fs);
}
