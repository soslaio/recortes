
import 'typeface-roboto';
import React, { useState } from 'react';
import { Paper, Button, Link, Grid } from '@material-ui/core';
import { DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import api from '../services/api';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    label: {
        fontWeight: 'bold'
    }
}));


export default function Tabela({ rows }) {

    // Contantes auxiliares.
    const dispatch = useDispatch()
    const classes = useStyles();

    // Estados locais.
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [objetoRecorte, setObjetoRecorte] = useState(null);

    const handleCloseDialog = e => {
        setOpenDialog(false);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Método útil para exibir a mensagem no snack.
    const exibirMensagem = msg => {
        dispatch({ type: 'ALTERAR_MENSAGEM', mensagem: msg });
        dispatch({ type: 'EXIBIR_MENSAGEM' });
    }

    const consultarDetalhes = async e => {
        e.preventDefault();

        try {
            const response = await api.get(`/api/recortes/${e.target.value}`);
            setObjetoRecorte(response.data);
            setOpenDialog(true);
        }
        catch (err) {
            exibirMensagem(err.message);
        }
    };

    return (
        <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Número</TableCell>
                        <TableCell>Recorte</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.numeracao_unica}</TableCell>
                                <TableCell>
                                    <Link
                                        style={{ textAlign: 'left' }}
                                        color="inherit"
                                        underline="none"
                                        value={row.id}
                                        component="button"
                                        variant="body2"
                                        onClick={consultarDetalhes}>
                                        {row.recorte.split(' ').slice(0, 50).join(' ') + ' (...)'}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {rows.length > 0 && <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="Registros por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                scroll="paper"
                aria-labelledby="scroll-dialog-title">
                <DialogTitle id="scroll-dialog-title">Detalhes do Recorte</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        {objetoRecorte &&
                            <Grid container spacing={3}>
                                <Grid item md={4}>
                                    <div className={classes.label}>Id</div>
                                    {objetoRecorte.id}
                                </Grid>
                                <Grid item md={8}>
                                    <div className={classes.label}>Número</div>
                                    {objetoRecorte.numeracao_unica}
                                </Grid>
                                <Grid item md={4}>
                                    <div className={classes.label}>Data da Criação</div>
                                    {objetoRecorte.data_criacao_formatada}
                                </Grid>
                                <Grid item md={4}>
                                    <div className={classes.label}>Data da Modificação</div>
                                    {objetoRecorte.data_modificacao_formatada}
                                </Grid>
                                <Grid item md={4}>
                                    <div className={classes.label}>Data da Publicação</div>
                                    {objetoRecorte.data_publicacao_formatada}
                                </Grid>
                                <Grid item md={4}>
                                    <div className={classes.label}>Código Diário</div>
                                    {objetoRecorte.codigo_diario}
                                </Grid>
                                <Grid item md={4}>
                                    <div className={classes.label}>Caderno</div>
                                    {objetoRecorte.caderno}
                                </Grid>
                                <Grid item md={4}>
                                    <div className={classes.label}>Novo?</div>
                                    {objetoRecorte.novo_recorte ? 'Sim' : 'Não'}
                                </Grid>
                                <Grid item md={12}>
                                    <div className={classes.label}>Recorte</div>
                                    {objetoRecorte.recorte}
                                </Grid>
                            </Grid>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
