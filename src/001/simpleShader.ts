export function simpleVertexShader() {
  return `
    void main() {
      gl_Position = vec4(0, 0, -1, 1);
      gl_PointSize = 20.0;
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