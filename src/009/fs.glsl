precision mediump float;
uniform vec2 u_CanvasSize;

vec2 center = u_CanvasSize / 2.0;
float diagLen = length(center);
float pi2 = radians(360.0);
float omega = 4.0;
float a = 0.5;

// 渐变
float gradient(float ang) {
  return a * sin(omega * ang) + 0.5;
}
// 水平拉丝
float wire(vec2 v) {
  vec2 a = vec2(0.0, 1.0);
  float n = dot(v, a);
  return fract(tan(n) * 10000.0);
}

// 杂色
float noise(vec2 v) {
  vec2 a = vec2(0.1234, 0.5678);
  float n = dot(v, a);
  return fract(tan(n) * 10000.0);

}

//获取弧度
float getAngle(vec2 v) {
  float ang = atan(v.y, v.x);
  if (ang < 0.0) {
    ang += pi2;
  }
  return ang;
}

void main() {
  vec2 p = gl_FragCoord.xy - center;
  // // 极径
  float len = length(p);
  // // 极角
  float ang = getAngle(p);
  // // 极坐标转直角坐标
  float x = u_CanvasSize.x * ang / pi2;
  float y = (len / diagLen) * u_CanvasSize.y;
  
  float f1 = gradient(ang);
  f1 = 0.65 * f1 + 0.5;

  float f2 = wire(vec2(int(x), int(y)));
  f2 = clamp(f2, 0.75, 0.8);

  float f3 = noise(gl_FragCoord.xy);
  f3 *= 0.07;

  // 复合亮度
  float f = f1 * f2;

  float ratio = smoothstep(-1.0, 1.0, sin(ang));
  float r = 150.0;
  float expand = r + 4.0;
  if (len > r && len < expand) {
    f *= ratio + 0.3;
  }

  gl_FragColor = vec4(vec3(f), 1.0);
}
