import { getOrthographicMatrix, initGl, initShaders } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import { Matrix4, PerspectiveCamera } from "three";
export function main() {
  const { gl, canvas } = initGl();
  const program = initShaders(gl, vs, fs);

  const vertices1 = new Float32Array([
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0, 0.5, 0
  ]);

  const vertices2 = new Float32Array([
    -0.5, -0.5 + 2, -8,
    0.5, -0.5 + 2, -8,
    0, 0.5 + 2, -8
  ])


  // 正交
  // const projectMatrix = getOrthographicMatrix(canvas);
  // const u_ProjectMatrix = gl.getUniformLocation(program, 'u_ProjectMatrix');
  // gl.uniformMatrix4fv(u_ProjectMatrix, false, projectMatrix);

  // 透视
  const [fov, aspect, near, far] = [45, canvas.width / canvas.height, 1, 20];
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  const u_ProjectMatrix = gl.getUniformLocation(program, 'u_ProjectMatrix');
  gl.uniformMatrix4fv(u_ProjectMatrix, false, camera.projectionMatrix.elements);

  const modelMatrix = new Matrix4().makeRotationY(0 * Math.PI / 180).makeTranslation(0, 0, -3);
  const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  const u_Color = gl.getUniformLocation(program, 'u_Color');
  gl.uniform4f(u_Color, 255, 255, 0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLES, 0, 3);
  // gl.drawArrays(gl.TRIANGLES, 3, 6);

  function draw(vertices) {
    const vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  draw(vertices1);
  draw(vertices2);


}


// 透视投影矩阵
/**
 * [
 *  2n / (r - 1),    0,               (r + l) / (r - l),    0,
 *  0,               2n / (t - b),    (t + b) / (t - b),    0,
 *  0,               0,               -(f + n) / (f - n),   -2fn(f - n),
 *  0,               0,               -1,                   0
 * ] 
 *
 */