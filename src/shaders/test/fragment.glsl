uniform float time;
uniform sampler2D t;
uniform vec2 mouse;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;

void main( ) {
    // vec2 newUV = vPosition.xy / vec2(480.*1.5, 820.*1.5) + vec2(0.5);
    // gl_FragColor = vec4(1., 0., 0.0, 1.);

    vec4 tt = texture2D(t, vUv);
    gl_FragColor = vec4(vUv, 0., 1.);
    gl_FragColor = tt;
    // gl_FragColor = vec4(1., 1., 1., 0.5);
}