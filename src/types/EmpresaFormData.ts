import { theme } from "../style/theme";

export interface EmpresaFormData {
  ruc: string;
  razonSocial: string;
  estadoContribuyenteRuc: string;
  actividadEconomicaPrincipal: string;
  tipoContribuyente: string;
  regimen: string;
  categoria: string;
  fechaInicioActividades: string;
  nombreComercial: string;
  paisId: string | number;
  provinciaEstadoId: string | number;
  provinciaEstado: string;
  cantonId: string | number;
  canton: string;
  ciudadParroquiaId: string | number;
  ciudadParroquia: string;
  direccion: string;
  telefono: string;
  email: string;
  sitioWeb: string;
  color_primario: string;
  color_secundario: string;
  logo_url: string;
  fuente_personalizada: string;
  disableCanton: boolean;
  disableCiudadParroquia: boolean;
  showConfigVisual: boolean;
}

export const initialFormData: EmpresaFormData = {
  ruc: "",
  razonSocial: "",
  estadoContribuyenteRuc: "",
  actividadEconomicaPrincipal: "",
  tipoContribuyente: "",
  regimen: "",
  categoria: "",
  fechaInicioActividades: "",
  nombreComercial: "",
  paisId: 55,
  provinciaEstadoId: "",
  provinciaEstado: "",
  cantonId: "",
  canton: "",
  ciudadParroquiaId: "",
  ciudadParroquia: "",
  direccion: "",
  telefono: "",
  email: "",
  sitioWeb: "",
  color_primario:  theme.colors.primary,
  color_secundario: theme.colors.secondary,
  logo_url: "",
  fuente_personalizada: "",
  disableCanton: true,
  disableCiudadParroquia: true,
  showConfigVisual: false,
};

const mapFormDataToPayload = (formData: EmpresaFormData) => {
  return {
    ruc: formData.ruc,
    razonSocial: formData.razonSocial,
    estadoContribuyente: formData.estadoContribuyenteRuc,
    actividadEconomicaPrincipal: formData.actividadEconomicaPrincipal,
    tipoContribuyente: formData.tipoContribuyente,
    regimen: formData.regimen,
    categoria: formData.categoria,
    fechaInicioActividades: new Date(formData.fechaInicioActividades).toISOString(),
    nombreComercial: formData.nombreComercial,
    paisId: formData.paisId,
    direccion: formData.direccion,
    provinciaEstado: formData.provinciaEstado,
    canton: formData.canton,
    ciudadParroquia: formData.ciudadParroquia,
    telefono: formData.telefono,
    email: formData.email,
    sitioWeb: formData.sitioWeb,
    colorPrimario: formData.color_primario,
    colorSecundario: formData.color_secundario,
    logoUrl: formData.logo_url,
    temaOscuro: false,
    fuentePersonalizada: formData.fuente_personalizada,
  };
};

export default mapFormDataToPayload;
