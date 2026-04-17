const globe = Globe()(document.getElementById('globe'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
  .backgroundColor('#070a12');

// POINTS
globe
  .pointsData(orgData)
  .pointLat(d => d.lat)
  .pointLng(d => d.lng)
  .pointColor(() => 'rgba(255,80,80,0.9)')
  .pointAltitude(0.02);

// CLICK → org page
globe.onPointClick(point => {
  window.location.href = `org.html?id=${point.id}`;
});

// HOVER TOOLTIP (SINGLE CLEAN SYSTEM)
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.background = 'white';
tooltip.style.color = 'black';
tooltip.style.padding = '8px 10px';
tooltip.style.borderRadius = '8px';
tooltip.style.fontSize = '12px';
tooltip.style.display = 'none';
tooltip.style.pointerEvents = 'none';
document.body.appendChild(tooltip);

globe.onPointHover(point => {
  if (!point) {
    tooltip.style.display = 'none';
    return;
  }

  tooltip.innerHTML = `
    <b>${point.name}</b><br>
    ${point.city}, ${point.country}<br>
    $${point.raised} / $${point.goal}
  `;

  tooltip.style.display = 'block';
});

document.addEventListener('mousemove', e => {
  tooltip.style.left = e.clientX + 12 + 'px';
  tooltip.style.top = e.clientY + 12 + 'px';
});

// PULSING EFFECT (SAFE VERSION)
let t = 0;

function animate() {
  t += 0.03;

  globe.pointRadius(() => 0.6 + Math.sin(t) * 0.15);

  requestAnimationFrame(animate);
}

animate();
