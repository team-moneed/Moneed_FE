import CompanyInfoBox from '@/components/Community/CompanyInfoBox';
import StockInfoBox from '@/components/Community/StockInfoBox';
import Posts from '@/components/Community/Posts';
import Vote from './Vote';
import { getPosts } from '@/api/post.api';

export default async function CommunityPage({ params }: { params: Promise<{ stocktype: string }> }) {
    const { stocktype } = await params;
    const posts = await getPosts(stocktype);

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-[.6rem] gap-x-[1.6rem] mt-4 md:gap-y-[1.2rem] mb-[.6rem]'>
                <CompanyInfoBox />
                <StockInfoBox />
            </div>
            <Vote />
            {posts && <Posts posts={posts} />}
        </div>
    );
}
