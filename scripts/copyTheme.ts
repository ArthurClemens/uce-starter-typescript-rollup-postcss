import copy from 'recursive-copy';

const THEME = 'default';
// const THEME = 'other';

const themeFile = `src/themes/${THEME}.css`;

(async () => {
  try {
    await copy(themeFile, './dist/theme.css', { overwrite: true });
  } catch (err) {
    console.error(err);
  }
})();
