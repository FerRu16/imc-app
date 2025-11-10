const form = document.getElementById("imcForm");
const pesoEl = document.getElementById("peso");
const alturaEl = document.getElementById("altura");
const errPeso = document.getElementById("err-peso");
const errAltura = document.getElementById("err-altura");
const resultadoEl = document.getElementById("resultado");

function clearErrors() {
  errPeso.textContent = "";
  errAltura.textContent = "";
  pesoEl.classList.remove("input-error");
  alturaEl.classList.remove("input-error");
  resultadoEl.className = "resultado";
  resultadoEl.textContent = "";
}

function parsePeso(str) {
  if (typeof str !== "string") return NaN;
  // Permitimos punto o coma para decimales en peso
  const n = parseFloat(str.replace(",", "."));
  return n;
}

function validateAlturaCm(str) {
  // Solo dígitos (2 o 3), sin puntos ni comas
  const onlyDigits = /^[0-9]{2,3}$/;
  if (!onlyDigits.test(str)) return { ok: false, msg: "Formato inválido. Usa centímetros sin puntos ni comas. Ej: 174" };
  const cm = parseInt(str, 10);
  if (cm < 50 || cm > 250) return { ok: false, msg: "Fuera de rango. Debe estar entre 50 y 250 cm." };
  return { ok: true, cm };
}

function classifyBMI(imc) {
  if (imc < 18.5) return "Bajo peso 🟡";
  if (imc < 25) return "Peso ideal 🟢";
  if (imc < 30) return "Sobrepeso 🟠";
  return "Obesidad 🔴";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const peso = parsePeso(pesoEl.value.trim());
  const altValid = validateAlturaCm(alturaEl.value.trim());

  let hasError = false;

  if (!isFinite(peso) || peso <= 0 || peso > 300) {
    errPeso.textContent = "Peso inválido. Ingresa un número entre 1 y 300 (puede llevar decimales).";
    pesoEl.classList.add("input-error");
    hasError = true;
  }

  if (!altValid.ok) {
    errAltura.textContent = altValid.msg;
    alturaEl.classList.add("input-error");
    hasError = true;
  }

  if (hasError) {
    resultadoEl.textContent = "Corrige los campos marcados para calcular el IMC.";
    resultadoEl.classList.add("msg-error");
    return;
  }

  const alturaM = altValid.cm / 100; // conversión cm -> m
  const imc = peso / (alturaM * alturaM);
  const imc10 = Math.round(imc * 10) / 10;
  const estado = classifyBMI(imc10);

  resultadoEl.innerHTML = `Tu IMC es <strong>${imc10}</strong> → <strong>${estado}</strong>`;
  resultadoEl.classList.add("msg-ok");
});
