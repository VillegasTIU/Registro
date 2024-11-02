document.getElementById('registroFormulario').addEventListener('submit', function (event) {
    event.preventDefault();

    
    const division = document.getElementById('division').value;
    const fecha = document.getElementById('fecha').value;
    const contacto = document.getElementById('contacto').value;
    const puesto = document.getElementById('puesto').value;
    const organizacion = document.getElementById('organizacion').value;
    const estudiante = document.getElementById('estudiante').value;
    const genero = document.getElementById('genero').value;
    const matricula = document.getElementById('matricula').value;
    const adscrito = document.getElementById('adscrito').value;
    const cuatrimestre = document.getElementById('cuatrimestre').value;
    const programa = document.getElementById('programa').value;
    const estancia = document.getElementById('estancia').value;
    const periodo = document.getElementById('periodo').value;

    
    const asesorNombre = document.getElementById('asesor_nombre').value;
    const asesorCorreo = document.getElementById('asesor_correo').value;
    const asesorTelefono = document.getElementById('asesor_telefono').value;

    const logoEstadoMexico = "img/up.png";  
    const logoUPVM = ""; 

    
    const horasEstancias = {
        "Ing. en Alimentos e Ing. Agroindustrial": { "Estancia I": 120, "Estancia II": 120 },
        "Ing. en Biotecnología": { "Estancia I": 120, "Estancia II": 135 },
        "Ing. en Tecnologías de la Información": { "Estancia I": 120, "Estancia II": 105 },
        "Ing. en Logística": { "Estancia I": 135, "Estancia II": 135 },
        "Ing. Mecánica Automotriz": { "Estancia I": 90, "Estancia II": 90 },
        "Ing. Mecatrónica": { "Estancia I": 120, "Estancia II": 120 },
        "Ing. en Nanotecnología": { "Estancia I": 120, "Estancia II": 120 },
        "Ing. en Tecnologías de la Información e Innovación Digital": { "Estancia I": 120, "Estancia II": 120 },
        "Ing. Industrial": { "Estancia I": 165, "Estancia II": 165 },
        "Lic. en Administración": { "Estancia I": 120, "Estancia II": 120 }
    };
    const horas = horasEstancias[programa] ? horasEstancias[programa][estancia] : "N/A";

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    
    pdf.addImage(logoEstadoMexico, 'PNG', 10, 10, 40, 40); 
    pdf.addImage(logoUPVM, 'PNG', 160, 10, 40, 40); 

    pdf.setFontSize(10);
    pdf.text("SECRETARÍA DE EDUCACIÓN, CIENCIA, TECNOLOGÍA E INNOVACIÓN", 105, 20, { align: "center" });
    pdf.text("“2024, Año del Bicentenario de la Erección del Estado Libre y Soberano de México”", 105, 26, { align: "center" });

    pdf.setFontSize(12);
    pdf.text(`Tultitlán, Estado de México, a ${fecha}`, 160, 55);

    pdf.setFont("Helvetica", "bold");
    pdf.text("Asunto: Carta de Presentación", 10, 70);

    pdf.setFont("Helvetica", "normal");
    pdf.text(`LIC. ${contacto.toUpperCase()}`, 10, 85);
    pdf.text(`${puesto.toUpperCase()}`, 10, 90);
    pdf.text(`${organizacion.toUpperCase()}`, 10, 95);
    pdf.text("PRESENTE", 10, 100);

    
    const generoTexto = genero === "femenino" ? "a la estudiante" : "al estudiante";
    const contenido = `
    Por medio del presente, me permito presentar ${generoTexto} ${estudiante}, con matrícula ${matricula}, 
    adscrito${adscrito} al ${cuatrimestre} de la carrera de ${programa}, para que desarrolle su ${estancia} 
    en la organización a su digno cargo. La estancia o estadía tiene como propósito el de incorporar al estudiante al ámbito laboral, 
    a través de la realización de proyectos de cooperación con las organizaciones, que permiten preparar futuros profesionales 
    con experiencia profesional, y conscientes de los problemas y necesidades del sector productivo. 
    Dicha estancia cubrirá un tiempo de ${horas} horas en el periodo escolar de ${periodo}.
    `;
    pdf.text(contenido, 10, 110, { maxWidth: 180, align: "justify" });

    
    const competencias = `
    COMPETENCIAS PROFESIONALES:
    - Administrar la infraestructura tecnológica mediante el mantenimiento y soporte técnico, técnicas de diseño y
    administración de redes para optimizar el desempeño, garantizando la operación física y lógica de los equipos
    de cómputo y redes de área local con el fin de contribuir al logro de los objetivos de la organización.
    - Realizar mantenimientos y soporte técnico a equipos de cómputo y sistemas con base en un plan y en respuesta 
    a las contingencias, empleando procedimientos y técnicas para garantizar la disponibilidad y optimizar los 
    recursos de la organización.
    `;
    pdf.text(competencias, 10, 150, { maxWidth: 180, align: "justify" });

   
    const asesorTexto = `
    Así mismo le presento al ${asesorNombre} (Correo: ${asesorCorreo}, Tel. ${asesorTelefono}) como 
    asesor académico (UPVM) que, junto con el asesor de la organización, darán asesoría y seguimiento a la estancia del 
    estudiante, en las que se realizan las siguientes actividades: Definición del proyecto; emisión de la carta de aceptación del 
    estudiante; validación de los informes quincenales del estudiante; evaluación de la estancia y emisión de la carta de terminación.
    Agradezco de antemano las atenciones y oportunidades prestadas a nuestro estudiante, y sin otro particular por el momento,
    aprovecho la ocacion para enviarle un cordial saludo y quedo de usted para cualquier comentario, aclaracion o informacion
    al respecto.
    `;
    pdf.text(asesorTexto, 10, 180, { maxWidth: 180, align: "justify" });

    
    pdf.text("Atentamente,", 10, 210);
    pdf.text("MTRO. GUSTAVO ZEA NÁPOLES", 10, 220);
    pdf.text("DIRECTOR DE LA DIVISIÓN DE INGENIERÍA EN INFORMÁTICA", 10, 225);
    pdf.text("Universidad Politécnica del Valle de México", 10, 230);

    pdf.save(`Carta_${estudiante}.pdf`);
});
