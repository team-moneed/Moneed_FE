'use client';
import { type Post as TPost } from '@/types/post';
import Post from './Post';

type PostsProps = {
    posts: TPost[];
};

const Posts = ({ posts }: PostsProps) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.2rem] mt-4 md:gap-y-[1.6rem] mb-[.6rem]'>
            {posts.map((post: TPost) => (
                <Post
                    key={post.postId}
                    userName={post.userName}
                    content={post.content}
                    isliked={post.isliked}
                    postId={post.postId}
                    stocktype={post.stocktype}
                    postImages={post.postImages}
                    likes={post.likes}
                    createdAt={post.createdAt}
                    title={post.title}
                />
            ))}
        </div>
    );
};

export default Posts;
