// src/components/ProductList.tsx
import React from 'react';
import { Box } from '@mui/material';
import type {Product} from '../types/product';
import ProductCard from './ProductCard'; // Importa nosso novo componente

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
    return (
        <Box>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );
};

export default ProductList;