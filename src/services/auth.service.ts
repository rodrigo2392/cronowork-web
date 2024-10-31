import { useMutation } from '@tanstack/react-query';
import API from './api.service';
import { LoginResponse } from '../types/login.types';


const login = ({email, password}: {email: string, password: string}): Promise<{data: LoginResponse}> => {
    return API.post('/auth/login', {
        email,
        password
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        mutationKey: ["login"]
    })
}

const register = ({email, password, name}: {email: string, password: string, name: string}) => {
    return API.post('/auth/register', {
        email,
        password,
        name
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
        mutationKey: ["register"]
    })
}