import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export const generarCertificado = async (obra) => {
  try {
    const doc = new jsPDF();

    // Generar código QR con el folio de la obra
    const codigoQR = await QRCode.toDataURL(obra.folio, {
      width: 300,
      margin: 2,
      errorCorrectionLevel: "H"
    });

    // Colores del certificado
    const vino = [105, 25, 45];
    const dorado = [170, 135, 75];
    const gris = [80, 80, 80];

    // Fondo blanco
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    // Marco exterior
    doc.setDrawColor(...vino);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);

    // Marco interior
    doc.setDrawColor(...dorado);
    doc.setLineWidth(0.5);
    doc.rect(14, 14, 182, 269);

    // Encabezado
    doc.setTextColor(...vino);
    doc.setFont("times", "bold");
    doc.setFontSize(25);
    doc.text("REGISTRA-IP", 105, 35, { align: "center" });

    doc.setTextColor(...dorado);
    doc.setFontSize(11);
    doc.text("PLATAFORMA DE CREADORES", 105, 43, {
      align: "center"
    });

    // Título principal
    doc.setTextColor(...vino);
    doc.setFontSize(23);
    doc.text("Certificado de", 105, 75, { align: "center" });
    doc.text("Registro de Autoría", 105, 86, { align: "center" });

    // Texto introductorio
    doc.setTextColor(...gris);
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text("Se hace constar el registro de la siguiente obra:", 105, 110, {
      align: "center"
    });

    // Nombre de la obra
    doc.setTextColor(...vino);
    doc.setFont("times", "bold");
    doc.setFontSize(19);

    const titulo = doc.splitTextToSize(obra.titulo, 150);
    doc.text(titulo, 105, 132, { align: "center" });

    // Autor
    const posicionAutor = 145 + (titulo.length - 1) * 9;

    doc.setTextColor(...gris);
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text("Autor de la obra", 105, posicionAutor, {
      align: "center"
    });

    doc.setTextColor(...vino);
    doc.setFont("times", "bold");
    doc.setFontSize(15);
    doc.text(obra.autor, 105, posicionAutor + 10, {
      align: "center"
    });

    // Fecha de registro
    const fecha = new Date(obra.fechaRegistro).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    doc.setTextColor(...gris);
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.text("Fecha de registro:", 30, 205);
    doc.text(fecha, 30, 213);

    // Folio
    doc.setTextColor(...vino);
    doc.setFont("times", "bold");
    doc.setFontSize(13);
    doc.text("Folio de registro:", 30, 232);
    doc.text(obra.folio, 30, 241);

    // Código QR
    doc.addImage(codigoQR, "PNG", 145, 195, 35, 35);

    doc.setTextColor(...gris);
    doc.setFont("times", "normal");
    doc.setFontSize(9);
    doc.text("Escanea para consultar el folio", 162.5, 235, {
      align: "center"
    });

    // Responsable del registro
    doc.setDrawColor(...dorado);
    doc.line(35, 255, 175, 255);

    doc.setTextColor(...vino);
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.text("Registrado por:", 105, 265, {
      align: "center"
    });

    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text("Isaac Emmanuel Martinez Torres", 105, 273, {
      align: "center"
    });

    // Descargar PDF
    doc.save(`certificado-${obra.folio}.pdf`);

  } catch (error) {
    console.error("Error al generar el certificado:", error);
    alert("No fue posible generar el certificado.");
  }
};