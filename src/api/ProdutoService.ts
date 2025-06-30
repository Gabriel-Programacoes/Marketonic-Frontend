// src/api/ProdutoService.ts
import api from './api';
import type {Product} from '../types/product'; // Importe o tipo unificado
// Importe o tipo unificado

// A interface Product agora fica em types/product.ts para ser reutilizada

export type ProductPayload = Omit<Product, 'id' | 'stockStatus' | 'categoria'> & {
    categoria: { id: number };
};

export const getProdutos = async (): Promise<Product[]> => {
    const response = await api.get('/produtos');
    return response.data;
};

export const createProduto = async (produtoData: ProductPayload): Promise<Product> => {
    const response = await api.post('/produtos', produtoData);
    return response.data;
};

export const updateProduto = async (id: number, produtoData: ProductPayload): Promise<Product> => {
    const response = await api.put(`/produtos/${id}`, produtoData);
    return response.data;
};

export const deleteProduto = async (id: number): Promise<void> => {
    await api.delete(`/produtos/${id}`);
}

// --- Funções para os Alertas/Estatísticas ---

export const getProdutosComEstoqueBaixo = async (): Promise<Product[]> => {
    const response = await api.get('/produtos/alertas/estoque-baixo');
    return response.data;
}

export const getProdutosVencidos = async (): Promise<Product[]> => {
    // No seu backend, "vencidos" pode ser o que chamamos de "sem estoque" na UI.
    const response = await api.get('/produtos/alertas/vencidos');
    return response.data;
}