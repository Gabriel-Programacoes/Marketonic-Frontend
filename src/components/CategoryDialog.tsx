import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from '@mui/material';

interface CategoryDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (categoryName: string) => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ open, onClose, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (!open) {
            setName('');
        }
    }, [open]);

    const handleSubmit = () => {
        if (name.trim()) {
            onSave(name.trim());
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} slotProps={{ paper: {
                sx: {
                    borderRadius: 4,
                    background: '#160C28',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    width: '400px'
                },
            }
        }}>
            <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#D7EAF5' }}>
                Adicionar Nova Categoria
            </DialogTitle>
            <DialogContent>
                <Box mt={2}>
                    <TextField
                        autoFocus
                        fullWidth
                        placeholder="Nome do categoria..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button onClick={onClose} sx={{ color: '#D7EAF5' }}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!name.trim()}
                    sx={{ color:'#D7EAF5', background: 'rgba(63,36,114,0.65)' }}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryDialog;