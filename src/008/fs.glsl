precision mediump float;
varying vec2 v_Pin;
uniform sampler2D u_Sampler;
uniform sampler2D u_Pattern;
void main() {
  vec4 o = texture2D(u_Sampler, v_Pin);
  vec4 p = texture2D(u_Pattern, v_Pin);
  gl_FragColor = mix(o, p, 0.5);
}