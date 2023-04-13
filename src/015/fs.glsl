precision mediump float;
uniform vec3 u_kd;
uniform vec3 u_ks;
uniform vec3 u_LightDir;
uniform vec3 u_Eye;
varying vec3 v_Normal;
varying vec3 v_Position;
// blinn_phong material
void main() {
  vec3 eyeDir = normalize(u_Eye - v_Position);
  vec3 el = eyeDir + u_LightDir;
  // 视线与光线的角平分线
  vec3 h = el / length(el);
  // 漫反射
  vec3 diffuse = u_kd * max(0.0, dot(v_Normal, u_LightDir));
  // 反射
  vec3 specular = u_ks * pow(max(0.0, dot(v_Normal, h)), 64.0);
  // blinn_phong反射
  vec3 l = diffuse + specular;
  gl_FragColor = vec4(l, 1.0);
}