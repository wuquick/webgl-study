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
  return `
    void main() {
      gl_FragColor = vec4(1, 1, 0, 1);
    }
  `
}