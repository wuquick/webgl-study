import { autoResize } from "../utils/globalEvent";
import { initGl, initShaders } from "../utils/util";
import { simpleFragmentShader, simpleVertexShader } from "./simpleShader";
import { IPointAttrs } from "./type";


export function main() {
  const { gl, canvas } = initGl();
  autoResize();
  const program = initShader(gl);
  const attrs = createProxyAttrs(gl, program);
  draw(gl, program, attrs);

  document.addEventListener('mousemove', ({ clientX, clientY }) => {
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const [halfWidth, halfHeight] = [width / 2, height / 2];
    const x = (clientX - left - halfWidth) / halfWidth;
    const y = -(clientY - top - halfHeight) / halfHeight;
    attrs.position = [x, y, 0];
  });
  document.addEventListener('mousedown', () => {
    attrs.size += 1;
    const [r, g, b] = [Math.random(), Math.random(), Math.random()];
    attrs.color = [r, g, b, 1];
  })
}

function initShader(gl: WebGL2RenderingContext) {
  const vs = simpleVertexShader();
  const fs = simpleFragmentShader();
  return initShaders(gl, vs, fs);
}

function createProxyAttrs(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const _attrs: IPointAttrs = {
    position: [0, 0, 0],
    size: 20,
    color: [1, 1, 0, 1]
  };
  const attrs = new Proxy(_attrs, {
    get(t, p, r) {
      return t[p];
    },
    set(t, p, newValue: number, r) {
      t[p] = newValue;
      draw(gl, program, t);
      return true;
    }
  });
  return attrs;
}

function draw(gl: WebGL2RenderingContext, program: WebGLProgram, attrs: IPointAttrs) {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 获取 attribute 变量
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  // 修改 attribute 变量
  gl.vertexAttrib3f(a_Position, ...attrs.position);
  const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
  gl.vertexAttrib1f(a_PointSize, attrs.size);
  // 获取 uniform 变量
  const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
  // 修改 uniform 变量
  gl.uniform4f(u_FragColor, ...attrs.color);
  gl.drawArrays(gl.POINTS, 0, 1);
}

