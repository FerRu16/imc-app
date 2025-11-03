document.getElementById("imcForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (peso > 0 && altura > 0) {
    const imc = peso / (altura * altura);
    let interpretacion = "";

    if (imc < 18.5) interpretacion = "Bajo peso 🟡";
    else if (imc < 25) interpretacion = "Peso ideal 🟢";
    else if (imc < 30) interpretacion = "Sobrepeso 🟠";
    else interpretacion = "Obesidad 🔴";

    document.getElementById("resultado").textContent =
      `Tu IMC es ${imc.toFixed(1)} → ${interpretacion}`;
  } else {
    document.getElementById("resultado").textContent =
      "Por favor, ingresa valores válidos.";
  }
});


