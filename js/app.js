// A vous de jouer !
// Déclaration des variables globales
var _rendu; 
var _camera;
var _scene; 
var _orbite

//Init scene

function InitScene() {
    
    // Silence ça tourne 
    _camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight,0.1,1000);
    // Notre scène 
    _scene = new THREE._Scene(); 
    //Coordonnées de la caméra 
    _camera.position.z = 5
    _camera.position.x = 5
    //Rendu WebGL
    _rendu = new THREE.WebGLRenderer();
    // Indique au WebGLRenderer que l'on souhaite activer les ombres
    _rendu.shadowMap.enabled = true;
    _rendu.shadowMap.type = THREE.PCFSoftShadowMap;
    // Ajuste la taille du canvas WebGL ( = taille de la fenêtre)
    _rendu.setSize(window.innerWidth, window.innerHeight);
    // Ajoute le canvas dans la page html
    document.body.appendChild(_rendu.domElement);
    
    // Création du contrôle de la caméra
    _orbite = new THREE.OrbitControls(_camera, _rendu.domElement);

    

    
}


