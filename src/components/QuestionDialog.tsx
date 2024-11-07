import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: () => void;
  title: string;
  description: string;
  yesTitle: string;
  noTitle: string;
}

export default function QuestionDialog({
  open,
  title,
  description,
  setOpen,
  action,
  yesTitle,
  noTitle
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    if (action) {
      action();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {noTitle}
          </Button>
          <Button onClick={handleAction} autoFocus>
            {yesTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
