import { useQuery } from '@tanstack/react-query'
import API from './api.service'

function getAllData() {
  return API.get('/dashboard')
}

export function useGetAllData() {
  return useQuery({
    queryFn: getAllData,
    queryKey: ['getDashboardData'],
  })
}
