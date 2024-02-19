import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Post from './Post/Post';
import { usePostList } from '../../context/PostListContext';
import { useParams } from 'react-router-dom';
import PostService from '../../api/Service/PostService';

const PostList: React.FC<{postsHome: boolean}> = ({ postsHome }) => { 
  const { userId } = useParams();
  const { postList, setPosts } = usePostList();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await PostService.getAllByUserId(Number(userId));
      setPosts(fetchedPosts);
    };

    if (!postsHome) fetchData();
  }, [userId]);

  const renderPostsFromHome = () => {
    return (
      postList?.map((post) => (
        <Post key={post.id} post={post} />
      ))
    )
  }

  const renderPostsFromUserPage = () => {
    return (
      postList?.map((post) => (
        <Post key={post.id} post={post} />
      ))
    )
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
      {postsHome ? renderPostsFromHome() : renderPostsFromUserPage()}
    </Box>
  );
};

export default PostList;
