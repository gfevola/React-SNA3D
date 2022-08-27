import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

function ShaderTest() {
  const ref = useRef();

	const uniforms = {
	  u_resolution: { value: { x: null, y: null } },
	  u_time: { value: 0.0 },
	  u_mouse: { value: { x: null, y: null } },
	}

	  useEffect(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
		  75,
		  window.innerWidth / window.innerHeight,
		  0.1,
		  1000

		);

	const clock = new THREE.Clock();
 
	const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
	ref.current.appendChild(renderer.domElement);
   

	const geometry = new THREE.BoxGeometry(5, 5, 5);
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	

	const mat = new THREE.ShaderMaterial({
		  vertexShader: vShader,
		  fragmentShader: fShader2,
		  uniforms
		});	


	//working
	var vertexDisplacement = new Float32Array(geometry.faces.length);
	
	for (var i = 0; i < vertexDisplacement.length; i ++) {
		vertexDisplacement[i] = Math.sin(i);
	}

	//complete cube
    const cube = new THREE.Mesh(geometry, mat);
    scene.add(cube);
    camera.position.z = 5;

	
    const animate = function () {
      requestAnimationFrame(animate);
      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
	  uniforms.u_time.value = clock.getElapsedTime();

    };
    animate();

    return () => {
        // Callback to cleanup three js, cancel animationFrame, etc
    }
	
  }, []);

  return <div ref={ref} />;
}

//const rootElement = document.getElementById("root");

export default ShaderTest;

const vShader = `
  varying vec2 vUv;
  
  void main() { 
	vUv = uv;  
	vec4 v = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    gl_Position = v;
}`

const fShader = `
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_time;
  varying vec2 vUv;
 
 
void main() {
		vec2 p = - 1.0 + 2.0 * vUv;
		float a = u_time * 40.0;
		float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

		i = 1.0 + fract( e * g + a / 2.0 ) * 20.0;
		e = 400.0 * ( p.x * 0.5 + 0.5 );
		f = 400.0 * ( p.y * 0.5 + 0.5 );
		r = sqrt( pow( abs( i - e ), 2.0 ));



		i += cos(e * 2.3) * 50.0 * sin( f - ( r * 4.3 + a / 12.0 ) * g ) + 50.0 * cos( r * g );
		i += mod( i / 5.6, 256.0 ) / 28.0;
		if ( i < 0.0 ) i += 4.0;
		if ( i >= 3.0 ) i = 4.0 - i;


	gl_FragColor = vec4((i*sin(r*.1),r * .05,cos(i)),1); 


}
`

/////////////////////
const fShader1 = `

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 vUv;
 
void main(){
	float a, b, c, i;
	vec2 p = - 1.0 + 2.0 * vUv;
	
	i = sin(p.x + cos(u_time));
	a = sin(p.x) + 1.0;
	b = pow(sin(a + .4),i) * p.y;
	c = pow(a,.5);
	i += cos(a)*2.0 + c;
		if ( i < 0.0 ) i += 4.0;
		if ( i >= 2.0 ) i = 4.0 - i;
		
	gl_FragColor = vec4( a,b,c/i, 1.0 );
}

`


const fShader2 = `
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 vUv;
  
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = vUv/u_resolution;

    float y = smoothstep(0.1,0.9,st.x);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
`
