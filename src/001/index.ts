import { autoResize } from "../utils/globalEvent";
import { initGl, initShaders } from "../utils/util";
import { simpleFragmentShader, simpleVertexShader } from "./simpleShader";

export function main() {
  const { gl } = initGl();
  autoResize();
  initShader(gl);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}

function initShader(gl: WebGL2RenderingContext) {
  const vs = simpleVertexShader();
  const fs = simpleFragmentShader();
  initShaders(gl, vs, fs);
}

// function animation(gl: WebGL2RenderingContext, startColor: [number, number, number, number]) {
//   let [r, g, b, a] = startColor;
//   r += 0.01;
//   if (r > 1) {
//     r = 0;
//   }
//   startColor[0] = r;
//   gl.clearColor(r, g, b, a);
//   gl.clear(gl.COLOR_BUFFER_BIT);
//   requestAnimationFrame(() => animation(gl, startColor));
// }