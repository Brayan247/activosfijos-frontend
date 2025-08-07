import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDashboardData } from "../dashboard/dashboardService";
import api from "../../services/axios";

interface OrdenActivoDto {
  ordenId: number;
  numeroOrden: string;
  tipoOrden: string;
  fechaEmision: string; // ISO date string (ej. "2025-07-30T00:00:00")
  responsable: string;
  proveedor?: string | null;
  observaciones?: string | null;
  estadoOrden: number;
  documentacionAdjunta?: string | null;
  motivoRechazo?: string | null;
  activosJson: string; // Este campo puede ser un string (JSON string) o directamente un tipo si se deserializa

  fechaCreacion: string; // ISO date string
  fechaActualizacion?: string | null;

  empresaId: number;
  usuarioId: number;
}

interface EstadoOrdenDto {
  estado_orden_id: number;
  nombre: string;
  activo: boolean;
}

const OrdenesAprobadasPage = () => {
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState<OrdenActivoDto[]>([]);
  const [estados, setEstados] = useState<EstadoOrdenDto[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        const empresaId = dashboardData.empresaId; // aquí usas el dato recién obtenido

        const response = await api.get(
          `/orden-activos/obtener-ordenes-empresa?empresaId=${empresaId}`
        );

        const catalogo = await api.get(`/catalogos/estado-orden`);
        const catalogos = catalogo.data;
        setEstados(catalogos);

        const ordenesFiltradas = response.data.datos.filter((o: any) =>
          [3].includes(Number(o.estadoOrden))
        );

        setOrdenes(ordenesFiltradas);
      } catch {
        throw new Error("No se pudo cargar la información del dashboard.");
      }
    };

    fetchData();
  }, [navigate, token]);

  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Órdenes de Activos
        </Typography>
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="lista ordenes activos">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              {[
                "Número de Orden",
                "Tipo",
                "Fecha",
                "Responsable",
                "Estado",
                "Acciones",
              ].map((headCell) => (
                <TableCell
                  key={headCell}
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    fontSize: 16,
                    textTransform: "uppercase",
                  }}
                >
                  {headCell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  No hay órdenes registradas
                </TableCell>
              </TableRow>
            )}
            {ordenes.map((orden) => (
              <TableRow
                key={orden.ordenId}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell>{orden.numeroOrden}</TableCell>
                <TableCell>{orden.tipoOrden}</TableCell>
                <TableCell>{orden.fechaEmision}</TableCell>
                <TableCell>{orden.responsable}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: "success.light",
                      fontWeight: "medium",
                      fontSize: 14,
                      textAlign: "center",
                      minWidth: 90,
                    }}
                  >
                    {estados.find(
                      (estado) =>
                        estado.estado_orden_id === Number(orden.estadoOrden)
                    )?.nombre || "Desconocido"}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Ver detalle">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/ordenes/${orden.ordenId}`, {
                          state: { modo: "ver", orden },
                        });
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdenesAprobadasPage;
