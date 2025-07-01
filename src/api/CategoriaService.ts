import api from './api';

export interface Categoria {
    id: number;
    nome: string;
}

export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias');
    return response.data;
};

export const createCategoria = async (categoria: { nome: string }): Promise<Categoria> => {
    const response = await api.post('/categorias', categoria);
    return response.data;
};