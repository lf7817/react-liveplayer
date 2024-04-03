import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import serveStatic from 'serve-static'
import { HtmlTagDescriptor, Plugin, normalizePath } from 'vite'

const __dirname = path.resolve(path.dirname(''))

export function livePlayer(): Plugin {
  let _outDir = 'dist'
  let base = '/'
  let isBuild = false
  const root = process.cwd()
  const dest = 'liveplayer'
  const src = './node_modules/@liveqing/liveplayer/dist/element/'
  const serverPath = path.posix.join('/', base, dest)
  const srcPath = normalizePath(path.resolve(__dirname, src))

  return {
    name: 'vite-plugin-liveplayer',

    config(conf, { command }) {
      isBuild = command === 'build'

      if (conf.base) {
        base = conf.base
        if (base === '')
          base = './'
      }
      //
      _outDir = conf.build?.outDir || 'dist'

      return conf
    },

    configureServer({ middlewares }) {
      middlewares.use(serverPath, serveStatic(srcPath))
    },

    async closeBundle() {
      if (isBuild) {
        try {
          await fs.copy(srcPath, normalizePath(path.resolve(root, _outDir, dest)))
        }
        catch (err) {
          console.error('copy failed', err)
        }
      }
    },

    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [
        {
          tag: 'script',
          attrs: {
            src: normalizePath(path.join(base, dest, './liveplayer-element.min.js')),
          },
        },
      ]

      return tags
    },
  }
}
