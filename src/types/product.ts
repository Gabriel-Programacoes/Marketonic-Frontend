import type {Categoria} from "../api/CategoriaService";

// Interface alinhada com o backend (Produto.java) e com a UI
export interface Product {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidadeEmEstoque: number;
    dataDeValidade: string;
    categoria: Categoria;
    // Opcional: para controle de UI
    stockStatus?: "Em estoque" | "Estoque baixo" | "Sem estoque";
}

// Interface para os cards de estatísticas
export interface DashboardStats {
    totalProdutos: number;
    estoqueBaixo: number;
    semEstoque: number; // Produtos vencidos podem ser considerados "sem estoque" para venda
    valorTotalEstoque: number;
}