attribute vec4 a_Position;
uniform mat4 u_ProjectMatrix;
uniform mat4 u_ModelMatrix;
void main() {
  gl_Position = u_ProjectMatrix * u_ModelMatrix * a_Position;
}