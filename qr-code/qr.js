// Link to my deployed portfolio
const portfolioURL = "https://rcliloc.github.io/Riona_Portfolio/";

// Access the QR container using the DOM
const qrContainer = document.getElementById("qrcode");

// Generate the QR code
new QRCode(qrContainer, {
    text: portfolioURL,
    width: 250,
    height: 250,
    correctLevel: QRCode.CorrectLevel.H
});