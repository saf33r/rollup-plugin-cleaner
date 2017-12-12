# rollup-plugin-cleaner

A rollup plugin to clean directories before rebuilding.

## Installation

    npm install rollup-plugin-cleaner

or

    yarn add rollup-plugin-cleaner

## Usage

To remove the `build` directory on every build add the following to `rollup.config.js`:

```JavaScript
import cleaner from 'rollup-plugin-cleaner';

export default {
  entry: './src/index.js',
  output: {
    dest: './build/bundle.js',
  },
  plugins: [
    cleaner({
      targets: [
        './build/'
      ]
    })
  ]
};
```

## License

MIT