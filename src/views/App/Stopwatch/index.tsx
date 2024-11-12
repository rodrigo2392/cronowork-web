import { Box, Typography } from '@mui/material'
import { UnknownAction } from '@reduxjs/toolkit'
import GenericTable from '../../../components/Table'
import paginationResult from '../../../types/table.types'
import { useState } from 'react'
import columnDefinition from './column-definition'
import Track from './forms/track'
import {
  useGetAllTracks,
  useRemoveTrack,
} from '../../../services/track.service'

export default function Stopwatch() {
  const [deleteId, setDeleteId] = useState('')
  const { data, isLoading, isRefetching, error, refetch } = useGetAllTracks()
  const { mutate: removeTrack } = useRemoveTrack()
  const [openDelete, setOpenDelete] = useState(false)

  const labels = {
    deleteTitle: '¿Seguro que deseas eliminar este proyecto?',
    deleteDescription:
      'El proyecto será eliminado permanentemente del sistema y no podrá ser recuperado.',
    deleteSuccess: 'Elemento eliminado correctamente.',
  }

  const deleteFunction = (id: string) => {
    setDeleteId(id)
    setOpenDelete(true)
  }

  const columns = columnDefinition({ deleteFunction })
  return (
    <Box sx={{ mb: 4, ml: 2 }}>
      <Typography variant="h4">Registrar tiempo</Typography>
      <Box sx={{ mt: 4 }}>
        <Box>
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2, marginBottom: 2 }}>
            <Track refetchTable={refetch} />
          </Box>
        </Box>
        <GenericTable
          data={data as paginationResult}
          isLoading={isLoading}
          error={error}
          labels={labels}
          columns={columns as []}
          changeRowPerPage={() =>
            console.log('change') as unknown as UnknownAction
          }
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          refetch={refetch}
          isRefetching={isRefetching}
          deleteFunction={removeTrack}
          deleteId={deleteId}
        />
      </Box>
    </Box>
  )
}
