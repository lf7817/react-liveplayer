# react-liveplayer

基于 [LivePlayer H5播放器 | 青柿视频流媒体服务解决方案 (liveqing.com)](https://www.liveqing.com/docs/manuals/LivePlayer.html)的 react封装

## 安装

```bash
npm install react-liveplayer @liveqing/liveplayer
```

## 使用

注册 vite插件

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { livePlayer } from 'react-liveplayer/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), livePlayer()],
})
```
如果通过 script标签引入了@liveqing/liveplayer就不用注册 vite插件了

```tsx
import { LivePlayer } from 'react-liveplayer'

function App() {
  return <LivePlayer poster="http://xxxxxx" video-url="http://xxxxxx" style={{ width: '100%', height: '100%' }} />
}
```

详细参数看官方文档
