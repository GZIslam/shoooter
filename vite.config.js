// const { defineConfig } = require('vite')
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 3007
    },
    build: {
        outDir: './public'
    }
})