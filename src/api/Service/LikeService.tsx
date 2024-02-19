import { LikeInterface } from '../../interface/LikeInterface';
import {api, getAccessTokenHeader} from '../apiConfig';

class LikeService {

    async likePost(post: number): Promise<LikeInterface> {
        try {
            const user = Number(localStorage.getItem('userId'))
            const response = await api.post('/like', { user, post }, getAccessTokenHeader());

            if (response.status === 201) 
                return response.data;

            throw new Error('Erro ao curtir publicação');
        } catch (error) {
            throw new Error('Erro ao curtir publicação');
        }
    }

    async removeLikePost(id: number): Promise<boolean> {
        try {
            const response = await api.delete(`/like/${id}`, getAccessTokenHeader());

            if (response.status === 200) 
                return true;

            throw new Error('Erro ao curtir publicação');
        } catch (error) {
            throw new Error('Erro ao curtir publicação');
        }
    }
}

const likeService = new LikeService();
export default likeService;