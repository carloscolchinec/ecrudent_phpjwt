// Función para validar el TOKEN
function validateToken(token) {
    return fetch('../api/verify_token.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(response => {
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });
}

// Función para obtener todos los productos y llenar la tabla
function getAllProducts() {
    fetch('../api/product.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(products => {
        const tableBody = document.querySelector('.product-table tbody');
        tableBody.innerHTML = '';

        if (products.length === 0) {
            const noProductsRow = `
                <tr>
                    <td colspan="5" class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">No hay productos que mostrar</td>
                </tr>
            `;
            tableBody.innerHTML = noProductsRow;
        } else {
            products.forEach(product => {
                const row = `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.product_name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${product.price}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.stock}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900" onclick="getProductAndOpenEditModal(${product.id})">Edit</a>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button class="text-red-600 hover:text-red-900" onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function openCreateModal() {
    const createModal = document.getElementById('create-modal');
    createModal.style.display = 'flex';
}

// Función para cerrar el modal de creación de producto
function closeCreateModal() {
    const createModal = document.getElementById('create-modal');
    createModal.style.display = 'none';
}

function createProduct() {
    const productName = document.querySelector('input[name="product_name"]').value;
    const price = parseFloat(document.querySelector('input[name="price"]').value);
    const description = document.querySelector('textarea[name="description"]').value;
    const stock = parseInt(document.querySelector('input[name="stock"]').value);
    const expiryDate = document.querySelector('input[name="expiry_date"]').value;

    const productData = {
        product_name: productName,
        price: price,
        description: description,
        stock: stock,
        expiry_date: expiryDate
    };

    fetch('../api/product.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        $.notify(data.message, "success");
        closeCreateModal();
        getAllProducts();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const addProductBtn = document.getElementById('add-product-btn');
addProductBtn.addEventListener('click', openCreateModal);

const cancelBtn = document.querySelector('#create-modal button[type="button"]');
cancelBtn.addEventListener('click', closeCreateModal);

function getProductAndOpenEditModal(productId) {

    fetch(`../api/product.php?id=${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(product => {
        openEditModal(product);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function openEditModal(product) {
    console.log(product)
    // Obtener el formulario de edición y los campos del producto
    const editForm = document.getElementById('edit-form');
    const productNameInput = editForm.querySelector('input[name="product_name"]');
    const priceInput = editForm.querySelector('input[name="price"]');
    const descriptionTextarea = editForm.querySelector('textarea[name="description"]');
    const stockInput = editForm.querySelector('input[name="stock"]');
    const expiryDateInput = editForm.querySelector('input[name="expiry_date"]');
    
    // Cargar la información del producto en los campos del formulario
    productNameInput.value = product.product_name;
    priceInput.value = product.price;
    descriptionTextarea.value = product.description;
    stockInput.value = product.stock;
    expiryDateInput.value = product.expiry_date;
    
    editForm.dataset.productId = product.id;

    // Mostrar el modal de edición
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'flex';
}

// Controla el evento SUBMIT del formulario Editar
const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', function (event) {
    event.preventDefault();
    updateProduct(); 
});

function updateProduct() {
    // Obtener el ID del producto a actualizar
    const productId = document.getElementById('edit-form').dataset.productId;

    // Obtener los datos del formulario de edición
    const productData = {
        id: productId,
        product_name: document.querySelector('input[name="product_name"]').value,
        price: parseFloat(document.querySelector('input[name="price"]').value),
        description: document.querySelector('textarea[name="description"]').value,
        stock: parseInt(document.querySelector('input[name="stock"]').value),
        expiry_date: document.querySelector('input[name="expiry_date"]').value
    };

    // Realizar una solicitud PUT a la API para actualizar el producto
    fetch(`../api/product.php?id=${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar una notificación de éxito
        $.notify(data.message, "success");

        // Cerrar el modal de edición
        closeEditModal();

        // Actualizar la tabla con los nuevos datos del producto
        getAllProducts();
    })
    .catch(error => {
        console.error('Error:', error);

        // Mostrar una notificación de error
        $.notify("Error al actualizar el producto", "error");
    });
}

// Función para Eliminar el producto
function deleteProduct(productId) {
    const confirmed = confirm('¿Estás seguro de eliminar el producto?');

    if (confirmed) {
        fetch('../api/product.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: productId }) 
        })
        .then(response => response.json())
        .then(data => {
            $.notify(data.message, "success");
            getAllProducts();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Función para cerrar el modal de edición
function closeEditModal() {
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';
}

// Buscador
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    const tableRows = document.querySelectorAll('.product-table tbody tr');
    let foundMatch = false;

    tableRows.forEach(row => {
        const productName = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
        if (productName.includes(searchTerm)) {
            row.style.display = 'table-row';
            foundMatch = true; 
        } else {
            row.style.display = 'none';
        }
    });

    const noMatchMessage = document.getElementById('no-match-message');
    if (foundMatch) {
        noMatchMessage.style.display = 'none';
    } else {
        noMatchMessage.style.display = 'block';
    }
}

// Evento de escucha para el campo de búsqueda
document.getElementById('search-input').addEventListener('input', filterProducts);

// Verificar el token al cargar la página
const token = localStorage.getItem('token');
if (token) {
    validateToken(token)
    .then(isValid => {
        if (!isValid) {
            window.location.href = 'login.html';
        } else {
            getAllProducts();
        }
    });
} else {
    window.location.href = 'login.html';
}

// Obtener el botón de logout
const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});
