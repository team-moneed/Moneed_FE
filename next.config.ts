import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    distDir: 'dist',
    eslint: {
        dirs: ['src'],
    },
};

export default nextConfig;
