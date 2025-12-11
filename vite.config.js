import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Thêm cấu hình build để chia nhỏ mã nguồn
  build: {
    rollupOptions: {
      output: {
        // Chia nhỏ mã nguồn theo thư viện để tải không đồng bộ
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Tách React và các thư viện cốt lõi
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor_react_core';
            }
            // Tách thư viện 3D (Three.js/Fiber/Drei) vì chúng rất lớn
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor_three';
            }
            // Gom tất cả các thư viện còn lại vào một chunk chung
            return 'vendor';
          }
        },
      },
    },
    // (Tùy chọn) Tăng giới hạn cảnh báo nếu không muốn thấy cảnh báo này nữa:
    // chunkSizeWarningLimit: 1000, // Đặt giới hạn 1000kB
  },
})
