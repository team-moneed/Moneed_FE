import { Suspense } from 'react';

export default function KakaoLayout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
