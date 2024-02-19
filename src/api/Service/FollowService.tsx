import { FollowInterface } from '../../interface/FollowInterface';
import { getAccessTokenHeader, api } from '../apiConfig';

class FollowService {

    async createFollow(follower: number, followed_user: number): Promise<FollowInterface> {
        try {
            const response = await api.post(`/follow`, {
                follower,
                followed_user
            }, getAccessTokenHeader());

            if (response.status === 201) {
                return response.data.data;
            }

            throw new Error('Erro ao seguir usuário');
        } catch (error) {
            throw new Error('Erro ao seguir usuário');
        }
    }

    async isUserFollowed(follower: number, followed_user: number): Promise<number> {
        try {
            const response = await api.post('/follow/isUserFollowed', { follower, followed_user },
                getAccessTokenHeader());

            if (response.status === 201) {
                return response.data;
            }

            throw new Error('Erro ao verificar usuário');
        } catch (error) {
            throw new Error('Erro ao verificar usuário');
        }
    }

    async unfollowUser(id: number): Promise<string> {
        try {
            const response = await api.delete(`/follow/${id}`, getAccessTokenHeader());

            if (response.status === 200) {
                return 'alterar essa mensagem e esse retorno!' ////////////ALTERAR
            }

            throw new Error('Erro ao deixar de seguir usuário');
        } catch (error) {
            throw new Error('Erro ao deixar de seguir usuário');
        }
    }

    async getAllFollowersByUserId(id: number): Promise<number> {
        try {
            const response = await api.get(`/followers/${id}`, getAccessTokenHeader());
            const followers = response.data.data.length

            if (response.status === 200) {
                return followers ? followers : 0
            }

            throw new Error('Erro ao buscar seguidores');
        } catch (error) {
            throw new Error('Erro ao buscar seguidores');
        }
    }

    async getAllFollowedByUserId(id: number): Promise<number> {
        try {
            const response = await api.get(`/followed/${id}`, getAccessTokenHeader());
            const followed = response.data.data.length

            if (response.status === 200) {
                return followed ? followed : 0
            }

            throw new Error('Erro ao buscar seguidores');
        } catch (error) {
            throw new Error('Erro ao buscar seguidores');
        }
    }
}

const followService = new FollowService();
export default followService;