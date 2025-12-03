import {
    Box,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
    TextField,
    Button
} from '@mui/material';

const FilterPanel = ({
                         priceRange,
                         maxPrice,
                         onPriceChange,
                         onReset
                     }) => {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    alignItems="center"
                >


                    <Box sx={{ width: '100%' }}>
                        <Slider
                            value={priceRange}
                            onChange={(_, value) => onPriceChange(value)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={maxPrice}
                        />
                    </Box>
                    <Button variant="outlined" onClick={onReset}>
                        Reset
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default FilterPanel;

