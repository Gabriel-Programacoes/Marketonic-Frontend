import type {Categoria} from "../api/CategoriaService";

export interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidadeEmEstoque: number;
    dataDeValidade: string;
    categoria: Categoria;
    stockStatus?: "Em estoque" | "Estoque baixo" | "Sem estoque";
}

// Interface para os cards de estatísticas
export interface DashboardStats {
    totalProdutos: number;
    estoqueBaixo: number;
    semEstoque: number;
    valorTotalEstoque: number;
}