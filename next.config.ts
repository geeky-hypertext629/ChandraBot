const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export',
  basePath: isProd ? '/ChandraBot' : '',
  assetPrefix: isProd ? '/ChandraBot/' : '',
}
