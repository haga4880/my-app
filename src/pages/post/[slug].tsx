/* src/pages/post/[slug].tsx */
import { client } from "libs/client";
import type { Post } from "types/blog";
import type { GetStaticPaths, GetStaticProps, } from "next";
import {
    Box,
    Container,
    Divider,
    Heading,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { Header } from "components/Header";
import { DateTime } from "components/DateTime";
import { MarkdownTemplate } from 'components/MarkdownTemplate'

type Props = {
    post: Post
}

export default function Article({ post }: Props) {
    return (
        <Box>
            <Header />
            <Container as="main" maxW="container.md" marginTop="4" marginBottom="16">
                <Stack spacing="8">
                    <Heading as="h1" fontSize="4xl" lineHeight={1.6}>
                        {post.title}
                    </Heading>
                    <DateTime datetime={post.publishedAt} />
                </Stack>
                <Divider marginY="8" />
                {/* 記事本文 */}
                <MarkdownTemplate source={post.text} />
            </Container >
        </Box >
    )
}

/* 記事詳細の静的ファイルの作成 */
export const getStaticPaths: GetStaticPaths = async () => {
    // limitがデフォルトで10なので、記事数が10以上になると古い記事が生成されない
    // そのため、一旦totalCountを取得して、limitに指定してリクエストを投げる。
    const data = await client.getList<Post>({ endpoint: "post", queries: { fields: 'id' } });
    const totalCount = data.totalCount
    const allData = await client.getList<Post>({ endpoint: "post", queries: { limit: totalCount } });
    const paths = allData.contents.map((content) => `/post/${content.id}`);
    return { paths, fallback: false };
};

// パラメーターから記事詳細データを取得
export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
    if (!params) throw new Error("Error Slug Not Found");
    const slug = params.slug;
    const data = await client.getListDetail<Post>({ endpoint: "post", contentId: slug });
    return {
        props: {
            post: data,
        },
    };
};