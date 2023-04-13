import { initGl, initShaders, loadImage } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import birdImgUrl from './bird-1.jfif';
import { Matrix4, Vector3 } from "three";
export async function main() {
  const { gl } = initGl();
  const program = initShaders(gl, vs, fs);

  // const cubeVertices = new Float32Array(getLineCubeVertices());
  const vertices = new Float32Array([
    -0.5, 0.5, 0, 0, 1,
    -0.5, -0.5, 0, 0, 0,
    0.5, 0.5, 0, 1, 1,
    0.5, -0.5, 0, 1, 0,
  ]);


  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  const a_Pin = gl.getAttribLocation(program, 'a_Pin');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(a_Position);
  gl.vertexAttribPointer(a_Pin, 2, gl.FLOAT, false, 20, 12);
  gl.enableVertexAttribArray(a_Pin);


  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  // 纹理映射
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const image = await loadImage(birdImgUrl);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  const u_Sampler = gl.getUniformLocation(program, 'u_Sampler');
  gl.uniform1i(u_Sampler, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  
  // 模型矩阵
  const modelMat = new Matrix4();
  const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMat.elements);

  // 视图矩阵
  const viewMat = new Matrix4();
  // viewMat.lookAt(new Vector3(2, 8, 2), new Vector3(0, 0, 0), new Vector3(0, 1, 0));
  const u_ViewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix');
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  

  
}