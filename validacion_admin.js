function mostrarGestionUsuarios() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('gestionar-usuarios').style.display = 'block';
    document.getElementById('agregar-usuario').style.display = 'none';
    fetchUsuarios();
}

function mostrarAgregarUsuario() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('gestionar-usuarios').style.display = 'none';
    document.getElementById('agregar-usuario').style.display = 'block';
}

function fetchUsuarios(query = '') {
    fetch('gestionar_usuarios.php?action=list&query=' + encodeURIComponent(query))
        .then(response => response.text())
        .then(data => {
            document.getElementById('usuarios-container').innerHTML = data;
            document.getElementById('editar-usuario-form').style.display = 'none';
        });
}

function buscarUsuario() {
    const query = document.getElementById('search-input').value;
    fetchUsuarios(query);
    document.getElementById('search-input').value = '';
}

function editarUsuario(id, matricula, nombre, tipo, estatus) {
    document.getElementById('id').value = id;
    document.getElementById('matricula').value = matricula;
    document.getElementById('nombre').value = nombre;
    document.getElementById('tipo').value = tipo;
    document.getElementById('estatus').value = estatus;
    document.getElementById('editar-usuario-form').style.display = 'block';
}

document.getElementById('form-editar-usuario').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    formData.append('action', 'update');
    fetch('gestionar_usuarios.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUsuarios();
        document.getElementById('editar-usuario-form').style.display = 'none';
    });
});

document.getElementById('form-agregar-usuario').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    formData.append('action', 'add');
    fetch('gestionar_usuarios.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUsuarios();
        mostrarGestionUsuarios();
    });
});
