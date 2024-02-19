import { PostInterface } from '../../interface/PostInterface';
import {api, getAccessTokenHeader} from '../apiConfig';

class PostService {
    async createPost(content: string, imgURL?: string): Promise<PostInterface> {
        try {
            const user_id = Number(localStorage.getItem('userId'))
            const response = await api.post('/post', {content, user_id, imgURL}, getAccessTokenHeader())

            if (response.status === 201) {
                return response.data.data;
            }

            throw new Error('Erro ao criar publicações');
        } catch (error) {
            throw new Error('Erro ao criar publicações');
        }
    }

    async DeletePost(id: number): Promise<boolean> {
        try {
            const response = await api.delete(`/post/${id}`, getAccessTokenHeader());

            if (response.status === 200) {
                return true;
            }

            console.error('Erro ao deletar postagem');
            return false;
        } catch (error) {
            console.error('Erro ao deletar postagem:', error);
            return false;
        }
    }

    async getPostsFromHomeByUser(): Promise<PostInterface[]> {
        try {
            const user_id = Number(localStorage.getItem('userId'))

            const response = await api.get(`/posts/${user_id}`, getAccessTokenHeader());

            if (response.status === 200) {
                const posts: PostInterface[] = response.data.data
                return posts;
            }

            throw new Error('Erro ao obter publicações');
        } catch (error) {
            throw new Error('Erro ao obter publicações');
        }
    }

    async getAllByUserId(id: number): Promise<PostInterface[]> {
        try {
            const response = await api.get(`/posts/user/${id}`, getAccessTokenHeader());

            if (response.status === 200) {
                const posts: PostInterface[] = response.data.data
                return posts;
            }

            throw new Error('Erro ao obter publicações do usuário');
        } catch (error) {
            throw new Error('Erro ao obter publicações do usuário');
        }
    }
}

const postService = new PostService();
export default postService;