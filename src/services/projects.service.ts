import { useMutation, useQuery } from '@tanstack/react-query';
import API from './api.service';

interface ProjectRequest {
    _id?: string;
    name: string;
    client: string;
}

function GetProjects() {
    return API.get("/projects")
}

function GetProjectById(id: string) {
    return API.get(`projects/${id}`)
}

function CreateProject(data: ProjectRequest) {
    return API.post("/projects", data)
}

const deleteProject = ({ id }: { id: string }) => {
    return API.delete(`projects/${id}`);
};

const updateProject = (data: ProjectRequest) => {
    return API.patch(`projects/${data._id}`, data);
};
  

export function useGetProjects() {
    return useQuery({
        queryFn: GetProjects,
        queryKey: ["getProjects"]
    })
}

export function useGetProjectById(id: string | undefined) {
    return useQuery({
        queryFn: () => GetProjectById(id || ''),
        queryKey: ["getProjectbyId", id],
        enabled: !!id
    })
}

export function useCreateProject() {
    return useMutation({
        mutationFn: CreateProject,
        mutationKey: ["createProject"]
    })
}


export const useDeleteProject = () => {
    return useMutation({
      mutationFn: deleteProject,
      mutationKey: ['deleteProject'],
    });
  };

  export const useUpdateProject = () => {
    return useMutation({
      mutationFn: updateProject,
      mutationKey: ['updateProject']
    });
  };