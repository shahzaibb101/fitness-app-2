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

// Function to fetch data from CSV
async function fetchDataFromCSV() {
    console.log("Fetching data from CSV...");
    const response = await fetch('/serve-csv/?user_id=' + user_id);
    const data = await response.text();
    // console.log("CSV data:", data);

    const rows = data.trim().split('\n');
    // console.log("CSV rows:", rows);

    const header = rows[0].split(','); // Split header row into individual keys
    // console.log("CSV header:", header);

    const rowData = rows[1].split(',');
    // console.log("CSV row data:", rowData);

    const jointsData = {};

    // Construct jointsData object from CSV data
    header.forEach((key, index) => {
        const position = key.split('_')[0]; // Extract joint position (e.g., Pelvis, LeftUpperLeg)
        if (!jointsData[position]) {
            jointsData[position] = {};
        }
        const coordinate = key.split('_')[2]; // Extract coordinate (x, y, z)
        const cleanedCoordinate = coordinate.replace(/\W/g, ''); // Remove non-alphanumeric characters
        const coordinateValue = parseFloat(rowData[index]);
        jointsData[position][cleanedCoordinate.toUpperCase()] = coordinateValue;
    });

    // console.log("Parsed joints data:", jointsData);
    return jointsData;
}


// Function to create Plotly trace from joints data
function createTrace(jointsData) {
    const trace = {
        x: [],
        y: [],
        z: [],
        mode: 'markers',
        type: 'scatter3d',
        marker: {
            size: 5,
            opacity: 0.8,
            color: 'rgb(23, 190, 207)'
        },
        text: []
    };

    // Populate trace with data from jointsData
    Object.keys(jointsData).forEach(key => {
        const joint = jointsData[key];
        trace.text.push(key); // Add corresponding name as text
        trace.x.push(joint.X);
        trace.y.push(joint.Y);
        trace.z.push(joint.Z);
    });

    // console.log("Created trace:", trace);
    return trace;
}

// Function to create Plotly layout
function createLayout() {
    return {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };
}

// Main function to plot data
async function plotData() {
    // console.log("Plotting data...");
    const jointsData = await fetchDataFromCSV();
    const trace = createTrace(jointsData);
    const layout = createLayout();

    // console.log("Trace:", trace);
    // console.log("Layout:", layout);

    Plotly.newPlot('scatterPlot', [trace], layout);
}

// Call main function to plot data
plotData();