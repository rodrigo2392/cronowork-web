import { createColumnHelper } from '@tanstack/react-table'
import { IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment'

interface Props {
  deleteFunction: (id: string) => void
}

interface ProjectTable {
  _id: string
  description: string
  project: {
    name: string
    client: {
      name: string
    }
  }
  start: number
  stop: number
  action: undefined
}

export default function ColumnDefinition({ deleteFunction }: Props) {
  const columnHelper = createColumnHelper<ProjectTable>()

  const columns = [
    columnHelper.accessor('_id', {
      header: () => <></>,
      cell: () => <></>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.description, {
      id: 'name',
      header: () => <Typography fontWeight="bold">Tarea</Typography>,
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.project, {
      id: 'project',
      header: () => <Typography fontWeight="bold">Cliente</Typography>,
      cell: info => info.getValue().client.name,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.project, {
      id: 'project',
      header: () => <Typography fontWeight="bold">Proyecto</Typography>,
      cell: info => info.getValue().name,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row, {
      id: 'stop',
      header: () => <Typography fontWeight="bold">Total</Typography>,
      cell: info => {
        const totalTime = moment.duration(
          moment(info.getValue().stop).diff(info.getValue().start),
        )

        return (
          <Typography>{`${totalTime.hours().toString().padStart(2, '0')}:${totalTime.minutes().toString().padStart(2, '0')}:${totalTime.seconds().toString().padStart(2, '0')}`}</Typography>
        )
      },
      footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.action, {
      id: 'actions',
      header: () => <Typography fontWeight="bold">Acciones</Typography>,
      cell: data => (
        <>
          {/*<Tooltip title="Ver detalles">
            <IconButton
              color="primary"
              onClick={() => editFunction(data.row.getValue('_id'))}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>*/}
          <Tooltip title="Eliminar">
            <IconButton
              color="primary"
              onClick={() => deleteFunction(data.row.getValue('_id'))}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    }),
  ]

  return columns
}
