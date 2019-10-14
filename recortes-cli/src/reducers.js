
export function mensagemReducer(state = '', action) {
    let mensagem = action.mensagem || state;
    switch (action.type) {
        case 'ALTERAR_MENSAGEM':
            return mensagem;
        default:
            return state;
    }
}

export function exibicaoMensagemReducer(state = false, action) {
    switch (action.type) {
        case 'EXIBIR_MENSAGEM':
            return true;
        case 'OCULTAR_MENSAGEM':
            return false;
        default:
            return state;
    }
}
