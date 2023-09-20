/*

Author@: Miguel Angel Cantor Rodriguez
Last date of creation : 21/08/2023 4:11 pm
Last Modification : 1/09/2023 6:30 pm
Hola


*/

var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    shapes = [];

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
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('modelsLoad') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //------------------------ORBIT CONTROLS----------------------------------  
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(20, 20, 20);
    camera.position.z = 20;
    controls.update();
    //GRID HELPER
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    
    animate();
    LoadModel("../src/models/Obj_mtl/scene/","PIXEL_ROOM.obj","PIXEL_ROOM.mtl");
    LoadModel("../src/models/Obj_mtl/personaje/","voxel_caracter.obj","voxel_caracter.mtl");

}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function LoadModel(path,nameMtl,nameObj) {
    //load MDL
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMtl, function (materials) {
        materials.preload();

        // Load OBJ
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(materials);
        objLoader.load(nameObj, function (object) {
            scene.add(object);
            object.scale.set(2,2,2);
        });
    });
}