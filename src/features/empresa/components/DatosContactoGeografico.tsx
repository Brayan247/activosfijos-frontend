import TextInput from "../../../components/Input/TextInput";
import SelectInput from "../../../components/Input/SelectInput";
import { EmpresaFormData } from "../../../types/EmpresaFormData";

interface Opcion {
  id: string | number;
  nombre?: string;
  provincia?: string;
  canton?: string;
  parroquia?: string;
}

interface Errors {
  telefono?: string;
  email?: string;
  sitioWeb?: string;
  [key: string]: string | undefined; // para cualquier otro campo
}

interface Props {
  formData: EmpresaFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: any) => void;
  paises: Opcion[];
  provinciaEstados: Opcion[];
  cantones: Opcion[];
  ciudadParroquias: Opcion[];
  errors: Errors
}

const DatosContactoGeografico = ({
  formData,
  handleChange,
  handleSelectChange,
  paises,
  provinciaEstados,
  cantones,
  ciudadParroquias,
  errors
}: Props) => {
  return (
    <>
      <TextInput
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
      />
      <SelectInput
        name="paisId"
        label="País"
        value={formData.paisId}
        onChange={handleSelectChange}
        options={paises.map((p) => ({
          value: p.id,
          label: p.nombre || "",
        }))}
        disabled={true}
      />
      <SelectInput
        name="provinciaEstadoId"
        label="Provincia o Estado"
        value={formData.provinciaEstadoId}
        onChange={handleSelectChange}
        options={provinciaEstados.map((p) => ({
          value: p.id,
          label: p.provincia || "",
        }))}
      />
      <SelectInput
        name="cantonId"
        label="Cantón"
        value={formData.cantonId}
        onChange={handleSelectChange}
        options={cantones.map((c) => ({
          value: c.id,
          label: c.canton || "",
        }))}
        disabled={formData.disableCanton}
      />
      <SelectInput
        name="ciudadParroquiaId"
        label="Ciudad o Parroquia"
        value={formData.ciudadParroquiaId}
        onChange={handleSelectChange}
        options={ciudadParroquias.map((c) => ({
          value: c.id,
          label: c.parroquia || "",
        }))}
        disabled={formData.disableCiudadParroquia}
      />
      <TextInput
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        error={!!errors.telefono}
        helperText={errors.telefono}
      />
      <TextInput
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextInput
        name="sitioWeb"
        placeholder="Sitio Web"
        value={formData.sitioWeb}
        onChange={handleChange}
        error={!!errors.sitioWeb}
        helperText={errors.sitioWeb}
      />
    </>
  );
};

export default DatosContactoGeografico;
