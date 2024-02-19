import { CommentInterface } from '../../interface/CommentInterface';
import {api, getAccessTokenHeader} from '../apiConfig';

class CommentService {
    async addComment(post: number, content: string): Promise<CommentInterface> {
        try {
            const user = Number(localStorage.getItem('userId'))
            const response = await api.post('/comment', { user, post, content },getAccessTokenHeader());

            if (response.status === 201){
                return response.data;
            }

            throw new Error('Erro ao comentar publicação');
        } catch (error) {
            throw new Error('Erro ao comentar publicação');
        }
    }

    async DeleteComment(id: number): Promise<boolean> {
        try {
            const response = await api.delete(`/comment/${id}` ,getAccessTokenHeader());

            if (response.status === 200){
                return true
            }

            throw new Error('Erro ao deletar comentário');
        } catch (error) {
            throw new Error('Erro ao deletar comentário');
        }
    }

}

const commentService = new CommentService();
export default commentService;