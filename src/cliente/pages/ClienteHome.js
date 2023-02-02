import * as React from 'react';
import {style, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link as RouterLink} from "react-router-dom";
import "../hojaestilo/ClienteHome.css"
import logo from "../Images/logo-2.png";
import ConsumoMes from '../components/ConsumoMes';

const mdTheme = createTheme({
  typography:{
    fontFamily:'Hind Siliguri',
    fontSize: 16
  }
});

function DashboardContent() {

  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>

        <AppBar position="absolute" style={{background:"#03989e"}}>
          <Toolbar>
            <img
              src={logo}
              width="50"
              height="30"
              class="d-inline-block align-top"
              alt="logo"
            />
            <Typography component="div" sx={{ flexGrow: 1 }} 
              style={{
                fontFamily:'Hind Siliguri',
              }}
            >
              SIGEIN Bienvenido
            </Typography>
            <Button variant="secondary" 
              component={RouterLink} to="/Signin"  
              color="#FFFFFF"
            >
              Cerrar sesión
            </Button>
          </Toolbar>
        </AppBar>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
    <Toolbar />
    <Container sx={{ mt: 12, mb: 12 }}>
      <Grid container spacing={3}>
        {/* Consumo mensual */}
          <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height:240}}>
            <ConsumoMes/>
          </Paper>
          </Grid>
        {/* Facturas vencidas */}
          {/* <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 120,
            }}
          >
            Aquí están las facturas vencidas
          </Paper>
          </Grid> */}
        {/* Pagar online */}
          <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 120,
            }}
          >
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Paga tus facturas online
          </Typography>
          <Button variant="contained" component={RouterLink} to="/Cliente/pagar-facturas-online" 
          style={{background:"#03989e"}}>
            Pagar
          </Button>
          </Paper>
          </Grid>
          </Grid>
          </Container>
      </Box>
    </ThemeProvider>

  );
}

export default function ClienteHome() {
  return <DashboardContent />;
}