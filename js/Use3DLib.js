/*
 * @Author: Admin
 * @Date:   2019-10-01 04:38:32
 * @Last Modified by:   Admin
 * @Last Modified time: 2019-10-01 04:52:22
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(80, 800 / 800, 0.1, 100);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
var animate = function() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};
animate();