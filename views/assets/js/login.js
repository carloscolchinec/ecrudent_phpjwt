function validateToken(token) {
    // Realizar una solicitud POST a la API para validar el token
    return fetch('../api/verify_token.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(response => {
        if (response.status === 200) {
            // Si la respuesta es 200 (OK), el token es válido
            return true;
        } else {
            // Si la respuesta es otro código de error, el token no es válido
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Si hay un error en la solicitud, consideramos que el token no es válido
        return false;
    });
}

// Verificar el token al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    // Función para redirigir al dashboard si el token es válido
    function redirectToDashboard() {
        window.location.href = 'product.html'; // Cambiar 'product.html' por la URL del dashboard
    }

    // Si hay un token almacenado, validar el token
    if (token) {
        validateToken(token)
            .then(isValid => {
                if (isValid) {
                    redirectToDashboard();
                }
            });
    }
});

// Función para mostrar notificación de error en el inicio de sesión
function showLoginError(message) {
    // Mostrar notificación de error con Notify.js
    $.notify(message, { className: 'error' });
}

// Función para realizar el inicio de sesión
function login(email, password) {
    // Realizar una solicitud POST a la API para obtener el token
    fetch('../api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.status === 200) {
            // Si la respuesta es 200 (OK), almacenar el token y redirigir al dashboard
            return response.json().then(data => {
                localStorage.setItem('token', data.token);
                window.location.href = 'product.html'; // Redirigir al dashboard
            });
        } else if (response.status === 401) {
            // Si la respuesta es 401 (Unauthorized), mostrar notificación de error
            showLoginError('Credenciales inválidas');
        } else if (response.status === 400) {
            // Si la respuesta es 400 (Bad Request), mostrar notificación de error
            showLoginError('Faltan credenciales');
        } else {
            // Si la respuesta es otro código de error, mostrar notificación de error genérico
            showLoginError('Error al iniciar sesión');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar notificación de error con Notify.js
        showLoginError('Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.');
    });
}

// Obtener el formulario de login
const loginForm = document.getElementById('login-form');

// Agregar evento de submit al formulario
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    // Validar campos antes de enviar la solicitud
    if (!email || !password) {
        showLoginError('Por favor, completa todos los campos.');
    } else {
        login(email, password);
    }
});
