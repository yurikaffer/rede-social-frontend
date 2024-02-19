import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PostInterface } from '../../interface/PostInterface';
import { CommentInterface } from '../../interface/CommentInterface';
import PostService from '../../api/Service/PostService';
import CommentService from '../../api/Service/CommentService';
import { usePostList } from '../../context/PostListContext';
import { Box } from '@mui/material';
import { useComments } from '../../context/CommentsContext';
import ConfirmationModal from '../Modal/ConfirmationModal';

interface OptionButtonProp {
    post: PostInterface,
    comment?: CommentInterface
}

export const OptionButton: React.FC<OptionButtonProp> = ({ post, comment }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { deletePost, deleteComment } = usePostList();
    const { commentsNumber, setCommentsNumber } = useComments()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleConfirmDelete = async () => {
        if (comment) {
            if (await CommentService.DeleteComment(comment.id)) {
                deleteComment(post.id, comment.id);
                if (commentsNumber) {
                    setCommentsNumber(commentsNumber - 1);
                    setIsModalOpen(false);
                }
            }
        } else {
            if (await PostService.DeletePost(post.id)) {
                deletePost(post.id);
                setIsModalOpen(false);
            }
        }
    }

    const handleDeletePost = () => {
        setIsModalOpen(true);
        setAnchorEl(null)
      };
    

    return (
        <Box display={'flex'} marginLeft={'auto'} alignItems={'center'}>
            <IconButton sx={{ color: 'gray', padding: 0 }} onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleDeletePost}>
                    {comment ? 'Excluir comentário' : 'Excluir post'}
                </MenuItem>
            </Menu>

            <ConfirmationModal
                message={comment ? "Tem certeza que deseja excluir este comentário?" : "Tem certeza que deseja excluir este post?"}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
}
