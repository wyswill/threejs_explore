/*
 * @Author: Admin
 * @Date:   2019-10-01 04:38:32
 * @Last Modified by:   Admin
 * @Last Modified time: 2019-10-01 04:52:22
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(80, 800 / 800, 0.1, 100);
var renderer = new THREE.WebGLRenderer();
var fontLoader = new THREE.FontLoader();
renderer.setSize(800, 800);
document.getElementById('contentv').appendChild(renderer.domElement);
var font = fontLoader.load('../font/FZYanSongS-M-GB_Regular.json', function (font) {
    scene.add(font);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function () {
    console.log('An error happened');
});
var geometry = new THREE.TextGeometry('Hello World!', {
    font: font,
    size: 20,
    height: 5
});
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 10;
var keyword = {};
function animate() {
    requestAnimationFrame(animate);
    //rota(cube);
    renderer.render(scene, camera);
};
requestAnimationFrame(animate);
function rota(obj) {
    if (keyword.ARROWUP || keyword.W) {
        obj.rotation.x -= 0.01;
    } else if (keyword.ARROWDOWN || keyword.S) {
        obj.rotation.x += 0.01;
    } else if (keyword.ARROWLEFT || keyword.A) {
        obj.rotation.y -= 0.01;
    } else if (keyword.ARROWRIGHT || keyword.D) {
        obj.rotation.y += 0.01;
    }
}
function onKeywordDownEvent(event) {
    keyword[event.key.toUpperCase()] = true;
}
function onKeywordUpEvent(event) {
    keyword[event.key.toUpperCase()] = false;
}
window.addEventListener('keydown', onKeywordDownEvent);
window.addEventListener('keyup', onKeywordUpEvent);