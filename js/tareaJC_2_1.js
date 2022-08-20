
//variables globales de la escena para asignarles valores u caracterizticas 
var camera, scene, renderer;
var mesh, cube, sphere, torus;

init();
animate();

function init() {
    //Crear cubo para el fondo
    scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader().setPath('../assets/city/').load([
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ]);
    
    //render dice al navegador que hacer
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 1;
    camera.rotation.y = 1;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //controles para mover y rotar la camara automaticamente "false"
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    window.addEventListener('resize', onWindowResize, false);
    
    // casetera para que reproduzca audio
    const listener = new THREE.AudioListener();
    // se agrega en la camara
    camera.add(listener);
    // audio
    const sound = new THREE.Audio(listener);
    // lbusca audios y almacena el audio en memoria(buffet)(true lo reproduce en loop)
    const audioLoader = new THREE.AudioLoader();
        audioLoader.load('../assets/crowd-noise.wav', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(.5);
            sound.play();
    });

    // crear geometria, para esfera u otro (radio, poligonos, poligonos + pesada)
    var sphere_geometry = new THREE.SphereGeometry(1, 20, 80);
    // loader (subir textura)
    const loader = new THREE.TextureLoader();
    // tipo de textura
    const material = new THREE.MeshBasicMaterial({
        map: loader.load('../assets/disco-ball.jpg'),
    });

    sphere = new THREE.Mesh(sphere_geometry, material);
    scene.add(sphere);

    camera.position.z = 5;
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // have the mouse update the view
    controls.update();
}
