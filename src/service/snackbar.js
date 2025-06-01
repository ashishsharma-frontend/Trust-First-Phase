import { enqueueSnackbar } from "notistack";


const snackbar = (message, variant) => enqueueSnackbar(message, {
    variant,
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
    }
});

export default snackbar;