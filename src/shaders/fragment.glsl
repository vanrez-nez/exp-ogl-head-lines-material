precision highp float;
precision highp int;
uniform float time;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPos;

void main() {
  float c = mod(vPos.y + vPos.x * 0.2 + vPos.z * 0.4 + time, 0.02) * 50.;
  float stroke = 0.85 - vPos.z * 0.5;
  float s = smoothstep(stroke, stroke + 0.1, c);
  s = smoothstep(stroke - 0.1, stroke, s);
  gl_FragColor.rgb = vec3(s);
  gl_FragColor.a = vPos.z + 0.4;
  if (s < 0.01) discard;
}