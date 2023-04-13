import { autoResize } from "../utils/globalEvent";
import { initGl, initShaders } from "../utils/util";
import { simpleFragmentShader, simpleVertexShader } from "./simpleShader";
import { IPointAttrs, IPointStar } from "./type";


export function main() {
  const { gl, canvas } = initGl();
  // 开启blend以及设置blend混合函数
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_COLOR, gl.ONE_MINUS_CONSTANT_ALPHA);
  autoResize();
  const program = initShader(gl);
  const attrsArr = new Array(500).fill(0).map(() => createRandomAttrs());

  let startTime = performance.now();
  const starArr: IPointStar[] = attrsArr.map(v => {
    const hiddenTime =  Math.random() * 2000 + 500;
    const res: IPointStar = {
      ...v,
      oldColor: v.color,
      hiddenTime,
      visibleTime: hiddenTime + Math.random() * 300 + 200,
    };
    return res;
  })
  function anim() {
    const diffTime = performance.now() - startTime;
    starArr.forEach(v => {
      if (diffTime > v.hiddenTime && diffTime < v.visibleTime) {
        v.color = [0, 0, 0, 0];
      } else if (diffTime > v.visibleTime) {
        v.color = v.oldColor;
      }
    });
    if (diffTime > 3000) {
      startTime = performance.now();
    }
    draw(gl, program, starArr);
    requestAnimationFrame(() => anim());
  }
  anim();
}

function initShader(gl: WebGL2RenderingContext) {
  const vs = simpleVertexShader();
  const fs = simpleFragmentShader();
  return initShaders(gl, vs, fs);
}

function createRandomAttrs() {
  const attrs: IPointAttrs = {
    position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
    size: Math.random() * 5 + 2,
    color: [Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random()]
  };
  return attrs;
}

function draw(gl: WebGL2RenderingContext, program: WebGLProgram, attrsArr: IPointStar[]) {
  function drawACircle(attrs: IPointStar) {
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttrib3f(a_Position, ...attrs.position);
    const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
    gl.vertexAttrib1f(a_PointSize, attrs.size);
    const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    gl.uniform4f(u_FragColor, ...attrs.color);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  attrsArr.forEach(v => drawACircle(v));
}


