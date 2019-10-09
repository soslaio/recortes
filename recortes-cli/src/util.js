
import { encode } from 'base-64';
import React from 'react';


export function analisarResposta(response) {

    if (response.ok) {
        return response
    }
    else {
        if (response.status === 401)
            throw new Error('Não foi possível autenticar na API. Verifique o usuário e senha.')

        if (response.status === 404)
            throw new Error('O recorte não foi localizado.')
    }
}

export function getRequestHeaders(usuario, senha) {

    return {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + encode(usuario + ':' + senha)
        })
    }
}

export class Formatters {

    static palavrasContadas(cell, row, rowIndex, formatExtraData) {

        const q = formatExtraData.quantidadePalavras;
        const palavras = cell.split(' ');
        const recorte = palavras.length > q ? palavras.slice(0, q).join(' ') + ' (...)' : cell;

        return (<span>{recorte}</span>);
    }
}
