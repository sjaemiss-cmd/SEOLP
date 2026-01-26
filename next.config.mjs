/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gosudriving.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
