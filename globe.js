const globe = Globe()(document.getElementById('globe'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
  .backgroundColor('#070a12');

// add animated scale value to each point
const data = orgData.map(d => ({
  ...d,
  pulse: Math.random()
}));

globe
  .pointsData(data)
  .pointLat(d => d.lat)
  .pointLng(d => d.lng)
  .pointColor(() => 'rgba(255,80,80,0.9)')
  .pointAltitude(0.02)
  .pointRadius(d => 0.6 + d.pulse * 0.3);

// CLICK
globe.onPointClick(d => {
  window.location.href = `org.html?id=${d.id}`;
});

// TOOLTIP
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip);

globe.onPointHover(d => {
  if (!d) {
    tooltip.style.display = "none";
    return;
  }

  tooltip.innerHTML = `
    <b>${d.name}</b><br>
    ${d.city}, ${d.country}<br>
    $${d.raised} / $${d.goal}
  `;

  tooltip.style.display = "block";
});

document.addEventListener("mousemove", e => {
  tooltip.style.left = e.clientX + 10 + "px";
  tooltip.style.top = e.clientY + 10 + "px";
});


// REAL PULSE ANIMATION (THIS ONE WORKS)
function animate() {
  data.forEach(d => {
    d.pulse = (Math.sin(Date.now() * 0.003 + d.lat) + 1) / 2;
  });

  globe.pointsData(data);

  requestAnimationFrame(animate);
}

animate();
