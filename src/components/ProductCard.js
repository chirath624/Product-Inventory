import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Rating,
    Chip,
    CardActionArea
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ 
    product, 
    onClick,
    showDescription = false,
    imageHeight = 200 
}) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (onClick) {
            onClick(product);
        } else {
            navigate(`/products/${product.id}`);
        }
    };

    const rating = typeof product.rating === 'object' 
        ? product.rating?.rate || 0 
        : product.rating || 0;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height={imageHeight}
                    image={product.images?.[0] || product.thumbnail || '/placeholder.png'}
                    alt={product.title}
                    sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom noWrap>
                        {product.title}
                    </Typography>
                    
                    {showDescription && product.description && (
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                                mb: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {product.description}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Rating value={rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                            ({rating.toFixed(1)})
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" color="primary">
                            ${product.price?.toFixed(2) || '0.00'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock: {product.stock || 0}
                        </Typography>
                    </Box>

                    {product.category && (
                        <Chip 
                            label={product.category} 
                            color="primary" 
                            variant="outlined"
                            size="small"
                        />
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;

