import { initGl, initShaders } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import { getLineCubeVertices } from "../utils/models/line-cube";
import { Matrix4, Vector3 } from "three";
export function main() {
  const { gl } = initGl();
  const program = initShaders(gl, vs, fs);

  // const cubeVertices = new Float32Array(getLineCubeVertices());
  const vertices = new Float32Array([
    -0.2, -0.2, 0, 1, 0, 0,
    0.2, -0.2, 0, 0, 1, 0,
    0, 0.2, 0, 0, 0, 1
  ]);


  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Color = gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 24, 0);
  gl.enableVertexAttribArray(a_Position);
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 24, 12);
  gl.enableVertexAttribArray(a_Color);


  // 模型矩阵
  const modelMat = new Matrix4();
  const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMat.elements);

  // 视图矩阵
  const viewMat = new Matrix4();
  // viewMat.lookAt(new Vector3(2, 8, 2), new Vector3(0, 0, 0), new Vector3(0, 1, 0));
  const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);


  let angle = 0.1;
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  anim();

  function anim() {
    angle += 0.01;
    modelMat.makeRotationY(angle);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMat.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(anim);
  }
  
}