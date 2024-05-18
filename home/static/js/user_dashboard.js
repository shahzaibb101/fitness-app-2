// console.log("ok");

var muscleModelContainer = document.getElementById('muscle-model-container');
var containerWidth = muscleModelContainer.clientWidth;
var containerHeight = muscleModelContainer.clientHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, containerWidth / containerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x003559);
renderer.setSize(containerWidth, containerHeight);
muscleModelContainer.appendChild(renderer.domElement);

var loader = new THREE.FBXLoader();
var controls;

// console.log("User ID:", user_id);

loader.load(
    '/fetch-fbx-file/?user_id=' + user_id,
    function (object) {
        console.log(object)
        var box = new THREE.Box3().setFromObject(object);
        var center = box.getCenter(new THREE.Vector3());
        
        object.position.x = -center.x;
        object.position.y = -center.y;

        camera.position.z = box.getSize().length() * 2; 
        
        camera.lookAt(scene.position);

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.visible = true;
            }
        });

        scene.add(object);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.enableZoom = true;

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading the FBX model:', error);
    }
);

var light = new THREE.AmbientLight(0x121212);
scene.add(light);

window.onload = function() {

}

function activateTab(tabId) {
    var tabs = document.querySelectorAll('.nav-link');

    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    var selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
}    