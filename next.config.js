/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Configuração para subdomínio app.dmtn.com.br
  // Não precisa de basePath quando usa subdomínio
}

module.exports = nextConfig

