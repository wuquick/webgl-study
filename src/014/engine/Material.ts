import { Scene } from "./Scene";
import { IUniform } from "./types";
import { bindGLTexture } from "./utils/bindTexture";

export class Material {
  private scene: Scene;
  private uniforms: IUniform[];
  constructor(uniforms: IUniform[]) {
    this.uniforms = uniforms;
  }
  async added(scene: Scene) {
    this.scene = scene;
    this.setUniform();
  }
  changeUniform(location: string, uniform: IUniform) {
    const idx = this.uniforms.findIndex(v => v.locationName = location);
    if (idx >= 0) {
      this.uniforms.splice(idx, 1);
      this.uniforms.push(uniform);
    }
    this.setUniform();
  }
  setUniform() {
    const { gl, program } = this.scene;
    this.uniforms.forEach(async u => {
      const { type, locationName, value } = u;
      const location = gl.getUniformLocation(program, locationName);
      if (!location) {
        throw new Error(`${locationName} unifrom not exist`);
      }
      switch (type) {
        case 'image':
        case 'video': {
          bindGLTexture(gl, program, value as string, location, type);
          break;
        }
        case 'mat4':
          gl.uniformMatrix4fv(location, false, value as number[]);
          break;
        default:
          gl[`uniform${value.length}fv`](location, ...value);
          break;
      }
    })
  }
}