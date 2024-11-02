function openModal() {
    document.getElementById("modalRegistro").style.display = "block";
}

function closeModal() {
    document.getElementById("modalRegistro").style.display = "none";
}

function openForgotModal() {
    document.getElementById("modalForgot").style.display = "block";
}

function closeForgotModal() {
    document.getElementById("modalForgot").style.display = "none";
}

function showModalSuccess() {
    const modal = document.getElementById("modalSuccess");
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "registro.html";
    }, 1000);
}

function verificarContrasennas(id1, id2) {
    const password1 = document.getElementById(id1).value;
    const password2 = document.getElementById(id2).value;
    
    if (password1 !== password2) {
        alert("Las contraseñas no coinciden.");
        return false; 
    }
    return true;
}

function validatePassword(password, indicators) {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    indicators.length.classList.toggle("fulfilled", hasLength);
    indicators.uppercase.classList.toggle("fulfilled", hasUppercase);
    indicators.number.classList.toggle("fulfilled", hasNumber);

    return hasLength && hasUppercase && hasNumber;
}

document.getElementById("contrasenna").addEventListener("input", function() {
    validatePassword(this.value, {
        length: document.getElementById("length"),
        uppercase: document.getElementById("uppercase"),
        number: document.getElementById("number")
    });
});

document.getElementById("contrasenna-new").addEventListener("input", function() {
    validatePassword(this.value, {
        length: document.getElementById("lengthNew"),
        uppercase: document.getElementById("uppercaseNew"),
        number: document.getElementById("numberNew")
    });
});

function validarMatricula(input) {
    const errorMatricula = document.getElementById("error-matricula");
    const soloNumeros = /^\d*$/;

    if (!soloNumeros.test(input.value)) {
        errorMatricula.style.display = "block";
        input.value = input.value.replace(/\D/g, ''); 
    } else {
        errorMatricula.style.display = "none";
    }
}
