import { Scene } from "./Scene";
import { IAttribute } from "./types";

export class Mesh {
  private vertices: number[];
  private indices: number[];
  private scene: Scene;
  private attributes: IAttribute[];
  constructor(vertices: number[], indices: number[], attributes: IAttribute[]) {
    this.vertices = vertices;
    this.indices = indices;
    this.attributes = attributes;
  }
  added(scene: Scene) {
    this.scene = scene;
    this.setBuffer();
    this.setAttribute();
  }
  setBuffer() {
    const { gl } = this.scene;
    const vBuffer = gl.createBuffer();
    if (!vBuffer) {
      throw new Error('create buffer failed');
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const iBuffer = gl.createBuffer();
    if (!iBuffer) {
      throw new Error('create buffer failed');
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(this.indices), gl.STATIC_DRAW);
  }
  setAttribute() {
    const { gl, program } = this.scene;
    this.attributes.forEach(attr => {
      const { locationName, size, type, normalized, stride, offset } = attr;
      const location = gl.getAttribLocation(program, locationName);
      gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
      gl.enableVertexAttribArray(location);
    })
  }
  getIndicesCount() {
    return this.indices.length;
  }
}