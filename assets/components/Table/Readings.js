import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, TablePagination } from "@mui/material";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import { Checkbox } from "@mui/material";
import { getComparator } from '../util/util';

/**
 * TODO:
 *  - [ ] Notification for deletion of readings
 *  - [ ] Implementation editing of already existing readings
 */
export default function Readings() {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [reading, setReading] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get(`/get/readings`).then(response => {
      setReading(response.data)
    }).catch(err => {
      setMessage(err.response.data.message.text)
      setStatus(err.response.data.message.level)
    })
  }, [setReading]);

  async function handleDeleteRecords() {
    let selectedToJson = {}
    selected.map((k, i) => selectedToJson[i] = k)

    let readingsCopy = [...reading];
    let selectedCopy = [...selected];

    selected.forEach((el) => {
      readingsCopy.map((k, i) => {
        if (k.id === el) {
          let selectedIndex = selectedCopy.indexOf(el);

          readingsCopy.splice(i, 1)
          selectedCopy.splice(selectedIndex, 1)
        }
      })
    })

    await axios.post(`/reading/remove`, selectedToJson)
      .then(res => {
        setMessage(res.data.message.text);
        setStatus(res.data.message.level)
        setReading(readingsCopy);
        setSelected(selectedCopy);
      }).catch(err => {
        setMessage(err.response.data.message.text);
        setStatus(err.response.data.message.level)
      })
  }

  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = reading.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reading.length) : 0;

  const isSelected = id => selected.indexOf(id) !== -1;

  function handleChangePage(e, newPage) {
    setPage(newPage);
  }

  function handleRowsPerPage(e) {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  return (
    <Container style={{ color: 'red' }} sx={{ p: 5 }} maxWidth={"md"}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDeleteRecords}
        />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-labelledby={"tableTitle"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={reading.length}
            />
            <TableBody>
              {
                (reading.slice().sort(getComparator(order, orderBy)))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((key, index) => {
                    const isItemSelected = isSelected(key.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(e) => handleClick(e, key.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={key.id}
                        selected={isItemSelected}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell padding={"checkbox"}>
                          <Checkbox
                            color={"primary"}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                        <TableCell id={labelId} component={"th"} scope={"row"}>{key.id}</TableCell>
                        <TableCell align={"right"}>{key.reading}</TableCell>
                        <TableCell align={"right"}>{key.date}</TableCell>
                      </TableRow>
                    )
                  })
              }
              {
                emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[7, 14]}
          rowsPerPage={rowsPerPage}
          count={reading.length}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page'
            },
            native: true
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPage} />
      </Paper>
    </Container>
  )
}
