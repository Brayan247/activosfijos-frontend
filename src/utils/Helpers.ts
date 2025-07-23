const formatFecha = (fecha: string) => {
  const partes = fecha.split("/");
  if (partes.length === 3) {
    const [dd, mm, yyyy] = partes;
    return `${yyyy}-${mm}-${dd}`;
  }
  return fecha; // ya está en formato válido
};

export default formatFecha;
