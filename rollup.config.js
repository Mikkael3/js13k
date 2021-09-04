// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import kontra from 'rollup-plugin-kontra';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'testi/game.js',
  output: {
    file: 'testi/bundle.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    terser(),
    uglify(),
    nodeResolve(),
    commonjs(),
    kontra({
      gameObject: {
        acceleration: true,
        anchor: true,
        camera: true,
        opacity: true,
        rotation: true,
        ttl: true,
        velocity: true,
      },
      vector: {
        length: true,
        normalize: true,
      },
      sprite: {
        image: true,
      },
      // turn on debugging
      debug: false,
    }),
  ],
};
