/////////////////////////////////////////////////////////////////////////TP ThreeJS - Création de Scene////////////////////////////////////////////////////////////////////////////// 

// Déclaration des variables globales
var _rendu; 
var _camera;
var _scene; 
var _orbite;
var _resources = '/assets/models/'
var _materielAcharger = [
    ''
];

// Variable pour aller chercher texture de la Lune et du background
var _texturePlanet = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg"
var _motionURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg"
var _worldURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg"



    
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
    var _moonSphere = new THREE.SphereGeometry(7,50,4000);

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
        color: 0x9C2E35, //Couleur du material / Mars
        map: _texture, // Application de la texture de Mars
       displacementMap: _motionMap, // Effet de relief
        displacementScale: 0.06, // Ajuste la présence de cratère 
        bumpMap: _motionMap,
        bumpScale: 0.09, // Je sais pas vraiment ce que c'est mais si ça dépasse 0.70 c'est vraiment horrible
        reflectivity:1 //Reflet 
        //shininess:0.01, //Brillance 
    } 
);

//On combine notre sphère et notre matérial juste au dessus pour creér notre Lune 
var _moon = new THREE.Mesh( _moonSphere, _material);


//Création du "Soleil", une light puissante qui émet que dans une seule direction
const _Soleil = new THREE.DirectionalLight(0xFFFFFF, 2); 
//La position de la light 
_Soleil.position.set(-100, 100,50);
//On ajoute la light à la scene
_scene.add(_Soleil);
/*

AJOUTER LIGHT POUR EFFET DARK SIDE OF THE MOON 

*/

//Création du background de la scene 
var _backGround = new THREE.SphereGeometry(1000,60,60);
// Ajout d'un matérial à la scène 
var _backGroundMat = new THREE.MeshBasicMaterial (
    {   
    side:THREE.BackSide,  
    map: _worldTexture,
    }   

);


//
var _world = new THREE.Mesh ( _backGround, _backGroundMat );
_scene.add( _world );

_scene.add( _moon );
_camera.position.z = 20; 

_moon.rotation.x = 3.14*0.2;
_moon.rotation.y = 3.14*1.54;

function animate(){
    requestAnimationFrame(animate);
    //
    _moon.rotation.x = 0.02;
    _moon.rotation.y = 0.02;

    //Animation du background
    _world.rotation.x = 0.02;
    _world.rotation.y = 0.05;


    _rendu.render( _scene, _camera);
}
animate()

function onResize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _rendu.setSize(window.innerWidth, window.innerHeight);
  }
  
  window.addEventListener('resize', onResize, false);
  















/*
// Création de la variable pour charger le model .MTL
const mtlLoader1 = new THREE.MTLLoader();
const mtlLoader2 = new THREE.MTLLoader();
const mtlLoader3 = new THREE.MTLLoader();
const mtlLoader3 = new THREE.MTLLoader();
// Chargement du model .MTL depuis la variable modelName et déclaration de la fonction objectMaterial
mtlLoader1.load('./assets/models/' + modelName + '.mtl', function (objectMaterial) {
    // Prechargement de l'objet
    objectMaterial.preload();
    // Project de l'ombre de facon dynamique
    objectMaterial.castShadow = true;
    // Reception de l'ombre
    objectMaterial.receiveShadow = true;
    // Chargement de l'objet 3D
    const objLoader1 = new THREE.OBJLoader();
    objLoader1.setMaterials(objectMaterial);
    objLoader1.load('./assets/models/' + modelName + '.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        object.name = modelName;
        _scene.add(object); 
        }); 
    });
*/
