import { initGl, initShaders } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';

export function main() {
  const { gl, canvas } = initGl();
  const program = initShaders(gl, vs, fs);

  const vertices = new Float32Array([
    -1, 1, 0,
    -1, -1, 0,
    1, 1, 0,
    1, -1, 0
  ]);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


  const a_Position = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  const u_CanvasSize = gl.getUniformLocation(program, 'u_CanvasSize');
  gl.uniform2f(u_CanvasSize, canvas.width, canvas.height);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}