
export const NREGISTROS_KEY = "@recursos-nregistros";

export const getNumeroRegistros = () => sessionStorage.getItem(NREGISTROS_KEY);

export const setNumeroRegistros = nregistros => sessionStorage.setItem(NREGISTROS_KEY, nregistros);;
