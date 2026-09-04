# dev-toolkit-62

A high-performance TypeScript utility library designed to streamline the development of browser-based gaming experiences. It provides robust abstractions for game loop management, state synchronization, and asset preloading.

## Features

*   **Ticker Engine:** A high-precision `requestAnimationFrame` wrapper that maintains a consistent delta-time for smooth physics simulations.
*   **Asset Pipeline:** Asynchronous asset manager with built-in progress tracking for textures, audio, and JSON configuration files.
*   **Input Observer:** Event-driven keyboard and mouse mapping system with support for chorded commands and customizable deadzones.
*   **State Store:** A lightweight, reactive state container optimized for real-time game data updates without heavy re-renders.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-62
# or
yarn add dev-toolkit-62
```

## Usage

Initialize the core engine and hook into the main update loop to manage your game state:

```typescript
import { GameEngine, InputObserver } from 'dev-toolkit-62';

const engine = new GameEngine({ targetFps: 60 });
const input = new InputObserver();

engine.onUpdate((delta) => {
  if (input.isKeyDown('ArrowRight')) {
    player.x += 5 * delta;
  }
});

engine.start();
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.