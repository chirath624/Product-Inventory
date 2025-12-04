import {
    Box,
    Paper,
    Slider,
    Stack,
    Button,
    Typography,

} from '@mui/material';

const FilterPanel = ({
                         priceRange,
                         maxPrice,
                         onPriceChange,
                         onReset
                     }) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 3,
                maxWidth: 500,
                mx: 'auto',
                mb: 3,
                borderRadius: 2
            }}
        >
            <Stack spacing={2}>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={600}>
                        Price Range
                    </Typography>
                    <Button
                        size="small"
                        onClick={onReset}
                        sx={{ textTransform: 'none', minWidth: 'auto' }}
                    >
                        Reset
                    </Button>
                </Stack>

                <Box sx={{ px: 1 }}>
                    <Slider
                        value={priceRange}
                        onChange={(_, value) => onPriceChange(value)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={maxPrice}
                        size="small"
                    />

                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            ${priceRange[0]}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            ${priceRange[1]}
                        </Typography>
                    </Stack>
                </Box>

            </Stack>
        </Paper>
    );
};
export default FilterPanel
