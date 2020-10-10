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

In this setup the HTML loads `theme.css` that contains the CSS Variables that are references by the component CSS.



## Repo setup

The example component is a simple (and slightly modified) counter that is used on [webcomponents.dev](https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/) to compare Web Component libraries.

1. Clone this repository
1. `cd uce-starter-typescript-rollup-postcss`
1. `npm install`


## Run and build

* `npm run dev` - runs the dev server on port `3000`
* `npm run build` - creates `bundle.js` in `dist`
* `npm run serve` - runs a server on `dist`


## Changing the theme

* In `scripts/copyTheme.ts`, change the theme name from 'default' to 'other'
* Run `dev` or `build`



## See also

* [µce starter with TypeScript and Rollup](https://github.com/ArthurClemens/uce-starter-typescript-rollup)
* [uce-svelte-typescript](https://github.com/ArthurClemens/uce-svelte-typescript)
* [µce](https://github.com/WebReflection/uce)
