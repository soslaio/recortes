
import React, { useState } from 'react';
import { Grid, Container, Typography, CssBaseline, TextField } from '@material-ui/core';

import useStyles from './styles';
import { getNumeroRegistros, setNumeroRegistros } from '../../services/config';


export default function Config() {

    // Contantes auxiliares.
    const [size, setSize] = useState(getNumeroRegistros());
    const classes = useStyles();

    // Altera o número máximo de registros retornados nas pesquisas.
    const handleNRegistros = e => {
        const nregistros = parseInt(e.target.value);
        setNumeroRegistros(nregistros);
        setSize(nregistros);
    }

    return (
        <Container>
            <CssBaseline />
            <Grid>
                <Typography variant="h4" gutterBottom>
                    Configurações
                </Typography>
            </Grid>
            <Grid>
                <TextField
                    required
                    type="number"
                    id="standard-required"
                    label="Número máximo de registros"
                    className={classes.textField}
                    margin="normal"
                    onChange={handleNRegistros}
                    value={size}
                />
            </Grid>
        </Container>
    );
}
