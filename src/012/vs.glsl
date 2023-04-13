attribute vec4 a_Position;
attribute vec2 a_Pin;
uniform mat4 u_MvpMatrix;
varying vec2 v_Pin;
void main() {
  v_Pin = a_Pin;
  gl_Position = u_MvpMatrix * a_Position;
}