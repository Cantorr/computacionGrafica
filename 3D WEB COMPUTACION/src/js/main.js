
var scene = null,
    camera = null,
    renderer = null,
    cube = null,
    torus = null,
    cone=null;
    controls=null;
    var shapes= [];
    const size = 100,
    divisions = 100;




function startScene() {
    //scene render
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x01070D);
    camera = new THREE.PerspectiveCamera(75, //Angulo de vision abajo (abajo arriba)
        window.innerWidth / window.innerHeight, // relacion aspecto 16:9
        0.1, // mas cerca (no renderiza)
        1000); // mas lejos (no renderiza)

    //Rendering
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('app')});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);



    //------------------------ORBIT CONTROLS----------------------------------
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set(0,0,0);
    controls.update();
        //GRID HELPER
        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );
    
        //Animation
        animate();
    
    // to delete
    //-----------------------------OBJECTS-------------------------------------------
    //cube


    //const geometry = new THREE.BoxGeometry(10, 10, 10);
    //const material = new THREE.MeshBasicMaterial({ color: 0xF5F8FA, wireframe : true });
    //cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);
    //cube.position.x=0;

    //torus
    //const geometrytorus = new THREE.TorusGeometry( 5.757, 1.2375, 22, 33, 6.283185307179586 ); 
    //const materialtorus = new THREE.MeshBasicMaterial( { color: 0xF5F8FA, wireframe : true } ); 
    //torus = new THREE.Mesh( geometrytorus, materialtorus );
    //scene.add( torus );
    //torus.position.x = -20;
    //camera.position.z = 20;


    //Cone
    //const geometrycone = new THREE.ConeGeometry( 5, 20, 32 ); 
    //const materialcone = new THREE.MeshBasicMaterial( {color: 0xF5F8FA , wireframe : true} );
    //cone = new THREE.Mesh(geometrycone, materialcone ); 
    //scene.add( cone );
    //cone.position.x =  20;
    //camera.position.z = 25;



}


//FUNCTION ANIMATE
function animate() {
    renderer.createObjects (answer)
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    
    for(let i=0; i< figura.length;i++){

        shapes[i].rotation.x +=0.01;
        shapes[i].rotation.z -=0.01;

    }
    
  

}



window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function createObjects (answer){

switch (answer)    {

case "Cube": 

AnimateCube()

break

case "Cone":
    AnimateCone()
break

case "Torus" :
    AnimateTorus()
break



}





}
function AnimateCube(){
    requestAnimationFrame(AnimateCube);
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xF5F8FA, wireframe : true });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x+=(Math.random ()-0.4)*size;
    cube.position.z+=(Math.random ()-0.4)*size;
    camera.position.z = 20;
    controls.update();
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

 


    
}

function AnimateCone(){
    requestAnimationFrame(AnimateCone);
    const geometrycone = new THREE.ConeGeometry( 5, 20, 32 ); 
    const materialcone = new THREE.MeshBasicMaterial( {color: 0xF5F8FA , wireframe : true} );
    cone = new THREE.Mesh(geometrycone, materialcone ); 
    scene.add( cone );
    cone.position.x =  (Math.random ()-0.4)*size;
    cone.position.z =  (Math.random ()-0.4)*size;
    camera.position.z = 20;
    controls.update();
    renderer.render(scene, camera);
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

}

function AnimateTorus(){
    requestAnimationFrame(AnimateTorus);
    const geometrytorus = new THREE.TorusGeometry( 5.757, 1.2375, 22, 33, 6.283185307179586 ); 
    const materialtorus = new THREE.MeshBasicMaterial( { color: 0xF5F8FA, wireframe : true} ); 
    torus = new THREE.Mesh( geometrytorus, materialtorus );
    scene.add( torus );
    torus.position.x = (Math.random ()-0.4)*size;
    torus.position.z = (Math.random ()-0.4)*size;
    camera.position.z = 20;
    controls.update();
    renderer.render(scene, camera);
    torus.rotation.x -= 0.02;
    torus.rotation.y -= 0.02;
}
