import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        // Exclude Solidity files from build
        /\.sol$/,
        // Exclude FHEVM packages that are not needed in frontend
        "@fhevm/solidity",
        "@fhevm/solidity/lib/FHE.sol",
        "@fhevm/solidity/config/ZamaConfig.sol"
      ]
    }
  }
});
