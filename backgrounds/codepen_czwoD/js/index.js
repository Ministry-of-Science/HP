var $container = $('#container');
var renderer = new THREE.WebGLRenderer({antialias: true});
var camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,10000);
var scene = new THREE.Scene();

scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);

/////////////////////////////////////////

// Camera Settings
camera.position.z = 200;
camera.position.y = 150;
camera.lookAt(new THREE.Vector3(0,0,-150));

// Light 
var light = new THREE.PointLight( 0xff0, 3);
light.position.y = 500;
light.position.z = 150;
scene.add(light);

var light2 = new THREE.PointLight( 0xf0f, 3);
light2.position.y = -200;
light2.position.z = 150;
scene.add(light2);

// Material
var mat = new THREE.MeshPhongMaterial({
  color     : 0xFFFFFF,
  emissive  : 0x1F1FF1,
  specular  : 0xFFFFFF,
  shininess : 3,
  transparent: 1,
  opacity:  0.8
});

// Cubes
var cubes = [];
function Cube(px,pz){
   this.mesh = new THREE.Mesh(new THREE.CubeGeometry(50,1,80), mat);
   this.mesh.rotation.z = -3.14;
   this.mesh.rotation.y = 5.14;
   this.mesh.position.x = px;
   this.mesh.position.z = pz;
   this.mesh.position.y = THREE.Math.randInt(-200,-500);
   this.acc = THREE.Math.randFloat(2,8)/100;
}

for(var i=1; i<10; i++){
  for(var j=1; j<10; j++){ 
    var pole = (i%2) ? 0 : -30;   
      cubes.push(new Cube(-250+i*50,-800+j*80+pole));  
 }
}

for(var k=0;k<cubes.length;k++){
    scene.add(cubes[k].mesh); 
}


// Update
function update(){
  camera.rotation.z += 0.008;
  for(var k=0;k<cubes.length;k++){ 
    cubes[k].mesh.rotation.z *= 0.99-cubes[k].acc; 
    cubes[k].mesh.rotation.y *= 0.99-cubes[k].acc; 
    cubes[k].mesh.position.y *= 0.99-cubes[k].acc; 
    cubes[k].mesh.position.z += 3;
    if(cubes[k].mesh.position.z>400)
    {
      cubes[k].mesh.position.z = -300;
      cubes[k].mesh.rotation.z =  THREE.Math.randInt(-5,5);
      cubes[k].mesh.rotation.y = THREE.Math.randInt(-2,2);
      cubes[k].mesh.position.y = THREE.Math.randInt(-400,-600);
    }
  } 
}


// Render
function render() {
  requestAnimationFrame(render);			
  renderer.render(scene, camera);
  update();			
}

render();