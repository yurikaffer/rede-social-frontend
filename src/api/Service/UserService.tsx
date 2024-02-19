import { AxiosResponse } from 'axios';
import { UpdateUserInterface, UserInterface, createUserInterface } from '../../interface/UserInterface';
import { getAccessTokenHeader, api } from '../apiConfig';

class UserService {
    async getUser(id: string): Promise<UserInterface> {
        try {
            const response = await api.get(`user/${id}`, getAccessTokenHeader())

            if (response.status === 200) {
                return this.mapUserModelToUser(response);
            }

            throw new Error('Erro ao obter usuário');
        } catch (error) {
            throw new Error('Erro ao obter usuário');
        }
    }

    async getAllUsers(): Promise<UserInterface[]> {
        try {
            const response = await api.get('/users', getAccessTokenHeader())

            if (response.status === 200)
                return response.data.data;

            throw new Error('Erro ao obter usuários');
        } catch (error) {
            throw new Error('Erro ao obter usuários');
        }
    }

    async getUsersFromHome(): Promise<UserInterface[]> {
        try {
            const response = await api.get('/users/home', getAccessTokenHeader())

            if (response.status === 200)
                return response.data.data;

            throw new Error('Erro ao obter usuários');
        } catch (error) {
            throw new Error('Erro ao obter usuários');
        }
    }

    async updateUser(id: number, user: UpdateUserInterface): Promise<UserInterface> {
        try {
            const response = await api.put(`user/${id}`, user, getAccessTokenHeader())

            if (response.status === 200)
                return response.data.data;

            throw new Error('Erro ao obter usuários');
        } catch (error) {
            throw new Error('Erro ao obter usuários: ');
        }
    }

    async uploadFile(filePath: string): Promise<string> {
        try {
            const response = await api.put(`user/${localStorage.getItem('userId')}/imgUpdate`, {filePath}, getAccessTokenHeader())

            if (response.status === 200)
                return response.data.data;

            throw new Error('Erro ao obter usuários');
        } catch (error) {
            throw new Error('Erro ao obter usuários');
        }
    }

    async registerUser(user: createUserInterface): Promise<UserInterface | { error: string }> {
        try {
            const response = await api.post('/user', user);
                if ('error' in response.data.data) {
                    return { error: response.data.data.error };
                } else if (response.status === 201) {
                    return response.data;
                } else {
                    return { error: 'Erro ao registrar usuário.' };
                }

        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return { error: 'Erro ao registrar usuário.' };
        }
    }

    private mapUserModelToUser(response: AxiosResponse): UserInterface {
        return {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            createdAt: response.data.data.createdAt,
            filePath: response.data.data.filePath,
            userName: response.data.data.userName,
            biography: response.data.data.biography
        };
    }
}

const userService = new UserService();
export default userService;