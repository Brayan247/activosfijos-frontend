export function validateRucEcuador(ruc: string): boolean {
  if (!/^\d{13}$/.test(ruc)) return false;

  const provincia = parseInt(ruc.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;

  const tercerDigito = parseInt(ruc[2], 10);

  // Persona natural
  if (tercerDigito >= 0 && tercerDigito <= 5) {
    const cedula = ruc.slice(0, 10);
    if (!validateCedula(cedula)) return false;
    return ruc.slice(10) === "001";
  }

  // Entidad pública
  if (tercerDigito === 6) {
    if (!validateModulo11(ruc.slice(0, 8), parseInt(ruc[8]))) return false;
    return ruc.slice(9) === "001";
  }

  // Sociedad
  if (tercerDigito === 9) {
    if (!validateModulo11(ruc.slice(0, 9), parseInt(ruc[9]))) return false;
    return ruc.slice(10) === "001";
  }

  return false;
}

export function esCedulaValidaEcuador(cedula: string): boolean {
  // Debe tener exactamente 10 dígitos
  if (!/^\d{10}$/.test(cedula)) return false;

  const provincia = parseInt(cedula.substring(0, 2), 10);
  const tercerDigito = parseInt(cedula[2], 10);

  // Provincia válida: 01-24
  if (provincia < 1 || provincia > 24) return false;

  // El tercer dígito debe ser menor a 6 (para personas naturales)
  if (tercerDigito >= 6) return false;

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = parseInt(cedula[i], 10) * coeficientes[i];
    if (valor >= 10) valor -= 9;
    suma += valor;
  }

  const digitoVerificador = parseInt(cedula[9], 10);
  const decenaSuperior = Math.ceil(suma / 10) * 10;
  const calculado = decenaSuperior - suma;

  return calculado === 10 ? digitoVerificador === 0 : calculado === digitoVerificador;
}


// Validación de cédula (persona natural) – módulo 10
function validateCedula(cedula: string): boolean {
  if (!/^\d{10}$/.test(cedula)) return false;
  const provincia = parseInt(cedula.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;

  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;

  for (let i = 0; i < coef.length; i++) {
    let val = coef[i] * parseInt(cedula[i]);
    if (val >= 10) val -= 9;
    suma += val;
  }

  const digitoVerificador = (10 - (suma % 10)) % 10;
  return digitoVerificador === parseInt(cedula[9]);
}

// Validación módulo 11 (para sociedad y entidades públicas)
function validateModulo11(base: string, digito: number): boolean {
  const coeficientes =
    base.length === 8 ? [3, 2, 7, 6, 5, 4, 3, 2] : [4, 3, 2, 7, 6, 5, 4, 3, 2];

  const suma = base
    .split("")
    .reduce((acc, val, i) => acc + parseInt(val) * coeficientes[i], 0);

  const residuo = suma % 11;
  const verificador = residuo === 0 ? 0 : 11 - residuo;

  return verificador === digito;
}

export const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidURL = (url: string) =>
  /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/.test(url);
export const isValidHexColor = (color: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(color);

const formatFecha = (fecha: string) => {
  const partes = fecha.split("/");
  if (partes.length === 3) {
    const [dd, mm, yyyy] = partes;
    return `${yyyy}-${mm}-${dd}`;
  }
  return fecha; // ya está en formato válido
};

export default formatFecha;
