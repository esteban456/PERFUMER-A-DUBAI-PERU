function qs(n){return new URLSearchParams(location.search).get(n);}
document.addEventListener('DOMContentLoaded',()=>{
  const id=parseInt(qs('id'));
  const p=perfumes.find(x=>x.id===id);
  const c=document.getElementById('product');
  if(!p){c.innerHTML='<p>Producto no encontrado.</p>';return;}
  c.innerHTML=`<div class="img-wrap"><img src="${p.imagen}" alt="${p.nombre}"></div><div class="info"><h2>${p.nombre}</h2><div class="meta">${p.sexo} · ${p.tipo}</div><p class="price">$${p.precio}</p><p>${p.descripcion}</p><button onclick="addToCart(${p.id},1)" class="btn">Agregar al carrito</button></div>`;
});


