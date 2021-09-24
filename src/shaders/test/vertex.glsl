varying vec2 vUv;

void main() {

    vec4 myPosition = modelViewMatrix * vec4(position, 1.);
    gl_PointSize = 100. * (1. / - myPosition.z);
    gl_Position = projectionMatrix * myPosition;

    vUv = uv;
}