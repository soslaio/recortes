
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import {
    Grid, Container, Typography, Paper, IconButton,
    CssBaseline, InputBase, CircularProgress, Fade
} from '@material-ui/core';

import api from '../../services/api';
import styles from './styles';
import Tabela from '../../components/Tabela';
import { getNumeroRegistros } from '../../services/config';


export default function Termo() {

    // Contantes auxiliares.
    const dispatch = useDispatch()
    const classes = styles();

    const size = getNumeroRegistros();
    const [termo, setTermo] = useState('');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = React.useState(false);

    const termoAjustado = () => {
        return termo.split(' ').join('-');
    }

    // Método útil para exibir a mensagem no snack.
    const exibirMensagem = msg => {
        dispatch({ type: 'ALTERAR_MENSAGEM', mensagem: msg });
        dispatch({ type: 'EXIBIR_MENSAGEM' });
    }

    const pesquisar = async e => {
        e.preventDefault();

        try {
            if (termo) {

                setLoading(true);
                const response = await api.get('/api/recortes/', {
                    params: {
                        q: termoAjustado(),
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
                exibirMensagem('Digite ao menos um termo para pesquisar.');
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
                    Consulta por Termos
                </Typography>
            </Grid>
            <Grid md={12} item={true}>
                <Paper className={classes.cxPesquisa}>
                    <InputBase
                        className={classes.input}
                        placeholder="Termos separados por espaços"
                        value={termo}
                        onChange={e => setTermo(e.target.value)} />
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
            </Grid>
            <Grid md={12} item={true}>
                <Tabela rows={rows} />
            </Grid>
        </Container>
    );
}
