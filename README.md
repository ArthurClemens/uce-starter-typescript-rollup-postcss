# µce starter with TypeScript, Rollup and PostCSS

This repo demonstrates the use of styling and theming using PostCSS.

The code is an extension of [µce starter with TypeScript and Rollup](https://github.com/ArthurClemens/uce-starter-typescript-rollup).

Added features:

* Rollup PostCSS plugins:
  * `postcss-import`
  * `postcss-nested`
  * `postcss-mixins`
  * `postcss-preset-env` - to create CSS readable on older browsers
* IE 11 polyfill for CSS Variables


## Themes (without Shadow DOM)

When the component doesn't have a sub-DOM tree, its styles can be set from the outside.

In this setup the HTML loads the theme CSS according to the selection from the theme switcher (using [dark-mode-toggle](https://github.com/GoogleChromeLabs/dark-mode-toggle)). The theme file contains the CSS Variables that are referenced by the component CSS.

Note: the theme switcher does not work in IE 11 yet.



## Repo setup

The example component is a simple (and slightly modified) counter that is used on [webcomponents.dev](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) to compare Web Component libraries.

1. Clone this repository
1. `cd uce-starter-typescript-rollup-postcss`
1. `npm install`


## Run and build

* `npm run dev` - runs the dev server on port `3000`
* `npm run build` - creates `bundle.js` in `dist`
* `npm run serve` - runs a server on `dist`


## See also

* [µce starter with TypeScript and Rollup](https://github.com/ArthurClemens/uce-starter-typescript-rollup)
* [uce-svelte-typescript](https://github.com/ArthurClemens/uce-svelte-typescript)
* [µce](https://github.com/WebReflection/uce)
