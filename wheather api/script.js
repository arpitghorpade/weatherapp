const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

async function getData(cityName) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=50025fb9a67f4359913190313242212&q=${cityName}&aqi=yes`
    );
    return await promise.json() 
}

button.addEventListener("click", async() => {
   const value = input.value;
   const result = await getData(value);
   cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
   cityTime.innerText = result.location.localtime;
   cityTemp.innerText = result.current.temp_c;
   
    
});

// Create 3D Earth
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("earth").appendChild(renderer.domElement);

// Add a sphere (Earth)
const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load("https://tse1.mm.bing.net/th?id=OIP.L9tn0sqPuJGGEePUrCJHtAHaEO&pid=Api&P=0&h=180");
const material = new THREE.MeshBasicMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Position the camera
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001; // Rotate the Earth
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

