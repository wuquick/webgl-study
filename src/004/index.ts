import { autoResize } from "../utils/globalEvent";
import { initGl, initShaders } from "../utils/util";
import { simpleFragmentShader, simpleVertexShader } from "../005/simpleShader";
import { IPointAttrs } from "./type";


export function main() {
  const { gl, canvas } = initGl();
  autoResize();
  const program = initShader(gl);
  // 通过缓冲区绘制多个顶点
  // const vertices = new Float32Array(new Array(6).fill(0).map(v => createRandomAttrs()).map(v => {
  //   return [...v.position, v.size];
  // }).flat(1));
  // 画一个矩形
  const vertices = new Float32Array([
    -0.2, 0.2, 0, 1,
    -0.2, -0.2, 0, 1,
    0.2, 0.2, 0, 1,
    0.2, -0.2, 0, 1
  ])
  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(a_Position);
  const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 16, 12);
  gl.enableVertexAttribArray(a_PointSize);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // POINTS, LINES, LINE_STRIP, LINE_LOOP
  // TRANGLES, TRANGLE_STRIP, TRANGLE_FAN
  // gl.drawArrays(gl.LINE_LOOP, 0, 3);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function initShader(gl: WebGL2RenderingContext) {
  const vs = simpleVertexShader();
  const fs = simpleFragmentShader();
  return initShaders(gl, vs, fs);
}

function createRandomAttrs() {
  const attrs: IPointAttrs = {
    position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
    size: 1,
    color: [Math.random(), Math.random(), Math.random(), 1]
  };
  return attrs;
}

