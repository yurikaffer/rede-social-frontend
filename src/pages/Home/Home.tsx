import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CreatePost from '../../components/Post/CreatePost/CreatePost';
import PostList from '../../components/Post/PostList';
import PostService from '../../api/Service/PostService';
import { usePostList } from '../../context/PostListContext';
import UserCard from '../../components/User/UserCard/UserCard';
import UsersListCard from '../../components/User/UserListCard/UsersListCard';
import MoreInfosCard from '../../components/moreInfos/MoreInfosCard';
import PremiumCard from '../../components/PremiumCard/PremiumCard'; 
import { RootContainer, Container, MainSection, SectionLeft, SectionRight, BorderBottom } from './HomeStyles'; 

const Home: React.FC = () => {
    const { setPosts } = usePostList();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPosts = await PostService.getPostsFromHomeByUser();
            setPosts(fetchedPosts);
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <RootContainer>
                <Container>
                    <SectionLeft>
                        <UsersListCard />
                        <PremiumCard />
                    </SectionLeft>

                    <MainSection >                    
                        <CreatePost />
                        <BorderBottom />
                        <PostList postsHome={true} />
                    </MainSection>

                    <SectionRight>
                        <UserCard />
                        <MoreInfosCard />
                    </SectionRight>
                </Container>
            </RootContainer>
        </>
    );
};

export default Home;
