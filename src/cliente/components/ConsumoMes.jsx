import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import jwtDecode from "jwt-decode";
import { clientEnergyConsumption } from '../../services/energy';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function ConsumoMes() {
  const [row, setRow] = React.useState([]);

  let aux = localStorage.getItem("userData");
  aux = JSON.parse(aux);
  const decoded = jwtDecode(aux.access);

  const peticion = async () => {
    clientEnergyConsumption({ 'id': decoded.user_id })
      .then((response) => {
        console.log(response)
        setRow(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateBill = async () => {
    const url = "http://localhost:8000/bills/user_bill/" + decoded.user_id
    window.open(url, "_blank")
  }

  React.useEffect(() => {
    peticion();
  }, []);
  return (
    <React.Fragment>
      <Typography component="div" sx={{ flexGrow: 1 }} >
        Consumo reciente
      </Typography>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Mes</TableCell>
            <TableCell>Consumo en Kw/h</TableCell>
            <TableCell>Precio por Kw</TableCell>
            <TableCell>Penalidad</TableCell>
            <TableCell>Saldo a pagar</TableCell>
            <TableCell align="right">Factura</TableCell>
          </TableRow>
        </TableHead>
        <TableBody size="small">
          {row.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.issue_date}</TableCell>
              <TableCell>{row.amount_kwh}</TableCell>
              <TableCell>{row.price_kwh}</TableCell>
              <TableCell>{row.penalty_percentage}</TableCell>
              <TableCell>{`$${row.total_amount_to_pay}`}</TableCell>
              <TableCell align="right">
                <Button style={{
                  maxWidth: '90px', maxHeight: '20px'
                }}
                  onClick={() => generateBill()}>
                  Descargar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}