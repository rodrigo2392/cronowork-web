import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  TableFooter,
  TableHead,
  TablePagination,
  Typography
} from '@mui/material';
import TablePaginationActions from './Pagination';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { UnknownAction } from '@reduxjs/toolkit';
import QuestionDialog from './QuestionDialog';
import { useSnackbar } from 'react-simple-snackbar';

interface paginationResult {
  data: {
    docs: [];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

interface Props {
  columns: [];
  labels: {
    deleteTitle: string;
    deleteDescription: string;
    deleteSuccess: string;
  };
  data: paginationResult;
  isLoading: boolean;
  error: Error | null;
  changeRowPerPage: ({ rowsPerPage }: { rowsPerPage: number }) => UnknownAction;
  openDelete: boolean;
  deleteFunction: ({ id }: { id: string }, { onSuccess }: { onSuccess: () => void }) => void;
  refetch: () => void;
  setOpenDelete: (val: boolean) => void;
  deleteId: string;
  isRefetching: boolean;
  noDelete?: boolean;
  addTitle?: string | undefined;
}
export default function GenericTable({
  columns,
  data,
  isLoading,
  error,
  changeRowPerPage,
  deleteFunction,
  openDelete,
  deleteId,
  setOpenDelete,
  labels,
  refetch,
  isRefetching,
}: Props) {
  const [openSnackbar] = useSnackbar({
    position: 'bottom-right',
    style: {
      backgroundColor: '#2e7d32',
      color: 'white',
      fontFamily: 'Roboto',
      fontSize: '15px',
      textAlign: 'center'
    }
  });
  const dispatch = useDispatch();
  const rowPerPage = [5, 10, 20, 50];
  
  const page = 0;
  const rowsPerPage = 10;

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.data.docs || defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: data?.data.totalDocs,
    manualPagination: true,
    debugTable: true,
    paginateExpandedRows: true
  });


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row', justifyContent: 'space-between' }
        }}>
        <QuestionDialog
          open={openDelete}
          setOpen={setOpenDelete}
          title={labels.deleteTitle}
          description={labels.deleteDescription}
          yesTitle="Eliminar"
          noTitle="Cancelar"
          action={() => {
            setOpenDelete(false);
            deleteFunction(
              { id: deleteId },
              {
                onSuccess: () => {
                  openSnackbar(labels.deleteSuccess);
                  refetch();
                }
              }
            );
          }}
        />
      </Box>
      <Box sx={{backgroundColor: "#FFF"}}>
        <TableContainer sx={{ marginTop: 4 }}>
          <Table
            className="mainTable"
            stickyHeader
            sx={{ minWidth: 100 }}
            aria-label="spanning table">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {(isLoading || isRefetching) && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Alert
                        sx={{
                          width: '100%',
                          '& .MuiAlert-message': { textAlign: 'center', width: 'inherit' }
                        }}
                        severity="error"
                        icon={false}>
                        <AlertTitle>
                          <Typography variant="subtitle1">
                            Ha ocurrido un error, inténtalo de nuevo
                          </Typography>
                        </AlertTitle>

                        <Button variant="outlined" onClick={refetch} size="small">
                          Recargar
                        </Button>
                      </Alert>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
              ))}

              {data?.data?.docs.length === 0 && !isLoading && !isRefetching && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Alert
                      sx={{
                        width: '100%',
                        '& .MuiAlert-message': { textAlign: 'center', width: 'inherit' }
                      }}
                      severity="info"
                      icon={false}>
                      <AlertTitle>
                        <Typography variant="subtitle1">No se encontraron registros</Typography>
                      </AlertTitle>

                      <Button variant="outlined" onClick={refetch} size="small">
                        Recargar
                      </Button>
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Table>
            <TableBody>
              <TableRow>
                  <TablePagination
                    sx={{ border: 'none', width: '100%' }}
                    rowsPerPageOptions={rowPerPage}
                    colSpan={columns.length | 0}
                    count={data?.data.totalDocs | 0}
                    rowsPerPage={rowsPerPage}
                    labelDisplayedRows={(page) => (
                      <Typography
                        component="span"
                        variant="body1">{`${page.from} a ${page.to} de ${page.count}`}</Typography>
                    )}
                    page={page}
                    labelRowsPerPage="Por página"
                    onRowsPerPageChange={(e) =>
                      dispatch(
                        changeRowPerPage({ rowsPerPage: parseInt(e.target.value.toString()) })
                      )
                    }
                    onPageChange={() => {}}
                    ActionsComponent={TablePaginationActions}
                  />
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}
