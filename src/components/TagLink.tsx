/* src/components/TagLink.tsx */
import {
    Link,
    Tag,
    TagLabel
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import type { PostTag } from "types/blog";

export const TagLink: FC<{ tag: PostTag }> = ({ tag }) => {
    return (
            <Link key={tag.id} href={`/tags/${tag.id}/page/1`} >
                <Tag variant='subtle' colorScheme='cyan'>
                    <TagLabel fontSize="md">{tag.name}</TagLabel>
                </Tag>
            </Link>
    );
};