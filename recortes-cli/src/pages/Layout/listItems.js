
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TodayIcon from '@material-ui/icons/Today';
import Looks4Icon from '@material-ui/icons/Looks4';
import SettingsIcon from '@material-ui/icons/Settings';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';

import { Link } from "react-router-dom";


export const mainListItems = (
    <div>
        <Link to="/nup" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <Looks4Icon />
                </ListItemIcon>
                <ListItemText primary="Número" />
            </ListItem>
        </Link>
        <Link to="/data" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <TodayIcon />
                </ListItemIcon>
                <ListItemText primary="Data de Criação" />
            </ListItem>
        </Link>
        <Link to="/termos" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <SpellcheckIcon />
                </ListItemIcon>
                <ListItemText primary="Termos" />
            </ListItem>
        </Link>
        <Link to="/config" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
            </ListItem>
        </Link>
    </div>
);
