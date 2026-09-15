const {defineConfig}=require('vite');const react=require('@vitejs/plugin-react');module.exports=defineConfig({plugins:[react()]});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})