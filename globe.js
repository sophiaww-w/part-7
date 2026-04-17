const globe = Globe()(document.getElementById('globe'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
  .backgroundColor('#070a12');

// PINS
globe
  .pointsData(orgData)
  .pointLat(d => d.lat)
  .pointLng(d => d.lng)
  .pointColor(() => 'rgba(255,80,80,0.9)')
  .pointAltitude(0.02);

// CLICK → SPECIFIC PAGE
globe.onPointClick(d => {
  window.location.href = `org.html?id=${d.id}`;
});

// TOOLTIP
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

globe.onPointHover(d => {
  if (!d) {
    tooltip.style.display = 'none';
    return;
  }

  tooltip.innerHTML = `
    <b>${d.name}</b><br>
    ${d.city}, ${d.country}<br>
    $${d.raised} / $${d.goal}
  `;

  tooltip.style.display = 'block';
});

document.addEventListener('mousemove', e => {
  tooltip.style.left = e.clientX + 10 + 'px';
  tooltip.style.top = e.clientY + 10 + 'px';
});

// PULSE
let t = 0;
function animate() {
  t += 0.03;
  globe.pointRadius(() => 0.6 + Math.sin(t) * 0.15);
  requestAnimationFrame(animate);
}
animate();
