import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { livePlayer } from 'rc-liveplayer/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), livePlayer()],
})
