/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude reference/test directories from build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // For AWS Amplify, we don't need standalone output
  // output: 'standalone',
}

module.exports = nextConfig

