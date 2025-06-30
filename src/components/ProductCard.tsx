// src/components/ProductCard.tsx
import React from 'react';
import { Box, Typography, Paper, IconButton, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import type {Product} from '../types/product';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const getStatusChip = (status: Product['stockStatus']) => {
    if (status === 'Estoque baixo') return <Chip label="Estoque Baixo" color="warning" size="small" />;
    if (status === 'Sem estoque') return <Chip label="Sem Estoque" color="error" size="small" />;
    return <Chip label="Em estoque" color="success" size="small" />;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                mb: 2,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                },
            }}
        >
            <Box>
                {/* Linha 1: Nome e Status */}
                <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        {product.nome}
                    </Typography>
                    {getStatusChip(product.stockStatus)}
                </Box>

                {/* Linha 2: Descrição */}
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                    {product.descricao || 'Sem descrição'}
                </Typography>

                {/* Linha 3: Detalhes */}
                <Box display="flex" alignItems="center" gap={3} sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    <Typography variant="body2">
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Preço: </span>
                        R$ {product.preco.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Estoque: </span>
                        {product.quantidadeEmEstoque} unidades
                    </Typography>
                    <Typography variant="body2">
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Categoria: </span>
                        {product.categoria.nome}
                    </Typography>
                </Box>
            </Box>

            {/* Ações */}
            <Box>
                <IconButton onClick={() => onEdit(product)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(product.id)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    <Delete />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ProductCard;