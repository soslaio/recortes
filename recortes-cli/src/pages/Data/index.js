
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import DateFnsUtils from '@date-io/date-fns';
import { Grid, Container, Typography, Paper, IconButton, CssBaseline, CircularProgress, Fade } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import Tabela from '../../components/Tabela';
import api from '../../services/api';
import useStyles from './styles';
import { getNumeroRegistros } from '../../services/config';


export default function Data() {

    // Contantes auxiliares.
    const dispatch = useDispatch()
    const classes = useStyles();

    // Estados locais.
    const size = getNumeroRegistros();
    const [termo, setTermo] = useState(new Date());
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = React.useState(false);

    // Método útil para exibir a mensagem no snack.
    const exibirMensagem = msg => {
        dispatch({ type: 'ALTERAR_MENSAGEM', mensagem: msg });
        dispatch({ type: 'EXIBIR_MENSAGEM' });
    }

    // Método que modifica a alteração do estado do termo, que
    // não se encaixa no padrão no caso do widget de calendário.
    const handleTermo = date => {
        setTermo(date);
    }

    // Métodos que faz a consulta remote dos recortes.
    const pesquisar = async e => {
        e.preventDefault();

        try {
            if (termo) {

                setLoading(true);
                const response = await api.get('/api/recortes/', {
                    params: {
                        t: format(termo, 'ddMMyyyy'),
                        size: size
                    }
                });

                const recortes = response.data.map(r => {
                    return {
                        id: r.id,
                        numeracao_unica: r.numeracao_unica,
                        recorte: r.recorte
                    }
                });

                if (recortes.length === 0) {
                    exibirMensagem('Nenhum registro foi localizado.');
                }

                setRows(recortes);
            }
            else {
                exibirMensagem('Digite ou selecione a data de publicação do processo.');
            }
        } catch (err) {
            exibirMensagem(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <CssBaseline />
            <Grid md={12} item={true}>
                <Typography variant="h4" gutterBottom>
                    Consulta por Data
                </Typography>
            </Grid>
            <Grid md={12} item={true}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Paper className={classes.cxPesquisa}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Data de publicação"
                            format="dd/MM/yyyy"
                            value={termo}
                            className={classes.input}
                            onChange={handleTermo}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <Fade unmountOnExit
                            in={loading}
                            size={25}
                            style={{
                                transitionDelay: loading ? '300ms' : '0ms',
                            }}>
                            <CircularProgress />
                        </Fade>
                        <IconButton className={classes.iconButton} aria-label="search" onClick={pesquisar}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid md={12} item={true}>
                <Tabela rows={rows} />
            </Grid>
        </Container>
    );
}
