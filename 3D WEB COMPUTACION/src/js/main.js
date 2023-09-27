/*

Author@: Miguel Angel Cantor Rodriguez
Last date of creation : 21/08/2023 4:11 pm
Last Modification : 1/09/2023 6:30 pm
Hola


*/

var scene = null,
    camera = null,
    renderer = null,
    cube = null,
    torus = null,
    cone = null,
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
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
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

    //LIGHTS
    // CreateLight("PointLight");
    CreateLight("Ambient");
    //CreateLight("SpotLight");

    //Animation
    animate();
}


//FUNCTION ANIMATE (se ejecuta por cada frame, por eso los controles estan aqui)
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    if (cube != null, cone != null, torus != null) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cone.rotation.x -= 0.02;
        cone.rotation.y -= 0.02;
        torus.rotation.x -= 0.02;
        torus.rotation.y -= 0.02;
    }
    // for 
    // for 
    // for (let i = 0; i < figura.length; i++) {

    //     shapes[i].rotation.x += 0.01;
    //     shapes[i].rotation.z -= 0.01;
    // }
}



window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function createObjects(objectType) {

    switch (objectType) {

        case "Cube":

            createCube()

            break

        case "Cone":
            createCone()
            break

        case "Torus":
            createTorus()
            break



    }





}
function createCube() {
    const texture = new THREE.TextureLoader().load('../image/animales/face1.jpg'); //añadirle una imagen al cubo como su textura

    var materialCubeFaces = [new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../image/animales/face1.jpg')}),
                            new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../image/animales/face2.png')}),
                            new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../image/animales/face3.jpg')}),
                            new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../image/animales/face4.jpg')}),
                            new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../image/animales/face5.png')}),
                            new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../image/animales/face6.jpg')})];

    geometrycube = new THREE.BoxGeometry(80, 80, 80); //Dimensiones del cubo
    var materialcube = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        map: texture,
        wireframe: false,
        color: 0xFAF7F7,
        transparent: false,
        opacity: 1,
        side: THREE.DoubleSide
    });
    
    cube = new THREE.Mesh(geometrycube, materialCubeFaces); //Creador del objeto, ingresa los nombres de las variables con la info (dimensiones,material)
    scene.add(cube); //añadir lo creado
    cube.position.x += (Math.random() - 0.4) * size;
    cube.position.z += (Math.random() - 0.4) * size;
}

function createCone() {
    geometrycone = new THREE.ConeGeometry(5, 20, 32);
    materialcone = new THREE.MeshStandardMaterial({
        color: 0xF5F8FA,
        wireframe: true,
        color: 0xFAF7F7,
        transparent: false,
        opacity: 1
    });

    cone = new THREE.Mesh(geometrycone, materialcone);
    scene.add(cone);
    cone.position.x = (Math.random() - 0.4) * size;
    cone.position.z = (Math.random() - 0.4) * size;
}

function createTorus() {
    geometrytorus = new THREE.TorusGeometry(5.757, 1.2375, 22, 33, 6.283185307179586);
    materialtorus = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
        color: 0xffffff,
        transparent: false,
        opacity: 1
    });

    torus = new THREE.Mesh(geometrytorus, materialtorus);
    scene.add(torus);
    torus.position.x = (Math.random() - 0.4) * size;
    torus.position.z = (Math.random() - 0.4) * size;
    controls.update();
}

function CreateLight(typeLight) {

    switch (typeLight) {
        case "Ambient":
            const AmbientLight = new THREE.AmbientLight(0xffffff); // soft white light
            scene.add(AmbientLight);
            break;

        case "PointLight":
            // Create Point Light
            const Pointlight = new THREE.PointLight(0xffffff, 10, 100);
            Pointlight.position.set(10, 10, 10);
            scene.add(Pointlight);
            break;



        case "SpotLight":
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(100, 1000, 100);
            spotLight.map = new THREE.TextureLoader().load(url);

            spotLight.castShadow = true;

            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            scene.add(spotLight);
            break;
        default:

    }


}