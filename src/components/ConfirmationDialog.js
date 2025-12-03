import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const ConfirmationDialog = ({
                                open,
                                title,
                                message,
                                onCancel,
                                onConfirm,
                                confirmText = 'Confirm',
                                cancelText = 'Cancel'
                            }) => (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel}>{cancelText}</Button>
            <Button onClick={onConfirm} variant="contained" color="primary">
                {confirmText}
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationDialog;

