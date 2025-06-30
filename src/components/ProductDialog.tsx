import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Button, Grid, MenuItem, Paper, InputLabel
} from "@mui/material";

import type { Product } from "../types/product";
import type {Categoria} from "../api/CategoriaService";

interface FormData {
    nome: string;
    descricao: string;
    preco: string;
    quantidadeEmEstoque: string;
    dataDeValidade: string;
    categoriaId: string;
}

interface ProductDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, "id" | "stockStatus" | "categoria"> & { categoria: { id: number } }) => void;
    product?: Product;
    categories: Categoria[];
}

const ProductDialog: React.FC<ProductDialogProps> = ({ open, onClose, onSave, product, categories }) => {

    const initialState: FormData = {
        nome: "",
        descricao: "",
        preco: "",
        quantidadeEmEstoque: "",
        dataDeValidade: "",
        categoriaId: "",
    };

    const [formData, setFormData] = useState<FormData>(initialState);

    useEffect(() => {
        if (product) {
            setFormData({
                nome: product.nome,
                descricao: product.descricao,
                preco: product.preco.toString(),
                quantidadeEmEstoque: product.quantidadeEmEstoque.toString(),
                dataDeValidade: product.dataDeValidade ? product.dataDeValidade.split('T')[0] : '',
                categoriaId: product.categoria.id.toString(),
            });
        } else {
            setFormData(initialState);
        }
    }, [product, open, initialState]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = () => {
        const productData = {
            nome: formData.nome,
            descricao: formData.descricao,
            preco: parseFloat(formData.preco),
            quantidadeEmEstoque: parseInt(formData.quantidadeEmEstoque, 10),
            dataDeValidade: formData.dataDeValidade,
            categoria: {
                id: parseInt(formData.categoriaId, 10),
            },
        };
        onSave(productData);
        onClose();
    };

    const isValid = formData.nome && formData.preco && formData.quantidadeEmEstoque && formData.dataDeValidade && formData.categoriaId;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth slotProps={{ paper: {
                sx: {
                    borderRadius: 4, background: "rgba(255, 255, 255, 0.95)", color: "#000411",
                    backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.2)",
                },
            }
        }}
        >
            <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#000411", pb: 1 }}>
                {product ? "Editar Produto" : "Adicionar Novo Produto"}
            </DialogTitle>
            <DialogContent>
                <Paper elevation={0} sx={{ p: 3, mt: 2, borderRadius: 3, background: "rgba(248, 250, 252, 0.8)", border: "1px solid rgba(226, 232, 240, 0.5)", color: "#000411" }}>
                    <Grid container spacing={3}>
                        <Grid size={{xs:12, sm:8}}><TextField fullWidth label="Nome do Produto" name="nome" value={formData.nome} onChange={handleChange} required /></Grid>
                        <Grid size={{xs:12, sm:4}}>
                            <TextField fullWidth select label="Categoria" name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                                {categories.filter(c => c.id !== 0).map((category) => (
                                    <MenuItem key={category.id} value={category.id}>{category.nome}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{xs:12, sm:4}}><TextField fullWidth label="Preço" name="preco" type="number" value={formData.preco} onChange={handleChange} required inputProps={{ step: "0.01", min: "0" }}/></Grid>
                        <Grid size={{xs:12, sm:4}}><TextField fullWidth label="Quantidade em Estoque" name="quantidadeEmEstoque" type="number" value={formData.quantidadeEmEstoque} onChange={handleChange} required inputProps={{ min: "0" }}/></Grid>
                        <Grid size={{xs:12, sm:4}}>
                            <InputLabel shrink>Data de Validade</InputLabel>
                            <TextField fullWidth name="dataDeValidade" type="date" value={formData.dataDeValidade} onChange={handleChange} required/>
                        </Grid>
                        <Grid size={{xs:12}}><TextField fullWidth label="Descrição" name="descricao" multiline rows={3} value={formData.descricao} onChange={handleChange} /></Grid>
                    </Grid>
                </Paper>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button onClick={onClose} sx={{ borderRadius: 2, px: 3, py: 1, color: "#000411" }}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={!isValid} sx={{ borderRadius: 2, px: 3, py: 1, background: "#e7e5ec", color: "#000411" }}>
                    {product ? "Salvar Alterações" : "Criar Produto"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;