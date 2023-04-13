import { Matrix4 } from "three";
import { Material } from "./Material";
import { Mesh } from "./Mesh";
import { Scene } from "./Scene";

export class Object3D {
  private mesh: Mesh;
  private material: Material;
  private scene: Scene;
  private curMat: Matrix4;
  constructor(mesh: Mesh, material: Material) {
    this.mesh = mesh;
    this.material = material;
  }
  added(scene: Scene) {
    this.scene = scene;
    this.mesh && this.mesh.added(scene);
    this.material && this.material.added(scene);
  }
  rotate(mvpMat: Matrix4, angle: number) {
    if (!this.curMat) {
      this.curMat = mvpMat;
    }
    const mat = new Matrix4().makeRotationY(angle);
    this.curMat = this.curMat.multiply(mat);
    console.log(this.curMat)
    this.material.changeUniform('u_MvpMatrix', {
      locationName: 'u_MvpMatrix',
      value: this.curMat.elements,
      type: 'mat4'
    })
  }
  draw() {
    const { gl } = this.scene;
    gl.drawElements(gl.TRIANGLES, this.mesh.getIndicesCount(), gl.UNSIGNED_BYTE, 0);
  }
}