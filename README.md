# Spider Swinger

Web build of **Spider Swinger** — a Spider-Man-like 3D web-swinging game built with Godot 4.

## What this repo holds

This repo contains only the **compiled web export** (`index.html`, `index.js`, `index.pck`, the split WebAssembly parts `wasm.part.*`, and a service worker), not the Godot project source. To change the game, edit the Godot project and re-export — the files here are the output of that export.

## Run it

Serve these files from any static host and open `index.html`:

```sh
npx serve .
```

`.nojekyll` is included so the export also works as-is on GitHub Pages. `index.html` sets a mobile-friendly viewport (`user-scalable=no`) for touch play.

## Credits

The player character model is 'Ultimate Spider-Man (Comics Version)' by RoSaPraMi on Sketchfab (CC Attribution), used for personal non-commercial purposes.
