import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import serveStatic from 'serve-static'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { normalizePath } from 'vite'

const __dirname = path.resolve(path.dirname(''))

function checkLivePlayerExist(dirPath: string) {
  const doesExist = fs.existsSync(dirPath)
  if (!doesExist)
    throw new Error(`[react-liveplayer]: 请安装@liveqing/liveplayer`)

  return doesExist
}

export function livePlayer(): Plugin {
  let _outDir = 'dist'
  let base = '/'
  let isBuild = false
  const root = process.cwd()
  const dest = 'liveplayer'
  let serverPath = path.posix.join('/', base, dest)
  const srcPath = normalizePath(path.resolve(__dirname, './node_modules/@liveqing/liveplayer/dist/element/'))

  return {
    name: 'vite-plugin-liveplayer',

    config(conf, { command }) {
      isBuild = command === 'build'

      if (conf.base) {
        base = conf.base
        if (base === '')
          base = './'
      }

      serverPath = path.posix.join('/', base, dest)
      _outDir = conf.build?.outDir || 'dist'

      return conf
    },

    configureServer({ middlewares }) {
      if (checkLivePlayerExist(srcPath))
        middlewares.use(serverPath, serveStatic(srcPath))
    },

    async closeBundle() {
      if (isBuild && checkLivePlayerExist(srcPath)) {
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
