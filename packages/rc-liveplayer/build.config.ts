import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig([
  {
    entries: ['src/vite'],
    clean: true,
    declaration: true,
    failOnWarn: false,
    externals: ['vite'],
    rollup: {
      esbuild: {
        minify: false,
      },
    },
  },
  {
    entries: ['src/index'],
    clean: true,
    declaration: true,
    failOnWarn: false,
    externals: ['react'],
    rollup: {
      esbuild: {
        minify: true,
      },
    },
  },
])
