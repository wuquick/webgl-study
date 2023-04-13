attribute vec4 a_Position;
attribute vec2 a_Pin;
varying vec2 v_Pin;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
void main() {
  gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;
  v_Pin = a_Pin;
}