attribute vec4 a_Position;
uniform mat4 u_ProjectMatrix;
void main() {
  gl_Position = u_ProjectMatrix * a_Position;
}