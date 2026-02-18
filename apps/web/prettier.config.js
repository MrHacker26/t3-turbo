import prettierConfig from '@t3-turbo/config/prettier.config.js'

/** @type{import('prettier').Config} */
const config = {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
}
export default config
