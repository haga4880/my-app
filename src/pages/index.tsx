/* src/pages/index.tsx */
import type { NextPage } from 'next';
import { Header } from 'components/Header'
import { client } from 'libs/client';
import { Post } from 'types/blog';
import { PostList } from 'components/PostList';
import { Pagination } from 'components/Pagination';
import {
  Container,
  Heading
  
} from "@chakra-ui/react";
import { BLOG_PER_PAGE } from 'settings/siteSettings';


export const getStaticProps = async () => {
  const data = await client.getList({ endpoint: "post", queries: { limit: BLOG_PER_PAGE } });
  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount
    },
  };
};

type Props = {
  posts: Post[];
  totalCount: number
};

const Home: NextPage<Props> = ({ posts, totalCount }) => {
  return (
    <>
      
      <Header />
      <Container as="main" maxW="container.lg" marginTop="4" marginBottom="16">
      <Heading as="h2" fontSize="2xl" fontWeight="bold" mb="8">
          Home
        </Heading>
        <PostList posts={posts} />
        <Pagination totalCount={totalCount}></Pagination>
      </Container>
    </>
  )
}

export default Home