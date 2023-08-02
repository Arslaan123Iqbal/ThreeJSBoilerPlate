import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { vVertex } from '../shaders/vertex';
import { vFragment } from '../shaders/fragment';





export class Sketch {
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
      this.renderer.setPixelRatio(window.devicePixelRatio, 2);
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
