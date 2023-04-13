import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import { Scene } from "./engine/Scene";
import { Mesh } from './engine/Mesh';
import { IAttribute } from "./engine/types";
import { Object3D } from "./engine/Object3D";
import { Material } from "./engine/Material";
import { IUniform } from "./engine/types";
import birdUrl from './bird.jfif';
import { bindGLTexture } from './engine/utils/bindTexture';
import { Matrix4, OrthographicCamera } from 'three';

export async function main() {
  const scene = new Scene();
  const { gl, canvas, program } = scene;
  scene.createProgram(vs, fs);

  const vertices = [
    -1, -1, -1, 1, 1, 1,
    -1, 1, -1, 0, 0, 0,
    1, 1, -1, 1, 0, 0,
    1, -1, -1, 0, 1, 0,
    -1, -1, 1, 0, 0, 1,
    -1, 1, 1, 1, 1, 0,
    1, 1, 1, 0, 1, 1,
    1, -1, 1, 1, 0, 1
  ];
  const indices = [
    0, 1, 2,
    0, 2, 3,
    4, 6, 5,
    4, 7, 6,
    4, 5, 1,
    4, 1, 0,
    3, 2, 6,
    3, 6, 7,
    1, 5, 6,
    1, 6, 2,
    4, 0, 3,
    4, 3, 7
  ];

  const positionAttr: IAttribute = {
    locationName: 'a_Position',
    size: 3,
    type: scene.gl.FLOAT,
    normalized: false,
    stride: 24,
    offset: 0
  }
  const pinAttr: IAttribute = {
    locationName: 'a_Color',
    size: 3,
    type: scene.gl.FLOAT,
    normalized: false,
    stride: 24,
    offset: 12
  }
  
  const { width, height } = scene.canvas;
  const h = 2;
  const w = h * (width / height);
  const camera = new OrthographicCamera(-w, w, h, -h, -1, 1);
  camera.position.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const modelMatrix = new Matrix4();
  const mvpMatrix = camera.projectionMatrix.clone().multiply(camera.matrixWorldInverse).multiply(modelMatrix);

  const mvpUniform: IUniform = {
    locationName: 'u_MvpMatrix',
    value: mvpMatrix.elements,
    type: 'mat4'
  }
  
  const mesh = new Mesh(vertices, indices, [positionAttr, pinAttr]);
  const material = new Material([mvpUniform]);
  const obj = new Object3D(mesh, material);
  scene.add(obj);

  function anim() {
    obj.rotate(mvpMatrix, 0.01);
    scene.render();
    requestAnimationFrame(anim);
  }

  anim();

  
}