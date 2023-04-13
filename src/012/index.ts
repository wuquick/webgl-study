import { bindGLTexture, getOrthographicMatrix, initGl, initShaders } from "../utils/util";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import birdUrl from './bird.jfif';
import { Matrix4, OrthographicCamera, PerspectiveCamera } from "three";

export async function main() {
  const { gl, canvas } = initGl();
  const program = initShaders(gl, vs, fs);

  const vertices = [
    -1.5, 0.5, 0, 0, 1,
    -1.5, -0.5, 0, 0, 0,
    -0.5, 0.5, 0, 1, 1,
    -0.5, -0.5, 0, 1, 0
  ];
  const indices = [
    0, 1, 2,
    2, 1, 3
  ];

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(a_Position);
  const a_Pin = gl.getAttribLocation(program, 'a_Pin');
  gl.vertexAttribPointer(a_Pin, 2, gl.FLOAT, false, 20, 12);
  gl.enableVertexAttribArray(a_Pin);

  const { width, height } = canvas;
  const h = 2;
  const w = h * (width / height);
  const camera = new OrthographicCamera(-w, w, h, -h, -1, 1);
  camera.position.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const mi = new Matrix4();
  const mb = new Matrix4();
  mi.setPosition(1.5, -0.5, 0);
  mb.setPosition(-1.5, 0.5, 0);

  const modelMatrix = new Matrix4();
  const mvpMatrix = camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse).multiply(modelMatrix);
  
  const u_MvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  await bindGLTexture(gl, program, birdUrl, 'u_Sampler');

  
  let angle = 0;
  function anim() {
    angle += 0.02;
    const modelMatrix = new Matrix4().copy(mb.clone().multiply(new Matrix4().makeRotationZ(angle)).multiply(mi));
    const mvpMatrix = camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse).multiply(modelMatrix);
    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(anim);
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
  anim();

}