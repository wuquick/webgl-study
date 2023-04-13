attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ViewMatrix;
void main() {
  gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;
  v_Color = a_Color;
}