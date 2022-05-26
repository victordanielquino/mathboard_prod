import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles  = makeStyles({
    divTitle: {
        //outline: '1px solid black'
        display: 'flex',
        justifyContent: 'space-between',
    },
});

export default function MaxWidthDialog({
                                           children,
                                           open,
                                           setOpen,
                                           title='Modal:',
                                           fullWidth= true,
                                           maxWidth = 'xs',
                                           handleSuccess,
                                           successDisabled = false,
                                           booleanFooter = true,
                                           successTitle = 'ACEPTAR'
}) {
    //const [fullWidth, setFullWidth] = React.useState(true); // true, false
    //const [maxWidth, setMaxWidth] = React.useState('sm');// xs, sm, md, lg, xl

    // LOGICA:
    const props = {}
    const classes = useStyles(props);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <div className={classes.divTitle}>
                        {title}
                        <IconButton aria-label="delete" size="small" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
                {
                    booleanFooter &&
                    <DialogActions>
                        <Button onClick={() => handleSuccess()} disabled={successDisabled}>{successTitle}</Button>
                        <Button onClick={handleClose} color='secondary'>CANCELAR</Button>
                    </DialogActions>
                }
            </Dialog>
        </React.Fragment>
    );
}
