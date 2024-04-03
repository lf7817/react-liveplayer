import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { livePlayer } from 'react-liveplayer/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), livePlayer()],
})
