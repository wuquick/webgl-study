import { IMat4, IUniformMap } from "./type";

export class Polygon {
  private gl: WebGL2RenderingContext;
  private vertices: number[];
  private types: number[];
  private uniforms: IUniformMap;
  private program: WebGLProgram;
  constructor(gl: WebGL2RenderingContext, program: WebGLProgram, vertices: number[], uniforms: IUniformMap, types?: number[]) {
    this.gl = gl;
    this.program = program;
    this.vertices = vertices;
    if (!types) {
      types = [gl.POINTS];
    }
    this.types = types;
    this.uniforms = uniforms;
    this.init();
  }
  init() {
    const vBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    const a_Position = this.gl.getAttribLocation(this.program, 'a_Position');
    this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(a_Position);
    for (const key in this.uniforms) {
      const value = this.uniforms[key];
      const location = this.gl.getUniformLocation(this.program, key);
      if (!location) {
        console.error(`${key} uniform not found`);
        continue;
      }
      if (value.length === 4) {
        this.gl.uniform4f(location, ...value);
      } else {
        this.gl.uniformMatrix4fv(location, false, new Float32Array(value));
      }
    }
  }
  addVertice(vertex: number[]) {
    this.vertices.push(...vertex);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
  }
  updateUniform(key: string, value: number[]) {
    const location = this.gl.getUniformLocation(this.program, key);
    this.gl.uniformMatrix4fv(location, false, new Float32Array(value));
  }
  draw() {
    this.types.forEach( type => this.gl.drawArrays(type, 0, this.vertices.length / 3));
  }
}

export class Sky {
  private gl: WebGL2RenderingContext;
  public children: Polygon[];
  constructor(gl: WebGL2RenderingContext, children: Polygon[]) {
    this.gl = gl;
    this.children = children;
  }

  getLastChild() {
    if (!this.children.length) {
      return null;
    }
    return this.children[this.children.length - 1];
  }

  addChild(poly: Polygon) {
    this.children.push(poly);
  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.children.forEach(v => {
      v.init();
      v.draw();
    })
  }
}