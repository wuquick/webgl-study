import { Vector3 } from "three";
import { PerspectiveCamera } from "three";
import { SphereGeometry } from "three";
import { Scene } from "../engine/Scene";
import vs from './vs.glsl?raw';
import fs from './fs.glsl?raw';
import { IAttribute } from "../engine/types";

export function main() {
  const scene = new Scene();
  scene.createProgram(vs, fs);
  const { gl, program, canvas } = scene;

  const target = new Vector3();
  const eye = new Vector3(0, 0, 3);
  const [fov, aspect, near, far] = [45, canvas.width / canvas.height, 1, 20];
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  
  const lightDir = new Vector3(0.5, 1, 1).normalize();
  const u_kd = [0.7, 0.7, 0.7];
  const u_ks = [0.3, 0.3, 0.3];

  const sphere = new SphereGeometry(2, 32, 32);
  const vertices = sphere.getAttribute('position');
  const normals = sphere.getAttribute('normal');
  const indices = sphere.index;

  
  const positionAttr: IAttribute = {
    locationName: 'a_Position',
    size: 3,
    type: gl.FLOAT,
    normalized: false,
    stride: (3 + 3 + 2) * 4,
    offset: 0
  }
  
}