export function simpleVertexShader() {
  return `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
  `
}
export function simpleFragmentShader() {
  // distance glsl内置求两点距离的方法
  // gl_PointCoord 片元在一个点中的位置
  // discard 不渲染该片元
  return `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = u_FragColor;
      } else {
        discard;
      }
    }
  `
}