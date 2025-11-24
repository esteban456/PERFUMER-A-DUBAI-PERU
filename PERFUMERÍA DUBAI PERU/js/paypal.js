const PAYPAL_CLIENT_ID='sb';
function loadPayPal(total,containerId){
  const s=document.createElement('script');
  s.src=`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
  document.body.appendChild(s);
  s.onload=()=>renderButton(total,containerId);
}
function renderButton(total,containerId){
  paypal.Buttons({
    createOrder:(d,a)=>a.order.create({purchase_units:[{amount:{value:(total/1000).toFixed(2)}}]}),
    onApprove:(d,a)=>a.order.capture().then(det=>{alert('Pago completado');localStorage.removeItem('sultan_cart');location.href='index.html';})
  }).render('#'+containerId);
}
