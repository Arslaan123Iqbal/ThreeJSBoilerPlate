import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import vVertex from '../shaders/vertex.glsl'
// import vFragment from '../shaders/fragment.glsl'


const vVertex =`
varying vec2 v_uv;
void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`
const vFragment = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`
// export default class Sketch {
//     constructor(options){
//         this.scene = new THREE.Scene();
//         this.container = options.dom;
//         this.width = this.container.offsetWidth;
//         this.height = this.container.offsetHeight;
//         this.renderer = new THREE.WebGLRenderer();
//         this.renderer.setPixelRatio(window.devicePixelRatio, 2);
//         this.renderer.setSize(this.width, this.height);
//         this.renderer.sortObjects = false;
//         this.renderer.physicallyCorrectLights = true
//         this.renderer.setClearColor(0x00000,0)
//         this.renderer.outputEncoding = THREE.sRGBEncoding;
    
    
//         this.container.appendChild(this.renderer.domElement);
    
//         this.camera = new THREE.PerspectiveCamera(
//           70,
//           window.innerWidth / window.innerHeight,
//           0.001,
//           1000
//         );
    
//         this.camera.position.set(0, 0, 2);
//         this.camera.position.z = 5;
//         this.camera.lookAt(0, 0, 0);
//         this.controls =  new OrbitControls(this.camera,this.renderer.domElement)
//         this.time = 0;
//         // this.isPlaying = true;
    
//       //   this.settings();
//         // this.setupResize();
    
//         this.addObjects();
//         // this.resize();
//         this.render();

//         console.log(this.addObjects)
//     }
//     // setupResize(){
//     //     window.addEventListener("resize", this.resize.bind(this));
//     // }

//         // resize(){
//         //     this.width = this.container.offsetWidth;
//         //     this.height = this.container.offsetHeight;

//         //     this.renderer.setSize(this.width, this.height);

//         //     this.camera.aspect = this.width / this.height;
            
//         //     this.imageAspect = 853/1200;
//         //     let a1;
//         //     let a2;

//         //     if(this.width / this.height > this.imageAspect){
//         //         a1 = (this.width / this.height) * this.imageAspect;
//         //         a2 = a1;
//         //     }else{
//         //         a1 = 1;
//         //         a2 = (this.width / this.height) * this.imageAspect;
//         //     }

//         //     this.material.uniforms.resolution.value.x = this.width;
//         //     this.material.uniforms.resolution.value.y = this.height;
//         //     this.material.uniforms.resolution.value.z= a1;
//         //     this.material.uniforms.resolution.value.w = a2;


//         //     this.camera.updateProjectionMatrix();


//         // }

//         addObjects() {
//             let that = this;
   
//             this.material = new THREE.ShaderMaterial({
//               extensions: {
//                 derivatives: "#extension GL_OES_standard_derivatives : enable"
//               },
//               side: THREE.DoubleSide,
//               uniforms: {
//                 time: { value: 0 },
//               //   progress: { type: "f", value: 0 },
//               //   angle: { type: "f", value: 0 },
//               //   texture1: { type: "t", value: null },
//               //   texture2: { type: "t", value: null },
//                 resolution: { type: "v4", value: new THREE.Vector4() },
//                 uvRate1: {
//                   value: new THREE.Vector2(1, 1)
//                 }
//               },
//               // wireframe: true,
//               // transparent: true,
//               vertexShader: vVertex,
//               fragmentShader: vFragment
//             });
//             // this.material = new THREE.MeshBasicMaterial({color:"green"})
//             this.geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
//             this.plane = new THREE.Mesh(this.geometry, this.material);
//             this.scene.add(this.plane);
//         }  
        
//         // stop(){
//         //     this.isPlaying = true;
//         // }

//         // play(){
//         //     if(!this.isPlaying){
//         //         this.isPlaying = true;
//         //         this.render();
//         //     }
//         // }

//       render(){
//         // if(!this.isPlaying) return;
//         // this.time += 0.05;
//         // // this.material.uniforms.time.value = this.time;
//         requestAnimationFrame(this.render.bind(this));
//         this.renderer.render(this.scene, this.camera);
        
//       }
// }

// class Sketch{
//     constructor(options){
//         this.scene = new THREE.Scene();
//         this.container = options.dom;
//         this.width = this.container.offsetWidth;
//         this.height = this.container.offsetHeight;
//         this.renderer = new THREE.WebGLRenderer();
//         this.renderer.setPixelRatio(window.devicePixelRatio, 2);
//         this.renderer.setSize(this.width, this.height);
//         this.renderer.sortObjects = false;
//         this.renderer.physicallyCorrectLights = true
//         this.renderer.setClearColor(0x00000,0)
//         this.renderer.outputEncoding = THREE.sRGBEncoding;
    
    
//         this.container.appendChild(this.renderer.domElement);
    
//         this.camera = new THREE.PerspectiveCamera(
//           70,
//           window.innerWidth / window.innerHeight,
//           0.001,
//           1000
//         );
    
//         // this.camera.position.set(0, 0, 2);
//         this.camera.position.z = 5;
//         // this.camera.lookAt(0, 0, 0);

//         this.geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
//         this.plane = new THREE.Mesh(this.geometry, this.material);
//         this.scene.add(this.plane);

//         this.animate();
//     }


//     animate(){
//    requestAnimationFrame(this.animate.bind(this));
//    this.renderer.render(this.scene, this.camera);
//         }

//     }


// new Sketch({ dom: document.getElementById('container') });
class Sketch {
    constructor(options) {
      this.container = options.dom
      this.scene = new THREE.Scene();
     
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      );
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      
      this.renderer.setClearColor(0xffffff,1)
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);
      this.camera.position.set(0, 0, 2);
      this.camera.lookAt(0, 0, 0);
      this.controls =  new OrbitControls(this.camera,this.renderer.domElement)
      this.time = 0;
      // this.isPlaying = true;
      
      this.animate();
      this.addObjects();   
      this.resize();
      this.setupResize();
  
    }
 

    addObjects() {
      const geometry = new THREE.PlaneGeometry(1, 1, 1);
      const material = new THREE.ShaderMaterial({
                      extensions: {
                        derivatives: "#extension GL_OES_standard_derivatives : enable"
                      },
                      side: THREE.DoubleSide,
                      uniforms: {
                        time: { value: 0 },
                      //   progress: { type: "f", value: 0 },
                      //   angle: { type: "f", value: 0 },
                      //   texture1: { type: "t", value: null },
                      //   texture2: { type: "t", value: null },
                        resolution: { type: "v4", value: new THREE.Vector4() },
                        uvRate1: {
                          value: new THREE.Vector2(1, 1)
                        }
                      },
                      // wireframe: true,
                      // transparent: true,
                      vertexShader: vVertex,
                      fragmentShader: vFragment
                    });
      this.plane = new THREE.Mesh(geometry, material);
      this.scene.add(this.plane);
    }
          stop(){
            this.isPlaying = true;
        }

        play(){
            if(!this.isPlaying){
                this.isPlaying = true;
                this.render();
            }
        }

    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
  }
  
new Sketch({dom: document.getElementById("container")});