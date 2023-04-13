attribute vec4 a_Position;
attribute vec3 a_Normal;
uniform mat4 u_MvpMatrix;
varying vec3 v_Normal;
varing vec3 v_Position;
void main() {
  gl_Position = u_MvpMatrix * a_Position;
  v_Normal = a_Normal;
  v_Position = a_Position;
}