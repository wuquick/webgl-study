import { Material } from "./Material";
import { Mesh } from "./Mesh";
import { Scene } from "./Scene";

export class Object3D {
  private mesh: Mesh;
  private material: Material;
  private scene: Scene;
  constructor(mesh: Mesh, material: Material) {
    this.mesh = mesh;
    this.material = material;
  }
  added(scene: Scene) {
    this.scene = scene;
    this.mesh && this.mesh.added(scene);
    this.material && this.material.added(scene);
  }
  draw() {
    const { gl } = this.scene;
    gl.drawElements(gl.TRIANGLES, this.mesh.getIndicesCount(), gl.UNSIGNED_BYTE, 0);
  }
}