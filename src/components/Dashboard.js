import * as React from "react";
import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./listItems";
import { Button, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PeopleIcon from "@mui/icons-material/People";

const url = false
  ? "http://localhost:8080/api"
  : "http://sistdist-back.eastus.cloudapp.azure.com:8080/sistdist/api";

async function getEquipos() {
  try {
    const response = await fetch(url + "/equipos/", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      
    });
    if (response.ok) {
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        //console.log(data); // Verificar los datos devueltos en la consola
        return data;
      } else {
        console.error("La respuesta está vacía");
        return []; // O algún valor por defecto si la respuesta está vacía
      }
    } else {
      console.error(
        "Error al obtener los datos. Código de estado:",
        response.status
      );
      console.error("Respuesta:", response.text());
      return []; // O algún valor por defecto si la respuesta no es exitosa
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return []; // O algún valor por defecto en caso de error
  }
}

async function getEnfrentamientos() {
  try {
    const response = await fetch(url + "/enfrentamientos/", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      
    });
    if (response.ok) {
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        //console.log(data); // Verificar los datos devueltos en la consola
        return data;
      } else {
        console.error("La respuesta está vacía");
        return []; // O algún valor por defecto si la respuesta está vacía
      }
    } else {
      console.error(
        "Error al obtener los datos. Código de estado:",
        response.status
      );
      console.error("Respuesta:", response.text());
      return []; // O algún valor por defecto si la respuesta no es exitosa
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return []; // O algún valor por defecto en caso de error
  }
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SistDist
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [equipos, setEquipos] = useState([]);
  const [enfrentamientos, setEnfrentamientos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataType, setDataType] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataEquipos = await getEquipos();
        const dataEnfrentamientos = await getEnfrentamientos();

        if (dataEquipos && dataEquipos.length > 0) {
          setEquipos(dataEquipos);
        } else {
          console.error("La API no devolvió datos de equipos válidos");
        }
        if (dataEnfrentamientos && dataEnfrentamientos.length > 0) {
          setEnfrentamientos(dataEnfrentamientos);
        } else {
          console.error("La API no devolvió datos de enfrentamientos válidos");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []); // El segundo parámetro vacío indica que se ejecutará solo al montar el componente

  // Función para crear equipo
  async function crearEquipo(nuevosDatos) {
    // Lógica para crear un equipo (hacer una petición POST, por ejemplo)
    try {
      const response = await fetch(`${url}/equipos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        
        body: JSON.stringify(nuevosDatos), // Aquí se envían los nuevos datos en formato JSON
      });

      if (response.ok) {
        // Obtener los datos actualizados del equipo del servidor (opcional)
        const updatedData = await response.json();

        // Actualizar el estado para reflejar los cambios en el frontend
        const updatedEquipos = equipos.map((equipo) => {
          if (equipo.Id === updatedData.Id) {
            return updatedData; // Actualiza los datos del equipo modificado
          }
          return equipo;
        });
        setEquipos(updatedEquipos);
      } else {
        console.error(
          "Error al actualizar el equipo. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al actualizar el equipo:", error);
    }
  }

  // Función para eliminar equipo
  async function eliminarEquipo(idEquipo) {
    try {
      const response = await fetch(`${url}/equipos/${idEquipo}`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        
      });

      if (response.ok) {
        // Eliminación exitosa
        // Actualizar el estado para reflejar el cambio
        const updatedEquipos = equipos.filter(
          (equipo) => equipo.Id !== idEquipo
        );
        setEquipos(updatedEquipos);
      } else {
        console.error(
          "Error al eliminar el equipo. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al eliminar el equipo:", error);
    }
  }

  // Función para modificar equipo
  async function modificarEquipo(idEquipo, nuevosDatos) {
    // Lógica para modificar un equipo (hacer una petición PUT, por ejemplo)
    try {
      const response = await fetch(`${url}/equipos/${idEquipo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        
        body: JSON.stringify(nuevosDatos), // Aquí se envían los nuevos datos en formato JSON
      });

      if (response.ok) {
        // Obtener los datos actualizados del equipo del servidor (opcional)
        const updatedData = await response.json();

        // Actualizar el estado para reflejar los cambios en el frontend
        const updatedEquipos = equipos.map((equipo) => {
          if (equipo.Id === idEquipo) {
            return updatedData; // Actualiza los datos del equipo modificado
          }
          return equipo;
        });
        setEquipos(updatedEquipos);
      } else {
        console.error(
          "Error al actualizar el equipo. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al actualizar el equipo:", error);
    }
  }

  // Función para crear enfrentamiento
  async function crearEnfrentamiento(nuevosDatos) {
    // Lógica para crear un equipo (hacer una petición POST, por ejemplo)
    try {
      const response = await fetch(`${url}/enfrentamientos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        
        body: JSON.stringify(nuevosDatos), // Aquí se envían los nuevos datos en formato JSON
      });

      if (response.ok) {
        // Obtener los datos actualizados del equipo del servidor (opcional)
        const updatedData = await response.json();

        // Actualizar el estado para reflejar los cambios en el frontend
        const updatedEnfrentamientos = enfrentamientos.map((enfrentamiento) => {
          if (enfrentamiento.Id === updatedData.Id) {
            return updatedData; // Actualiza los datos del equipo modificado
          }
          return enfrentamiento;
        });
        setEquipos(updatedEnfrentamientos);
      } else {
        console.error(
          "Error al actualizar el equipo. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al actualizar el equipo:", error);
    }
  }

  // Función para eliminar enfrentamiento
  async function eliminarEnfrentamiento(idEnfrentamiento) {
    try {
      const response = await fetch(
        `${url}/enfrentamientos/${idEnfrentamiento}`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          
        }
      );

      if (response.ok) {
        // Eliminación exitosa
        // Actualizar el estado para reflejar el cambio
        const updatedEnfrentamiento = enfrentamientos.filter(
          (enfrentamiento) => enfrentamiento.Id !== idEnfrentamiento
        );
        setEnfrentamientos(updatedEnfrentamiento);
      } else {
        console.error(
          "Error al eliminar el enfrentamiento. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al eliminar el enfrentamiento:", error);
    }
  }

  // Función para modificar enfrentamiento
  async function modificarEnfrentamiento(idEnfrentamiento, nuevosDatos) {
    // Lógica para modificar un enfrentamiento (hacer una petición PUT, por ejemplo)
    try {
      const response = await fetch(
        `${url}/enfrentamientos/${idEnfrentamiento}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          
          body: JSON.stringify(nuevosDatos), // Aquí se envían los nuevos datos en formato JSON
        }
      );

      if (response.ok) {
        // Obtener los datos actualizados del equipo del servidor (opcional)
        const updatedData = await response.json();

        // Actualizar el estado para reflejar los cambios en el frontend
        const updatedEnfrentamientos = enfrentamientos.map((enfrentamiento) => {
          if (enfrentamiento.Id === idEnfrentamiento) {
            return updatedData; // Actualiza los datos del equipo modificado
          }
          return enfrentamiento;
        });
        setEquipos(updatedEnfrentamientos);
      } else {
        console.error(
          "Error al actualizar el enfrentamiento. Código de estado:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al actualizar el enfrentamiento:", error);
    }
  }

  const openEditModal = (data, type) => {
    setOpenModal(true);
    setSelectedData(data);
    setDataType(type);
  };

  const closeEditModal = () => {
    setOpenModal(false);
    setSelectedData(null);
    setDataType(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedData = {};

    for (let [key, value] of formData.entries()) {
      updatedData[key] = value;
    }

    if (dataType === "equipo") {
      await handleEdit(selectedData.Id, updatedData, "equipo");
    } else if (dataType === "enfrentamiento") {
      await handleEdit(selectedData.Id, updatedData, "enfrentamiento");
    }

    closeEditModal();
  };

  const handleEdit = async (id, updatedData, type) => {
    if (type === "equipo") {
      if (id === undefined) {
        await crearEquipo(updatedData);
      } else {
        // Aquí puedes manejar la actualización de un equipo
        await modificarEquipo(id, updatedData);
      }
    } else if (type === "enfrentamiento") {
      if (id === undefined) {
        await crearEnfrentamiento(updatedData);
      } else {
        // Aquí puedes manejar la actualización de un enfrentamiento
        await modificarEnfrentamiento(id, updatedData);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={5}>
                <Typography variant="h4" gutterBottom>
                  <PeopleIcon />
                  Equipos
                </Typography>
                <Button onClick={() => openEditModal({}, "equipo")}>
                  <Add />
                  Crear equipo
                </Button>
                {equipos?.map((equipo, index) => (
                  <div key={equipo.Id}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p>Nombre: {equipo.Nombre}</p>
                        <p>Entrenador: {equipo.Entrenador}</p>
                        <p>Estadio: {equipo.Estadio}</p>
                        <p>
                          Fundación: {new Date(equipo.Fundacion).toDateString()}
                        </p>
                        <p>País: {equipo.Pais}</p>
                        <p>Puntos: {equipo.Puntos}</p>
                        <p>Presupuesto: {equipo.Presupuesto}</p>
                      </div>
                      <div>
                        <Button onClick={() => eliminarEquipo(equipo.Id)}>
                          Eliminar
                        </Button>
                        <Button onClick={() => openEditModal(equipo, "equipo")}>
                          Modificar
                        </Button>
                      </div>
                    </Paper>
                  </div>
                ))}
              </Grid>
              <Grid item xs={12} md={4} lg={5}>
                <Typography variant="h4" gutterBottom>
                  <SportsSoccerIcon />
                  Enfrentamientos
                </Typography>
                <Button onClick={() => openEditModal({}, "enfrentamiento")}>
                  <Add />
                  Crear enfrentamiento
                </Button>
                {enfrentamientos?.map((enfrentamiento, index) => (
                  <div key={enfrentamiento.Id}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p>Resultado: {enfrentamiento.Resultado}</p>
                        <p>
                          Equipo Visitante:{" "}
                          {equipos.find(
                            (equipo) =>
                              equipo.Id === enfrentamiento.Equipo_Visitante
                          )?.Nombre || "Equipo no encontrado"}
                        </p>
                        <p>
                          Fecha: {new Date(enfrentamiento.Fecha).toDateString()}
                        </p>
                        <p>
                          Equipo Local:{" "}
                          {equipos.find(
                            (equipo) =>
                              equipo.Id === enfrentamiento.Equipo_Local
                          )?.Nombre || "Equipo no encontrado"}
                        </p>
                      </div>
                      <div>
                        <Button
                          onClick={() =>
                            eliminarEnfrentamiento(enfrentamiento.Id)
                          }
                        >
                          Eliminar
                        </Button>
                        <Button
                          onClick={() =>
                            openEditModal(enfrentamiento, "enfrentamiento")
                          }
                        >
                          Modificar
                        </Button>
                      </div>
                    </Paper>
                  </div>
                ))}
                <Modal open={openModal} onClose={closeEditModal}>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "8px",
                    }}
                  >
                    {selectedData && dataType && (
                      <form onSubmit={handleSubmit}>
                        <h2>Editar {dataType}</h2>

                        {/* Campos para editar un equipo */}
                        {dataType === "equipo" && (
                          <div>
                            <div>
                              <label htmlFor="nombre">Nombre: </label>
                              <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                defaultValue={selectedData.Nombre} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="entrenador">Entrenador: </label>
                              <input
                                type="text"
                                id="entrenador"
                                name="entrenador"
                                defaultValue={selectedData.Entrenador} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="estadio">Estadio: </label>
                              <input
                                type="text"
                                id="estadio"
                                name="estadio"
                                defaultValue={selectedData.Estadio} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="fundacion">Fundación: </label>
                              <input
                                type="text"
                                id="fundacion"
                                name="fundacion"
                                //defaultValue={new Date(selectedData.Fundacion).toDateString()} // Valor inicial del campo de entrada
                                defaultValue={selectedData.Fundacion} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="pais">País: </label>
                              <input
                                type="text"
                                id="pais"
                                name="pais"
                                defaultValue={selectedData.Pais} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="puntos">Puntos: </label>
                              <input
                                type="text"
                                id="puntos"
                                name="puntos"
                                defaultValue={selectedData.Puntos} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="presupuesto">Presupuesto: </label>
                              <input
                                type="text"
                                id="presupuesto"
                                name="presupuesto"
                                defaultValue={selectedData.Presupuesto} // Valor inicial del campo de entrada
                              />
                            </div>
                          </div>
                        )}

                        {/* Campos para editar un enfrentamiento */}
                        {dataType === "enfrentamiento" && (
                          <div>
                            <div>
                              <label htmlFor="resultado">Resultado: </label>
                              <input
                                type="text"
                                id="resultado"
                                name="resultado"
                                defaultValue={selectedData.Resultado} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="equipo_visitante">
                                Equipo Visitante:
                              </label>
                              <input
                                type="text"
                                id="equipo_visitante"
                                name="equipoVisitante"
                                defaultValue={selectedData.Equipo_Visitante} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="fecha">Fecha: </label>
                              <input
                                type="text"
                                id="fecha"
                                name="fecha"
                                defaultValue={selectedData.Fecha} // Valor inicial del campo de entrada
                              />
                            </div>

                            <div>
                              <label htmlFor="equipo_local">
                                Equipo Local:
                              </label>
                              <input
                                type="text"
                                id="equipo_local"
                                name="equipoLocal"
                                defaultValue={selectedData.Equipo_Local} // Valor inicial del campo de entrada
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Button type="submit">Guardar cambios</Button>
                          <Button onClick={closeEditModal}>Cancelar</Button>
                        </div>
                      </form>
                    )}
                  </div>
                </Modal>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
