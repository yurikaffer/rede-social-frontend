import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

const SimpleAlertError: React.FC<{msg: string}> = ({ msg }) => {

  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '99%',
    zIndex: 9999,
    padding: 1
  }

  return (
    <Box sx={style}>
      <Alert severity="error">{ msg }</Alert>
    </Box>
  );
}

export default SimpleAlertError