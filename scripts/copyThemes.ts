import copy from 'recursive-copy';

const themes = ['default', 'other'];

Promise.all(
  themes.map(theme => {
    const inputPath = `src/themes/${theme}.css`;
    const outputPath = `./dist/${theme}.css`;
    return copy(inputPath, outputPath, { overwrite: true });
  }),
);
