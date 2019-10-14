
import clsx from 'clsx';
import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {
    Snackbar, CssBaseline, Drawer, AppBar, Toolbar, List,
    Typography, IconButton, Container, Grid
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from "react-router-dom";

import Nup from '../Nup';
import Data from '../Data';
import Termo from '../Termo';
import Config from '../Config';
import useStyles from './styles';
import { mainListItems } from './listItems';
import { logout } from '../../services/auth';
import { getNumeroRegistros, setNumeroRegistros } from '../../services/config';


const actions = [
    { icon: <ExitToAppIcon />, name: 'Logout' },
];

export default function Layout() {

    // Inicia o número de registros, caso necessário.
    const nregistros = getNumeroRegistros();
    if (!nregistros) {
        setNumeroRegistros(100);
    }

    // Contantes auxiliares.
    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;

    // Estados locais.
    const [open, setOpen] = useState(!isMobile);
    const [dialOpen, setDialOpen] = React.useState(false);

    // Estados gerenciados pelo redux.
    const snackOpen = useSelector(state => state.exibicao);
    const mensagem = useSelector(state => state.mensagem);
    const dispatch = useDispatch()

    // Métodos que controlam a exibição do menu lateral.
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Métodos que controlam a exibição do botão de logout.
    const handleDialOpen = () => {
        setDialOpen(true);
    };

    const handleDialClose = () => {
        setDialOpen(false);
    };

    // Método que oculta o snack.
    const handleSnackClose = e => {
        dispatch({ type: 'OCULTAR_MENSAGEM' });
    };

    // Handle do logout.
    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>

                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Pesquisa de Recortes
                    </Typography>

                    <div className={classes.exampleWrapper}>
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            className={classes.speedDial}
                            hidden={false}
                            icon={<PersonIcon />}
                            onClose={handleDialClose}
                            onOpen={handleDialOpen}
                            open={dialOpen}
                            direction="down">
                            {actions.map(action => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={handleLogout} />
                            ))}
                        </SpeedDial>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}>
                <img src={process.env.PUBLIC_URL + '/tikal.png'} alt="Tikal Tech" className={classes.logo} />
                <div className={classes.toolbarIcon}>

                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <List className={classes.menu}>
                    {mainListItems}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Route path="/nup" component={Nup} />
                        <Route path="/data" component={Data} />
                        <Route path="/termos" component={Termo} />
                        <Route path="/config" component={Config} />
                    </Grid>
                </Container>
            </main>
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleSnackClose}
                message={mensagem}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleSnackClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}
