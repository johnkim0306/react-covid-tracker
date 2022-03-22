import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./DataTable.scss";
import numeral from "numeral";  

const columns = [
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 50, algin: 'center' },
  { id: 'country', label: 'Country' },
  { id: 'cases', label: 'Cases', minWidth: 50, align: 'left', format: (value) => value.toLocaleString('en-US') },
  { id: 'recovered', label: 'Recovered', align: 'center' },
  { id: 'deaths', label: 'Deaths', align: 'center' }
];

export default function DataTable({ countries }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //console.log("Table on: ", countries);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={country.country}>

                    <TableCell align="center" className="table-country" style={{ backgroundImage: `url(${country.countryInfo.flag})`}}>
                        {country.countryInfo.iso2}
                    </TableCell>

                    <TableCell align="left">
                        <strong>{country.country}</strong>
                    </TableCell>

                    <TableCell align="left">
                        {numeral(country.casesPerOneMillion).format("0,0")}
                    </TableCell>

                    <TableCell align="right">
                        {numeral(country.recoveredPerOneMillion).format("0,0")}
                    </TableCell>

                    <TableCell align="center">
                        {numeral(country.deathsPerOneMillion).format("0,0")}
                    </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
