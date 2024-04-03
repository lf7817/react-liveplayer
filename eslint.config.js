import antfu from '@antfu/eslint-config'

export default await antfu({
  gitignore: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  typescript: true,
  jsonc: false,
  yaml: false,
  react: true,
  plugins: {
  },
  rules: {

  },
})
