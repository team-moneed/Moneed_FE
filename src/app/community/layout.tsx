import StockTypeBar from '@/components/StockTypeBar';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='px-8 max-w-512 mx-auto'>
            <StockTypeBar />
            <div>{children}</div>
        </div>
    );
}
