// js/auth.js
// Lógica de registro / login usando localStorage + sessionStorage

const ADMIN_USER = "ADMIN";
const ADMIN_PASS = "V3nT@8rQ#pL9xZ2s!"; // Cambia esto si quieres otro password

// Helpers
function getUsers(){
  const raw = localStorage.getItem("sultan_users");
  return raw ? JSON.parse(raw) : [];
}
function saveUsers(users){
  localStorage.setItem("sultan_users", JSON.stringify(users));
}

// Registro
function registerUser(name, email, password){
  const users = getUsers();
  if (!name || !email || !password) return { ok:false, msg:"Completa todos los campos." };

  // evitar emails duplicados
  if(users.some(u => u.email.toLowerCase() === email.toLowerCase())){
    return { ok:false, msg:"Ya existe una cuenta con ese correo." };
  }

  users.push({
    name: name,
    email: email.toLowerCase(),
    password: btoa(password) // ligera "ofuscación" (base64). No es seguro para producción.
  });
  saveUsers(users);
  return { ok:true, msg:"Cuenta creada correctamente" };
}

// Login
function login(emailOrUser, password){
  if(!emailOrUser || !password) return { ok:false, msg:"Completa todos los campos." };

  // ADMIN (se permite que ingrese usando "ADMIN" como usuario o el mismo texto en email)
  if((emailOrUser === ADMIN_USER || emailOrUser.toLowerCase() === ADMIN_USER.toLowerCase()) && password === ADMIN_PASS){
    sessionStorage.setItem("sultan_current", JSON.stringify({ name: "ADMIN", email: ADMIN_USER, isAdmin: true }));
    return { ok:true, admin:true, msg:"Login admin correcto" };
  }

  // Buscar en localStorage por email
  const users = getUsers();
  const user = users.find(u => u.email === emailOrUser.toLowerCase());
  if(!user) return { ok:false, msg:"Usuario no encontrado." };

  if(user.password !== btoa(password)) return { ok:false, msg:"Contraseña incorrecta." };

  sessionStorage.setItem("sultan_current", JSON.stringify({ name: user.name, email: user.email, isAdmin: false }));
  return { ok:true, admin:false, msg:"Login correcto" };
}

// Logout
function logout(){
  sessionStorage.removeItem("sultan_current");
  window.location.href = "login.html";
}

// Util para obtener usuario actual en cualquier página
function currentUser(){
  const raw = sessionStorage.getItem("sultan_current");
  return raw ? JSON.parse(raw) : null;
}

// Protección de páginas: si se espera admin llamar protectAdmin(), si se espera usuario protectUser()
function protectAdmin(){
  const u = currentUser();
  if(!u || !u.isAdmin){
    window.location.href = "login.html";
  }
}
function protectUser(){
  const u = currentUser();
  if(!u){
    window.location.href = "login.html";
  }
}

