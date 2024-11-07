import { useMutation, useQuery } from '@tanstack/react-query';
import API from './api.service';

interface ClientRequest {
    _id?: string;
    name: string;
    email: string;
}

function GetClients() {
    return API.get("/clients")
}

function GetClientById(id: string) {
    return API.get(`clients/${id}`)
}

function CreateClient(data: ClientRequest) {
    return API.post("/clients", data)
}

const deleteClient = ({ id }: { id: string }) => {
    return API.delete(`clients/${id}`);
};

const updateClient = (data: ClientRequest) => {
    return API.patch(`clients/${data._id}`, data);
};
  

export function useGetClients() {
    return useQuery({
        queryFn: GetClients,
        queryKey: ["getClients"]
    })
}

export function useGetClientById(id: string | undefined) {
    return useQuery({
        queryFn: () => GetClientById(id || ''),
        queryKey: ["getClientbyId", id],
        enabled: !!id
    })
}

export function useCreateClient() {
    return useMutation({
        mutationFn: CreateClient,
        mutationKey: ["createClient"]
    })
}


export const useDeleteClient = () => {
    return useMutation({
      mutationFn: deleteClient,
      mutationKey: ['deleteClient'],
    });
  };

  export const useUpdateClient = () => {
    return useMutation({
      mutationFn: updateClient,
      mutationKey: ['updateClient']
    });
  };