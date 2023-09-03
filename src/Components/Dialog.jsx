/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useResetContext } from '../Context';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function AlertDialog() {
  const {alertOpen, handleDialog, alertText } = useResetContext();
  const handleClose = () => {
   handleDialog();
  };
  

  return (
    <div>
      <Dialog
        open={alertOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Alert!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 18, fontWeight: 'medium', color: 'black', fontFamily: 'Lato' }}>
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
