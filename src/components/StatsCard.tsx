// src/components/StatsCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Inventory2, Warning, NoStroller, AttachMoney } from '@mui/icons-material';

interface StatsCardProps {
    title: string;
    value: string | number;
    type: 'total' | 'lowStock' | 'outOfStock' | 'totalValue';
}

const icons = {
    total: <Inventory2 />,
    lowStock: <Warning />,
    outOfStock: <NoStroller />,
    totalValue: <AttachMoney />,
};

const colors = {
    total: 'rgba(102,126,234,0.57)',
    lowStock: 'rgba(251,191,36,0.81)',
    outOfStock: 'rgba(239,68,68,0.89)',
    totalValue: 'rgba(52,211,153,0.82)',
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, type }) => (
    <Card sx={{
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    }}>
        <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    color: 'white',
                    backgroundColor: colors[type]
                }}>
                    {icons[type]}
                </Box>
                <Box>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{title}</Typography>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

export default StatsCard;