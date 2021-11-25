/////////////////////////////////////////////////////////////////////////TP ThreeJS - Création de Scene////////////////////////////////////////////////////////////////////////////// 

// Déclaration des variables globales
var _rendu; 
var _camera;
var _scene; 
var _orbite;

// Variable pour aller chercher texture de la Lune
var _texturePlanet = "https://images.unsplash.com/photo-1462331321792-cc44368b8894?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=953&q=80"
var _motionURL = "https://images.unsplash.com/photo-1451186859696-371d9477be93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
var _worldURL = "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80"



    
    // Notre scène 
    _scene = new THREE.Scene(); 
    // Silence ça tourne 
    _camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

    
    //Rendu WebGL    
    _rendu = new THREE.WebGLRenderer();
    //Déplacement de la caméra 
    _orbite = new THREE.OrbitControls(_camera, _rendu.domElement);
    // Ajuste la taille du canvas WebGL ( = taille de la fenêtre)
    _rendu.setSize(window.innerWidth, window.innerHeight);
    // Ajoute le canvas dans la page html
    document.body.appendChild(_rendu.domElement);

    //Notre sphère qui sera la Lune/Planète
    var _moonSphere = new THREE.SphereGeometry(1,50,100);

    // Va nous permettre d'appliquer des textures 
    var _textureLoader = new THREE.TextureLoader();
    //Appliquer la texture de la lune
    var _texture = _textureLoader.load( _texturePlanet );
    //Donne du relief à la lune 
    var _motionMap = _textureLoader.load( _motionURL );
    //Applique l'image du background
    var _worldTexture = _textureLoader.load( _worldURL );

    // Création d'un matérial pour modeler notre Sphere
    var _material = new THREE.MeshPhongMaterial(
    {
        color: 0xffffff, //Couleur du material
        map: _texture, // Application de la texture de la Lune
        displacementMap: _motionMap, // Effet de relief
        displacementScale: 0.06,
        bumpMap: _motionMap,
        bumpScale: 0.04, // Je sais pas vraiment ce que c'est mais si ça dépasse 0.70 c'est vraiment horrible
        reflectivity:0, //Reflet 
        shininess:1, //Brillance 
    } 
);

//On combine notre sphère et notre matérial juste au dessus pour creér notre Lune 
var _moon = new THREE.Mesh( _moonSphere, _material);


//Création du "Soleil", une light puissante qui émet que d'une seule direction
const _Soleil = new THREE.DirectionalLight(0xFFFFFF, 1); 
//La position de la light 
_Soleil.position.set(-100, 10,50);
//On ajoute la light à la scene
_scene.add(_Soleil);

//Création du background de la scene 
var _backGround = new THREE._moonSphere(10,60,60);
// Ajout d'un matérial à la scène 
var _backGroundMat = new THREE.MeshBasicMaterial (

)



















/* A débugger, l'affichage se fait plus, cherche pk
//Ainsi que la Lune
_scene.add( _moon );
On set la postion de la caméra
_camera.position.z = 5;

_rendu.render( _scene, _camera);
*/
