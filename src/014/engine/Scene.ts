import { Object3D } from "./Object3D";

export class Scene {
  public gl: WebGL2RenderingContext;
  public program: WebGLProgram;
  public canvas: HTMLCanvasElement;
  public children: Object3D[];
  constructor(canvas?: HTMLCanvasElement) {
    if (!canvas) {
      const c = document.querySelector('canvas');
      if (!c) {
        throw new Error('no canvas element');
      }
      canvas = c;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      throw new Error('init gl failed');
    }
    gl.clearColor(0, 0, 0, 1);
    this.canvas = canvas;
    this.gl = gl;
    this.children = [];
  }
  loadShader(type: number, source: string) {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw new Error('load shader failed');
    }
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }
  createProgram(vs: string, fs: string) {
    const program = this.gl.createProgram();
    if (!program) {
      throw new Error('create program failed');
    }
    const vsShader = this.loadShader(this.gl.VERTEX_SHADER, vs);
    const fsShader = this.loadShader(this.gl.FRAGMENT_SHADER, fs);
    this.gl.attachShader(program, vsShader);
    this.gl.attachShader(program, fsShader);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);
    this.program = program;
    return program;
  }
  add(obj: Object3D) {
    this.children.push(obj);
    obj.added(this);
  }
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.children.forEach(c => {
      c.draw();
    })
  }
}