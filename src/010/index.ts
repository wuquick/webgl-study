import { initGl, initShaders, makeOrthographic } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
export function main() {
  const { gl, canvas } = initGl();
  const program = initShaders(gl, vs, fs);

  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5
  ]);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // 正交投影矩阵
  const halfH = 2;
  const ratio = canvas.width / canvas.height;
  const halfW = halfH * ratio;
  const projectMatrix = new Float32Array(makeOrthographic({
    top: halfH,
    bottom: -halfH,
    left: -halfW,
    right: halfW,
    near: 2,
    far: -2
  }))
  const u_ProjectMatrix = gl.getUniformLocation(program, 'u_ProjectMatrix');
  gl.uniformMatrix4fv(u_ProjectMatrix, false, projectMatrix);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}