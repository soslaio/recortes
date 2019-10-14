
import React, { useState } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CssBaseline, Avatar, Button, TextField, Typography, Container } from '@material-ui/core';

import api from "../../services/api";
import useStyles from './styles';
import { login } from "../../services/auth";


export default function Login(props) {

    // Contantes auxiliares.
    const classes = useStyles();

    // Estados locais.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async e => {
        e.preventDefault();

        if (!username || !password) {
            setErro('Preencha e-mail e senha para continuar.')
        }
        else {
            try {
                const response = await api.post("/api-token-auth/", { username, password });
                login(response.data.token);
                props.history.push("/nup");
            } catch (err) {
                setErro('Não foi possível efetuar o login. Verifique suas credenciais.');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <img src={process.env.PUBLIC_URL + '/tikal.png'} alt="Tikal Tech" style={{ width: '120px', marginBottom: '2em' }} />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {erro && <p>{erro}</p>}
                <form className={classes.form} onSubmit={handleLogin} noValidate>
                    <TextField required fullWidth autoFocus variant="outlined" margin="normal" id="username"
                        label="Login" name="username" autoComplete="username"
                        onChange={e => setUsername(e.target.value)} />

                    <TextField required fullWidth variant="outlined" margin="normal" name="password" label="Senha"
                        type="password" id="password" autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)} />

                    <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
                        Efetuar login
                </Button>
                </form>
            </div>
        </Container>
    );
}
