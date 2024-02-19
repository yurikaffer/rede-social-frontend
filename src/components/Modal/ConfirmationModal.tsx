import React from 'react';
import { Box, Typography } from '@mui/material';
import ModalComponent from './ModalComponent';

interface ConfirmationModalProps {
  message: string;
  isOpen: boolean;
  imgString?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  isOpen,
  onClose,
  onConfirm,
  imgString,
}) => {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} buttons={true}>
      <Typography color={'primary'} fontSize={24}>Confirmação</Typography>
      <Box marginTop={2}>
        <Typography color={'primary'} fontSize={18}>{message}</Typography>
        <Box display={'flex'} justifyContent={'center'} paddingTop={3}>
          {imgString && (<img
            src={imgString}
            loading="lazy"
            alt=""
            style={{ 
              objectFit: 'cover', 
              width: '500px', 
              height: '400px', 
              borderRadius: '5px', 
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            }}
          />)}
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default ConfirmationModal;
