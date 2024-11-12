import { useQuery, useMutation } from '@tanstack/react-query'
import API from './api.service'

function getCurrentTrack() {
  return API.get('/track/current')
}

function getAllTracks() {
  return API.get('/track')
}

function removeTrack({ id }: { id: string }) {
  return API.delete(`/track/${id}`)
}

function startTrack({
  project,
  description,
}: {
  project: string
  description: string
}) {
  return API.post(`/track/start`, {
    project,
    description,
  })
}

function stopTrack() {
  return API.post(`/track/stop`)
}

export function useGetCurrentTrack() {
  return useQuery({
    queryFn: getCurrentTrack,
    queryKey: ['getCurrentTrack'],
  })
}

export function useGetAllTracks() {
  return useQuery({
    queryFn: getAllTracks,
    queryKey: ['getAllTracks'],
  })
}

export function useRemoveTrack() {
  return useMutation({
    mutationFn: removeTrack,
    mutationKey: ['removeTrack'],
  })
}

export function useStartTrack() {
  return useMutation({
    mutationFn: startTrack,
    mutationKey: ['startTrack'],
  })
}

export function useStopTrack() {
  return useMutation({
    mutationFn: stopTrack,
    mutationKey: ['stopTrack'],
  })
}
