import api from './api';

// Baseado no seu model Categoria.java
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

// Você pode adicionar aqui as funções para atualizar e deletar,
// seguindo a estrutura do seu CategoriaController.java