function getUsers(){return JSON.parse(localStorage.getItem('sultan_users')||'[]');}
function saveUsers(u){localStorage.setItem('sultan_users',JSON.stringify(u));}
function registerUser(n,e,p){const u=getUsers();if(u.find(x=>x.email===e))return{ok:false,msg:'Correo ya registrado'};u.push({n,e,p});saveUsers(u);return{ok:true};}
function login(e,p){const u=getUsers();const r=u.find(x=>x.e===e&&x.p===p);return r?{ok:true}:{ok:false,msg:'Credenciales inválidas'};}
