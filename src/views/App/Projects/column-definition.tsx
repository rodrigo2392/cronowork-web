import { createColumnHelper } from '@tanstack/react-table';
import { IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  deleteFunction: (id: string) => void;
  editFunction: (id: string) => void;
}


interface ProjectTable {
    _id: string;
    name: string;
    client: {
      _id: string;
      name: string;
      email: string;
    };
    action: undefined;
}

export default function ColumnDefinition({ deleteFunction, editFunction }: Props) {
  const columnHelper = createColumnHelper<ProjectTable>();

  const columns = [
    columnHelper.accessor('_id', {
      header: () => <></>,
      cell: () => (<></>),
      footer: (info) => info.column.id,
      
    }),
    columnHelper.accessor((row) => row.name, {
      id: 'name',
      header: () => <Typography fontWeight="bold">Nombre</Typography>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id
    }),
    columnHelper.accessor((row) => row.client.name, {
        id: 'client.name',
        header: () => <Typography fontWeight="bold">Cliente</Typography>,
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id
      }),
      columnHelper.accessor((row) => row.action, {
        id: 'actions',
        header: () => <Typography fontWeight="bold">Acciones</Typography>,
        cell: (data) => (
          <>
            <Tooltip title="Ver detalles">
              <IconButton color="primary" onClick={() => editFunction(data.row.getValue('_id'))}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="primary" onClick={() => deleteFunction(data.row.getValue('_id'))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      })
  ];

  return columns;
}
