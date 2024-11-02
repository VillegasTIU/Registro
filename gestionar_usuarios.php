<?php
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "SEST";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$action = isset($_POST['action']) ? $_POST['action'] : (isset($_GET['action']) ? $_GET['action'] : '');
$query = isset($_GET['query']) ? $conn->real_escape_string($_GET['query']) : '';

if ($action == 'list') {
    $sql = "SELECT ID, MATRICULA, NOMBRE, TIPO, ESTATUS FROM USUARIOS";
    
    
    if ($query !== '') {
        $sql .= " WHERE MATRICULA LIKE '%$query%' OR NOMBRE LIKE '%$query%'";
    }
    
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<table>";
        echo "<thead><tr><th>MATRICULA</th><th>NOMBRE</th><th>TIPO</th><th>ESTATUS</th><th>Acciones</th></tr></thead>";
        echo "<tbody>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["MATRICULA"] . "</td>";
            echo "<td>" . $row["NOMBRE"] . "</td>";
            echo "<td>" . $row["TIPO"] . "</td>";
            echo "<td>" . $row["ESTATUS"] . "</td>";
            echo "<td><button onclick=\"editarUsuario(" . $row['ID'] . ",'" . $row['MATRICULA'] . "','" . $row['NOMBRE'] . "','" . $row['TIPO'] . "','" . $row['ESTATUS'] . "')\">Editar</button></td>";
            echo "</tr>";
        }
        echo "</tbody></table>";
    } else {
        echo "No se encontraron usuarios.";
    }
} elseif ($action == 'add') {
    $matricula = $_POST['matricula'];
    $nombre = $_POST['nombre'];
    $contrasenna = $_POST['contrasenna'];
    $tipo = $_POST['tipo'];
    $estatus = $_POST['estatus'];

    $sql = "INSERT INTO USUARIOS (MATRICULA, NOMBRE, CONTRASENNA, TIPO, ESTATUS) VALUES ('$matricula', '$nombre', '$contrasenna', '$tipo', '$estatus')";

    if ($conn->query($sql) === TRUE) {
        echo "Usuario agregado correctamente.";
    } else {
        echo "Error al agregar usuario: " . $conn->error;
    }
} elseif ($action == 'update') {
    $id = $_POST['id'];
    $matricula = $_POST['matricula'];
    $nombre = $_POST['nombre'];
    $tipo = $_POST['tipo'];
    $estatus = $_POST['estatus'];

    $sql = "UPDATE USUARIOS SET MATRICULA='$matricula', NOMBRE='$nombre', TIPO='$tipo', ESTATUS='$estatus' WHERE ID='$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Usuario actualizado correctamente.";
    } else {
        echo "Error al actualizar usuario: " . $conn->error;
    }
}

$conn->close();
?>
