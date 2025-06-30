import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    TextField,
    MenuItem,
    InputAdornment,
    Button,
    Paper,
    CircularProgress,
    Fab,
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import axios from 'axios';

import StatsCard from '../components/StatsCard';
import ProductList from '../components/ProductList';
import ProductDialog from '../components/ProductDialog';
import CategoryDialog from '../components/CategoryDialog';

import type {Product, DashboardStats} from '../types/product';
import * as CategoriaService from '../api/CategoriaService';
import * as ProdutoService from '../api/ProdutoService';
import type {ProductPayload} from '../api/ProdutoService';

const LIMITE_ESTOQUE_BAIXO = 10;

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<CategoriaService.Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas as categorias');

    const [productDialogOpen, setProductDialogOpen] = useState(false);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                ProdutoService.getProdutos(),
                CategoriaService.getCategorias(),
            ]);

            const productsWithStatus: Product[] = productsData.map((p) => ({
                ...p,
                stockStatus:
                    p.quantidadeEmEstoque === 0 ? 'Sem estoque'
                        : p.quantidadeEmEstoque < LIMITE_ESTOQUE_BAIXO ? 'Estoque baixo'
                            : 'Em estoque',
            }));

            setProducts(productsWithStatus);
            setCategories([{ id: 0, nome: 'Todas as categorias' }, ...categoriesData]);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            toast.error('Não foi possível carregar os dados do servidor.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === 'Todas as categorias' || product.categoria.nome === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const stats: DashboardStats = useMemo(() => {
        return {
            totalProdutos: products.length,
            estoqueBaixo: products.filter((p) => p.stockStatus === 'Estoque baixo').length,
            semEstoque: products.filter((p) => p.stockStatus === 'Sem estoque').length,
            valorTotalEstoque: products.reduce((sum, p) => sum + p.preco * p.quantidadeEmEstoque, 0),
        };
    }, [products]);

    const handleAddProduct = () => {
        setEditingProduct(undefined);
        setProductDialogOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductDialogOpen(true);
    };

    const handleDeleteProduct = useCallback(async (productId: number) => {
        if (window.confirm('Tem certeza que deseja deletar este produto?')) {
            const promise = ProdutoService.deleteProduto(productId);
            toast.promise(promise, {
                loading: 'Deletando produto...',
                success: () => {
                    fetchData();
                    return 'Produto deletado com sucesso!';
                },
                error: (err) => `Não foi possível deletar: ${err.toString()}`,
            });
        }
    }, [fetchData]);

    const handleSaveProduct = useCallback(async (productData: ProductPayload) => {
        const promise = editingProduct
            ? ProdutoService.updateProduto(editingProduct.id, productData)
            : ProdutoService.createProduto(productData);

        toast.promise(promise, {
            loading: 'Salvando produto...',
            success: (produtoSalvo) => {
                setProductDialogOpen(false);
                fetchData();
                return `Produto "${produtoSalvo.nome}" salvo com sucesso!`;
            },
            error: (err) => {
                let errorMessage = 'Não foi possível salvar o produto.';
                if (axios.isAxiosError(err) && err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                }
                return errorMessage;
            },
        });
    }, [editingProduct, fetchData]);

    const handleSaveCategory = useCallback(async (categoryName: string) => {
        const promise = CategoriaService.createCategoria({ nome: categoryName });
        toast.promise(promise, {
            loading: 'Salvando nova categoria...',
            success: (novaCategoria) => {
                setCategoryDialogOpen(false);
                fetchData();
                return `Categoria "${novaCategoria.nome}" criada com sucesso!`;
            },
            error: (err) => {
                let errorMessage = 'Não foi possível criar a categoria.';
                if (axios.isAxiosError(err) && err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                }
                return errorMessage;
            },
        });
    }, [fetchData]);

    return (
        <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
            {/* Cabeçalho */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.2)',
                }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{
                            background: '#D7EAF5', backgroundClip: 'text',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, mb: 1,
                        }}>
                            Marketonic
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#D7EAF5', fontSize: '1.1rem', fontWeight: 500 }}>
                            Gerenciador de Produtos de Supermercado
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCategoryDialogOpen(true)} sx={{
                            borderRadius: 3, background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)', color: '#D7EAF5',
                            '&:hover': { background: 'rgba(255, 255, 255, 0.25)'}, }}>
                            Nova Categoria
                        </Button>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddProduct} sx={{
                            borderRadius: 3, background: 'rgba(255, 255, 255, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.3)', color: '#D7EAF5', fontWeight: 600,
                            '&:hover': { background: 'rgba(255, 255, 255, 0.3)'}, }}>
                            Novo Produto
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* Cards de Estatísticas */}
            {loading && products.length === 0 ? (
                <Box display="flex" justifyContent="center" my={4}><CircularProgress sx={{ color: '#D7EAF5' }} /></Box>
            ) : (
                <Grid container spacing={3} mb={4}>
                    <Grid size={{xs:12, sm:6, md:3}}><StatsCard title="Total de Produtos" value={stats.totalProdutos} type="total" /></Grid>
                    <Grid size={{xs:12, sm:6, md:3}}><StatsCard title="Estoque Baixo" value={stats.estoqueBaixo} type="lowStock" /></Grid>
                    <Grid size={{xs:12, sm:6, md:3}}><StatsCard title="Sem Estoque" value={stats.semEstoque} type="outOfStock" /></Grid>
                    <Grid size={{xs:12, sm:6, md:3}}><StatsCard title="Valor Total" value={`R$ ${stats.valorTotalEstoque.toFixed(2)}`} type="totalValue" /></Grid>
                </Grid>
            )}

            {/* Seção de Produtos */}
            <Card sx={{
                borderRadius: 4, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                p: { xs: 2, md: 4 }
            }}>
                <CardContent>
                    <Typography variant="h6" component="h2" sx={{ color: '#D7EAF5', fontWeight: 700, fontSize: '1.5rem', mb: 3 }}>
                        Produtos Cadastrados ({filteredProducts.length})
                    </Typography>
                    <Box display="flex" gap={{xs: 2, md: 3}} mb={4} flexWrap="wrap">
                        <TextField placeholder="Buscar por nome do produto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                   slotProps={{input: {startAdornment: (<InputAdornment position="start"><SearchIcon
                                               sx={{color: '#D7EAF5'}}/></InputAdornment>),
                                       }
                                   }}
                                   sx={{ flexGrow: 1, minWidth: { xs: '100%', md: 300 } }} />
                        <TextField select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                                   sx={{ minWidth: 220 }} slotProps={{inputLabel: {shrink: true} }}>
                            {categories.map((category) => (<MenuItem key={category.id} value={category.nome}>{category.nome}</MenuItem>))}
                        </TextField>
                    </Box>

                    {loading ? ( <Box display="flex" justifyContent="center" my={4}><CircularProgress sx={{ color: '#D7EAF5' }} /></Box>
                    ) : filteredProducts.length > 0 ? (
                        <ProductList products={filteredProducts} onEdit={handleEditProduct} onDelete={handleDeleteProduct}/>
                    ) : (
                        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 3, background: 'rgba(255, 255, 255, 0.05)' }}>
                            <Typography variant="h6" sx={{ color: '#D7EAF5'}}>Nenhum produto encontrado</Typography>
                            <Typography variant="body2" sx={{ color: '#D7EAF5'}}>Tente ajustar os filtros de busca.</Typography>
                        </Paper>
                    )}
                </CardContent>
            </Card>

            {/* Diálogos */}
            <ProductDialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)} onSave={handleSaveProduct}
                           product={editingProduct} categories={categories} />
            <CategoryDialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)} onSave={handleSaveCategory}/>

            {/* Botão Flutuante */}
            <Fab color="primary" aria-label="add" onClick={handleAddProduct} sx={{
                position: 'fixed', bottom: 24, right: 24, background: 'linear-gradient(135deg, #667eea, #764ba2)',
                '&:hover': { background: 'linear-gradient(135deg, #5a67d8, #6b46c1)', transform: 'scale(1.05)'},
                transition: 'all 0.3s', }}>
                <AddIcon />
            </Fab>
        </Container>
    );
}