//////////////////////////////////////////////////////////////////////////////////
//		Init
//////////////////////////////////////////////////////////////////////////////////
// init renderer
var renderer	= new THREE.WebGLRenderer({
  antialias	: false
});
renderer.setClearColor(new THREE.Color('#181595'), 1)
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.shadowMapEnabled = false;	
document.body.appendChild( renderer.domElement );
// array of functions for the rendering loop
var onRenderFcts= [];
// init scene and camera
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);

//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

 /* Function Returning : Random between min and max */
var randInt = function(min,max) {
  return (~~((Math.random()*max)+min));
}

var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

camera.position.z = 0;

var lightA = new THREE.PointLight(0x50ffdf, 4);
scene.add(lightA);
var lightB = new THREE.AmbientLight( 0xfff040 );
scene.add(lightB);

scene.fog = new THREE.FogExp2( 0x5f45f0, 0.038 );

var phongMaterial = new THREE.MeshPhongMaterial({
 	color      :  new THREE.Color("rgb(6,4,195)"),
  emissive   :  new THREE.Color("rgb(0,5,5)"),
  specular   :  new THREE.Color("rgb(19,11,104)"),
  shininess  :  120,
  shading    :  THREE.FlatShading,
});

var shape = new THREE.Mesh( new THREE.IcosahedronGeometry(35,3), material);
var shapeC = new THREE.Mesh( new THREE.IcosahedronGeometry(25,3), material);

var nbCubes = shape.geometry.vertices.length;
var tbCubes = [];
var tbCircles = [];

function Cube(inx,iny,inz){
    this.b = new THREE.Mesh(new THREE.BoxGeometry( 8, 8, 1), phongMaterial);
    this.b.position.x = inx;
    this.b.position.y = iny;
    this.b.position.z = inz;
    this.b.lookAt(new THREE.Vector3(0,0,0));
}

function Circle(inx,iny,inz){
    this.b = new THREE.Mesh(new THREE.CircleGeometry( 1.2, 3), phongMaterial);
    this.b.position.x = inx;
    this.b.position.y = iny;
    this.b.position.z = inz;
    this.b.lookAt(new THREE.Vector3(0,0,0));
}

for(var i=0; i<nbCubes; i++){
   tbCubes.push(new Cube(shape.geometry.vertices[i].x,shape.geometry.vertices[i].y,shape.geometry.vertices[i].z));
   tbCircles.push(new Circle(shapeC.geometry.vertices[i].x,shapeC.geometry.vertices[i].y,shapeC.geometry.vertices[i].z));
    scene.add(tbCircles[i].b);
    scene.add(tbCubes[i].b);
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
  renderer.render( scene, camera );	
  camera.rotation.x += 1/90;
  camera.rotation.y += 1/90;
  for(var i=0; i<nbCubes; i++){
    tbCircles[i].b.rotation.z -= 1/90;
  }
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