//////////////////////////////////////////////////////////////////////////////////
//		Init
//////////////////////////////////////////////////////////////////////////////////

// init renderer
var renderer	= new THREE.WebGLRenderer({
  antialias	: true
});
renderer.setClearColor(new THREE.Color('black'), 1)
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// array of functions for the rendering loop
var onRenderFcts= [];

// init scene and camera
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 100;
var controls	= new THREE.OrbitControls(camera);

//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

// Material
function Material(ind) { 
  return new THREE.MeshPhongMaterial({
    color     :  new THREE.Color("rgb("+
                                 ~~(255-ind*8)+","+
                                 ~~(255-ind*10)+","+
                                 ~~(ind*8)+")"),
    emissive   :  new THREE.Color("rgb(5,5,0)"),
    specular   :  new THREE.Color("rgb(122,0,93)"),
    shininess  :  10,
    transparent: true,
    opacity    : 0.4
  }); 
}

// Lights 
var light = new THREE.PointLight( 0xffffff, 1);
light.position.z = 400;
scene.add(light);

// Shapes
function Building(f){
  this.b = new THREE.Mesh(new THREE.CylinderGeometry(11*f, 11*f, 0.001, 6), Material(f));
  this.b.position.z = -f*5;
  this.b.rotation.x = 1.57; 
}

var numBuilds = 25;
var tabBuilds = [];
for(var i=0; i<numBuilds; i++){
  tabBuilds.push(new Building(i));
  scene.add(tabBuilds[i].b);
}	

var tmp = 0;
// Update
function update(){
  for(var i=0; i<numBuilds; i++){
    tabBuilds[i].b.position.z = -6.28-Math.abs(Math.cos(tmp))*i*5-i*2;     
    tabBuilds[i].b.rotation.y = Math.cos(tmp)*i/20;     
  }
  tmp += 1/100;
}

//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////

// handle window resize
window.addEventListener('resize', function(){
  renderer.setSize( window.innerWidth, window.innerHeight )
  camera.aspect	= window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()		
}, false)

// render the scene
onRenderFcts.push(function(){
  update();
  renderer.render( scene, camera );		
})

// run the rendering loop
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
  var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec	= nowMsec
  // call each update function
  onRenderFcts.forEach(function(onRenderFct){
    onRenderFct(deltaMsec/1000, nowMsec/1000)
  })
})