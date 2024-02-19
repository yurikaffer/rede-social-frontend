import { Box, ButtonBase } from '@mui/material';
import React, { useEffect, useRef, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  buttons?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, children, onConfirm, buttons }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const backgroundStyle = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: '1000',
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#1B2730',
    borderRadius: '10px',
    width: '500px',
    '@media (max-width: 650px)': {
      width: '90%',
    }
  };

  // Detectar cliques fora da modal para fechá-la
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Adicionar e remover event listener quando a modal é montada e desmontada
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <Box sx={backgroundStyle}>
          <Box ref={modalRef} sx={modalStyle} >
            <Box>{children}</Box>
            {buttons && (<Box display={'flex'} justifyContent={'end'} gap={1} marginTop={1}>
              <ButtonBase
                sx={{
                  width: '30%',
                  color: 'whitesmoke',
                  backgroundColor: '#990000',
                  padding: 1.5,
                  borderRadius: 2,
                  transition: '0.5s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#d90026',
                  },
                }}
                onClick={onClose}
              >
                Cancelar
              </ButtonBase>
              <ButtonBase
                sx={{
                  width: '30%',
                  color: 'whitesmoke',
                  backgroundColor: '#28343E',
                  padding: 1.5,
                  borderRadius: 2,
                  transition: '0.5s',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#323d45',
                  },
                }}
                onClick={onConfirm}
              >
                Confirmar
              </ButtonBase>
            </Box>)}
          </Box>

        </Box>
      )}
    </>
  );
};

export default ModalComponent;
