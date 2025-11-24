function renderCatalog(filterSexo='', filterTipo=''){
  const grid = document.getElementById('grid');
  if(!grid) return;
  grid.innerHTML='';
  const list = perfumes.filter(p=> (filterSexo? p.sexo===filterSexo : true) && (filterTipo? p.tipo===filterTipo : true));
  list.forEach(p=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<img src="${p.imagen}" alt="${p.nombre}"><div class="body"><div class="meta">${p.tipo} · ${p.sexo}</div><h3>${p.nombre}</h3><div class="price">$${p.precio.toLocaleString()}</div><p style="margin-top:8px"><a href="producto.html?id=${p.id}">Ver producto</a> <button data-id="${p.id}" class="addBtn" style="margin-left:8px">Agregar</button></p></div>`;
    grid.appendChild(card);
  });
  document.querySelectorAll('.addBtn').forEach(b=> b.addEventListener('click', e=>{
    const id=parseInt(e.target.dataset.id);
    addToCart(id,1);
    alert('Producto agregado al carrito');
  }));
}
document.addEventListener('DOMContentLoaded', ()=>{
  const fSexo=document.getElementById('fSexo');
  const fTipo=document.getElementById('fTipo');
  const limpiar=document.getElementById('limpiar');
  if(fSexo) fSexo.onchange=()=>renderCatalog(fSexo.value,fTipo.value);
  if(fTipo) fTipo.onchange=()=>renderCatalog(fSexo.value,fTipo.value);
  if(limpiar) limpiar.onclick=()=>{fSexo.value='';fTipo.value='';renderCatalog();};
  renderCatalog();
  renderCartTable();
});
function getCart(){return JSON.parse(localStorage.getItem('sultan_cart')||'[]');}
function saveCart(c){localStorage.setItem('sultan_cart',JSON.stringify(c));}
function addToCart(id,qty){const c=getCart();const i=c.find(x=>x.id===id);if(i)i.qty+=qty;else c.push({id,qty});saveCart(c);}
function renderCartTable(){
  const body=document.getElementById('cartBody');
  if(!body)return;
  const c=getCart();body.innerHTML='';let total=0;
  c.forEach(it=>{
    const p=perfumes.find(x=>x.id===it.id);
    const sub=p.precio*it.qty;total+=sub;
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><input type="checkbox" checked></td><td>${p.nombre}</td><td>$${p.precio}</td><td><input type="number" min="1" value="${it.qty}" data-id="${p.id}" class="qty"></td><td>$${sub}</td>`;
    body.appendChild(tr);
  });
  document.getElementById('totalText').textContent='$'+total;
}

