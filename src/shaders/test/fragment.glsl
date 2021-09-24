uniform float time;
uniform vec2 mouse;
uniform vec4 resolution;
varying vec2 vUv;

float sdf(vec3 p,float r){
    return length(p) - 0.4;
}

void main( ) {

    gl_FragColor = vec4(vUv, 0.0, 0.);
}