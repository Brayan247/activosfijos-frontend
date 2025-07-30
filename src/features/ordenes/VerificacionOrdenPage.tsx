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

const ListaOrdenesActivos = () => {
  const navigate = useNavigate();

  const ordenesPrueba = [
    {
      id: 1,
      numeroOrden: "ORD-001",
      tipo: "Compra",
      fecha: "2025-07-15",
      responsable: "Juan Pérez",
      estado: "Creada",
    },
    {
      id: 2,
      numeroOrden: "ORD-002",
      tipo: "Mantenimiento",
      fecha: "2025-07-20",
      responsable: "Ana Martínez",
      estado: "En verificacion",
    },
  ];

  const ordenes = ordenesPrueba.filter((o) =>
    ["En verificacion"].includes(o.estado)
  );

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
                key={orden.id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <TableCell>{orden.numeroOrden}</TableCell>
                <TableCell>{orden.tipo}</TableCell>
                <TableCell>{orden.fecha}</TableCell>
                <TableCell>{orden.responsable}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor:"warning.light",
                      fontWeight: "medium",
                      fontSize: 14,
                      textAlign: "center",
                      minWidth: 90,
                    }}
                  >
                    {orden.estado}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Ver detalle">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/ordenes/${orden.id}`);

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

export default ListaOrdenesActivos;
