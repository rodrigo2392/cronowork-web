import { Box, Button, Typography } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { useState } from 'react';

export default function TablePaginationActions(props: Partial<TablePaginationActionsProps>) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const count = props.count ?? 0;

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleBackButtonClick = () => {
    if(page > 0) {
        setPage(prev => prev - 1)
    }
    
  };

  const handleNextButtonClick = () => {
    if(page < count) {
        setPage(prev => prev+ 1)
    }
  };

  const handleLastPageButtonClick = () => {
   setPage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Button onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <Typography variant="button">Inicio</Typography>
      </Button>
      <Button onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <Typography variant="button">Anterior</Typography>
      </Button>
      <Button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <Typography variant="button">Siguiente</Typography>
      </Button>
      <Button
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        <Typography variant="button">Final</Typography>
      </Button>
    </Box>
  );
}
