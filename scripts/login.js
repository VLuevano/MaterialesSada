import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

document.querySelector("#login-form").addEventListener("submit", loginUser);

// Función para iniciar sesión
async function loginUser(event) {
  event.preventDefault(); // Hace que el formulario funcione correctamente

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const alertMessage = document.getElementById("alert-message");

  // Reiniciar mensaje de alerta
  alertMessage.textContent = "";
  alertMessage.classList.remove("error", "success");

  try {
    // Intentar iniciar sesión
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alertMessage.textContent = "Inicio de sesión exitoso. Redireccionando...";
    alertMessage.classList.add("success");

    // Redirigir a la vista administrador
    setTimeout(() => {
      window.location.href = "/screens/admin.html";
    }, 2000);
  } catch (error) {
    console.log(error.code);
    const errorMessage = getErrorMessage(error.code);
    alertMessage.textContent = errorMessage;
    alertMessage.classList.add("error");
  }
}

// Función para los mensajes de error
function getErrorMessage(errorCode) {
  const errorMessages = {
    "auth/invalid-login-credentials": "Correo o contraseña incorrectos.",
    "auth/too-many-requests": "Demasiados intentos fallidos. Inténtalo más tarde.",
    "auth/network-request-failed": "Error de red. Revisa tu conexión a Internet.",
  };
  return errorMessages[errorCode] || "Ocurrió un error inesperado. Por favor, intenta de nuevo.";
}

//Recuperar contraseña
const forgotPasswordLink = document.getElementById('forgot-password-link');

forgotPasswordLink.addEventListener('click', async (e) => {
  e.preventDefault();

  // Mostrar prompt para ingresar el correo
  const email = prompt('Ingresa tu correo electrónico para recuperar la contraseña:');
  
  if (!email) {
    alert('No ingresaste ningún correo.');
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert('Se ha enviado un correo para restablecer tu contraseña.');
  } catch (error) {
    alert(`Error al enviar el correo: ${error.message}`);
  }
});