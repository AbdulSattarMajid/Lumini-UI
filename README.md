# Lumina UI

Lumina UI is a modern, dynamic, and visually stunning React application emphasizing rich aesthetics, dynamic animations, and 3D web experiences. Built on top of a powerful, modern tech stack, Lumina UI combines standard 2D web interfaces with immersive 3D canvases.

## 🚀 Tech Stack

This project leverages the latest web technologies for optimal performance and developer experience:

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://gsap.com/)
- **3D Graphics & Canvas:**
  - [Three.js](https://threejs.org/)
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
  - [React Three Drei](https://github.com/pmndrs/drei)
  - [@react-spring/three](https://react-spring.dev/)
- **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## 📦 Installation & Setup

1. **Unzip the package** and navigate to the directory:
   ```bash
   cd lumina-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
   *Note: This project uses Tailwind CSS v4. The Vite configuration is pre-configured with the `@tailwindcss/vite` plugin to ensure styles compile correctly.*

## 🎨 Features

- **Dynamic Theme Gradients**: All landing page sections feature a dynamic background gradient (`.section-theme-gradient`) that seamlessly transitions colors to match the currently selected UI theme.
- **Interactive 3D Canvases**: Powered by React Three Fiber and Three.js, adding immersive depth to the interface.
- **Fluid Animations**: Complex layout animations, spring physics, and scroll-linked reveals utilizing Framer Motion and GSAP.
- **Modern Architecture**: Built completely with React 19 and strict TypeScript, maintaining high performance and type safety.