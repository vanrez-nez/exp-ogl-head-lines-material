precision highp float;
precision highp int;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat3 normalMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}