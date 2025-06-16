import { Post } from '@/types/post';

export default function Posts({ posts }: { posts: Post[] }) {
    return (
        <section className='mt-[2.8rem]'>
            <div className='flex items-baseline gap-[.8rem] mb-4'>
                <h2 className='text-[2.2rem] leading-[145%] font-bold text-moneed-black lg:text-[2.4rem] lg:leading-[140%]'>
                    게시글
                </h2>
            </div>
            {posts && <Posts posts={posts} />}
        </section>
    );
}
