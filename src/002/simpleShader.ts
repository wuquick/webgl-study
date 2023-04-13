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
  // precision mediump float 定义浮点数精度
  return `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
      gl_FragColor = u_FragColor;
    }
  `
}