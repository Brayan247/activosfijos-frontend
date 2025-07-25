export interface UsuarioFormData {
  empresaId: number | string | null;
  dni: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  genero: number;
  nacionalidad: string;
  email: string;
  telefono: string;
  direccion: string;
  paisId: number | string;
  provinciaEstadoId: number | string;
  provinciaEstado: string;
  cantonId: number | string;
  canton: string;
  ciudadParroquiaId: number | string;
  ciudadParroquia: string;
  username: string;
  password: string;
  confirmPassword: string;
  rolId: number | null;
  disableCiudadParroquia: boolean;
  disableProvincia: boolean;
  disableCanton: boolean;
}

export const initialUsuarioFormData: UsuarioFormData = {
  empresaId: "",
  dni: "",
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  genero: 1,
  nacionalidad: "",
  email: "",
  telefono: "",
  direccion: "",
  paisId: 55,
  provinciaEstadoId: "",
  provinciaEstado: "",
  cantonId: "",
  canton: "",
  ciudadParroquiaId: "",
  ciudadParroquia: "",
  username: "",
  password: "",
  confirmPassword: "",
  rolId: 2,
  disableProvincia: true,
  disableCiudadParroquia: true,
  disableCanton: true,
};

const mapFormDataToPayload = (formData: UsuarioFormData) => {
  return {
    empresaId: formData.empresaId,
    dni: formData.dni,
    nombre: formData.nombre,
    apellido: formData.apellido,
    fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
    genero: formData.genero,
    nacionalidad: formData.nacionalidad,
    email: formData.email,
    telefono: formData.telefono,
    direccion: formData.direccion,
    paisId: formData.paisId,
    provinciaEstado: formData.provinciaEstado,
    canton: formData.canton,
    ciudadParroquia: formData.ciudadParroquia,
    rolId: formData.rolId,
    username: formData.username,
    password: formData.password,
  };
};

export default mapFormDataToPayload;
