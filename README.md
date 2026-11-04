# rollup-plugin-cleaner

:wastebasket: A rollup plugin to clean directories before rebuilding.

## Installation

### npm

`npm install rollup-plugin-cleaner --save-dev`

### yarn

`yarn add rollup-plugin-cleaner --dev`

## Usage

### Options

| Option    | Type      | Description                                                                                                                                 | Default |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `targets` | `Array`   | List of directories which should be cleaned on every build.                                                                                 | `[]`    |
| `silent`  | `Boolean` | Flag to disable logging output to console.                                                                                                  | `false` |
| `exclude` | `Array`   | List of files and directories inside the targets which should be kept. Paths are relative to the current working directory, like `targets`. | `[]`    |

### Example

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

To keep some files, list them in `exclude`. Excluding a directory keeps everything inside it:

```JavaScript
cleaner({
  targets: ['./build/'],
  exclude: ['./build/.env', './build/static/'],
})
```

### Multiple configs

When `rollup.config.js` exports an array of configs that share a target, only the first config that lists a target cleans it. Later configs don't delete the bundles written by earlier ones, so you can add `cleaner` to every config or just the first.

## License

MIT
