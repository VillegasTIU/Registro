<?php

$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "SEST";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}


function validar_contrasenna($contrasenna) {
    return preg_match('/^(?=.*[A-Z])(?=.*\d).{8,}$/', $contrasenna);
}


function redireccionar($url) {
    echo "<script>setTimeout(function() { window.location.href='$url'; }, 3000);</script>";
    exit(); 
}


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['registro'])) {
    $matricula = $conn->real_escape_string($_POST['matricula']);
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $contrasenna = $conn->real_escape_string($_POST['contrasenna']);
    $confirmar_contrasenna = $conn->real_escape_string($_POST['confirmarContrasenna']);
    $tipo = isset($_POST['tipo']) ? (int)$_POST['tipo'] : 0; 
    $estatus = isset($_POST['estatus']) ? (int)$_POST['estatus'] : 0; 

    
    if ($contrasenna !== $confirmar_contrasenna) {
        echo "<script>alert('Las contraseñas no coinciden.');</script>";
    } elseif (!validar_contrasenna($contrasenna)) {
        echo "<script>alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');</script>";
    } else {
        
        $sql = "INSERT INTO USUARIOS (MATRICULA, NOMBRE, CONTRASENNA, TIPO, ESTATUS) 
                VALUES ('$matricula', '$nombre', '$contrasenna', '$tipo', '$estatus')";

        if ($conn->query($sql) === TRUE) {
            echo "<script>
                alert('Registro exitoso. Redirigiendo a inicio de sesión...');
                setTimeout(function() {
                    window.location.href = 'registro.html';
                }, 3000);
            </script>";
        } else {
            echo "<script>alert('Error: " . $conn->error . "');</script>";
        }
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['recuperar'])) {
    $matricula = $conn->real_escape_string($_POST['matricula']);
    $nueva_contrasenna = $conn->real_escape_string($_POST['nueva_contrasenna']);
    $confirmar_contrasenna = $conn->real_escape_string($_POST['confirmar_contrasenna']);

    
    if ($nueva_contrasenna !== $confirmar_contrasenna) {
        echo "<script>alert('La nueva contraseña y su confirmación no coinciden.');</script>";
    } elseif (!validar_contrasenna($nueva_contrasenna)) {
        echo "<script>alert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');</script>";
    } else {
        
        $sql = "SELECT * FROM USUARIOS WHERE MATRICULA = '$matricula'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            
            $sql_update = "UPDATE USUARIOS SET CONTRASENNA = '$nueva_contrasenna' WHERE MATRICULA = '$matricula'";
            if ($conn->query($sql_update) === TRUE) {
                echo "<script>
                    alert('Contraseña actualizada correctamente. Redirigiendo a inicio de sesión...');
                    setTimeout(function() {
                        window.location.href = 'registro.html';
                    }, 3000);
                </script>";
            } else {
                echo "<script>alert('Error al actualizar la contraseña: " . $conn->error . "');</script>";
            }
        } else {
            echo "<script>alert('Matrícula incorrecta.');</script>";
        }
    }
}


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['matricula']) && isset($_POST['contrasenna']) && !isset($_POST['registro']) && !isset($_POST['recuperar'])) {
    $matricula = $conn->real_escape_string($_POST['matricula']);
    $contrasenna = $conn->real_escape_string($_POST['contrasenna']);

    
    $sql = "SELECT * FROM USUARIOS WHERE MATRICULA = '$matricula' AND CONTRASENNA = '$contrasenna'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        $tipo_usuario = $usuario['TIPO']; 

        
        if ($tipo_usuario == 1) {
            echo "<script>alert('Bienvenido, Administrador. Redirigiendo...');</script>";
            redireccionar('administrador.html');
        } else {
            echo "<script>alert('Bienvenido, Usuario. Redirigiendo...');</script>";
            redireccionar('usuarios.html');
        }
    } else {
        echo "<script>
            alert('Matrícula o contraseña incorrecta.');
            window.location.href = 'registro.html';
        </script>";
    }
}


$conn->close();
?>
