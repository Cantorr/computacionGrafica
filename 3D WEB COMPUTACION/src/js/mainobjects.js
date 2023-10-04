/*

Author@: Miguel Angel Cantor Rodriguez
Last date of creation : 21/08/2023 4:11 pm
Last Modification : 24/09/2023 6:30 pm
Hola


*/



var scene = null,
    camera = null,
    renderer = null,
    controls = null;
    let temporizador = false;
    let Timer = 5; 
    tiempoRegresivo = null;


const size = 20,
    divisions = 20;

function startScene() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3E3E3E); //33FFC5
    camera = new THREE.PerspectiveCamera(
        75,                                        //Angulo de visión(Abajo o arriba) 
        window.innerWidth / window.innerHeight,    //Relación de aspecto 16:9
        0.1,                                       //Mas cerca (no renderiza)
        1000);                                    //Mas lejos ()

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('modelsLoad') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(7, 7, 13);
    controls.update();

    //Grid Helper
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // scene.add(gridHelper);

    //Axes Helper
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    //const lightAmbient = new THREE.AmbientLight(0xFFFFFF); // soft white light
    //scene.add(lightAmbient);
    if(temporizador==false){
        contadorTiempo();
        temporizador=true;
    }

    lights();
    // const light = new THREE.PointLight( 0xffffff, 1, 100 );
    // light.position.set( 5,10,10 );
    // scene.add( light );
    animate();
    // Escenario
    loadModel_objMtl("../models/Obj_mtl/scene/", "PIXELROOM.obj", "PIXELROOM.mtl");
    // Human Model
    loadModel_objMtl2("../models/Obj_mtl/personaje/", "voxelcaracter.obj", "voxelcaracter.mtl");

    loadModel_pato("../models/gltf/", 'Duck.gltf');

    createCollectibles();
    


    stateGame('');

}
//--------------------FUNCIONES--------------------
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    //console.log(camera.position); IDENTIFICAR NE LA CONSOLA DE HTML QUE POSICIÓN ESTÁ
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function loadModel_objMtl(path, nameObj, nameMtl) {
    //load MtL
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
            object.scale.set(2, 2, 2);
            object.position.set(0, 0, 0);
        });
    });


}


function loadModel_objMtl2(path, nameObj, nameMtl) {
    //load MtL
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
            object.scale.set(2, 2, 2);
            object.position.set(0, 2, 0);
        });
    });





    /*
    
    // variable pa cargar archivos GTFL
     var loader = new THREE.GTFL.Loader();
     // ni idea de que es pero  estaban en las diapositivas 
     const dracoLoader = new THREE.DRACOLoader(); 
     dracoLoader.setDecoderPath('../src/models/gltf/Duck.gltf');
     loader.setDRACOLoader( dracoLoader );  
     
    //Cargar el gltf
    loader.load(
    
    'archivogtlf'
    
    
    function name(gflt) {
        
        scene.add(gflt.scene); 
        gflt.animations; // // Array<THREE.AnimationClip>
        gflt.scene; // THREEE.Scene 
        gflt.scenes; // // Array<THREE.Scene>
        gflt.cameras; // Array<THREE.Camera>
        gflt.assest; // Object
    
    
    // llamar mientras el loader esta procesando
     function (xhr){
    
    
        console.log (xhr.loaded / xhr.total * 100 ) + '%loader';
     }
    
    function (error) {
         // llamar cuando hay un error
     console.log ('an error happend');
        
    }
         
    }
    
    )
    */

}

function lights() {
    //Create Point Light
    /*
    const Pointlight = new THREE.PointLight(0xffffff, 0.5, 100);
    Pointlight.position.set(0, 10, 0);
    scene.add(Pointlight);

    const Pointlight2 = new THREE.PointLight(0xffffff, 1 , 100);
    Pointlight2.position.set(0, 0,0 );
    scene.add(Pointlight2);
    */
    const AmbientLight = new THREE.AmbientLight(0xffffff, 1, 10); // soft white light
    AmbientLight.position.set(10, 10, 10);
    scene.add(AmbientLight);

}


function loadModel_pato(path, nameObj) {

    var nameGltf = path + nameObj;
    // Instantiate a loader
    const loader = new THREE.GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath(path);
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
        // resource URL
        nameGltf,
        // called when the resource is loaded
        function (gltf) {

            scene.add(gltf.scene);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            gltf.scene.position.set(0,0,5);

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}




function createCollectibles() {

    const texture = new THREE.TextureLoader().load('../image/objetosexternos/giftTexture.jpg');

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture
    });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(0, 5, 0);
    scene.add(cube);
}


function stateGame(status) {
    switch (status) {
        case win:
            document.getElementById("winPage").style.display = "block";
         break;
        case "lose":
         document.getElementById("losePage").style.display = "block";
         break;
    
         default:
            document.getElementById("winPage").style.display = "none";
            document.getElementById("losePage").style.display = "none";
         break;
    
      }
}


function contadorTiempo() {
    tiempoRegresivo = setInterval(() => {
        Timer--;
        mostrarTiempo = document.getElementById('tiempoContador');
        mostrarTiempo.innerHTML =`Time : ${Timer}`;
        if(Timer == 0){
            clearInterval (tiempoRegresivo);
            var status="lose";
            return status;
        }
    }, 1000);
}
