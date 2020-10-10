/**
 * NOTE: Don't prettify this file: trailing commas will break Internet Explorer 11!
 */

function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done && done();
  };
  js.onerror = function() {
    done && done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}

if (!(window.CSS && window.CSS.supports('color', 'var(--fake-var)'))) {
  loadScript('//unpkg.com/css-vars-ponyfill@2', function() {
    cssVars();
  })
}

if (this.customElements) {
  try {
    customElements.define("built-in", document.createElement("p").constructor, {
      extends: "p",
    });
  } catch (s) {
    document.write(
      '<script src="//unpkg.com/@ungap/custom-elements-builtin@latest"><\x2fscript>'
    );
  }
} else {
  document.write(
    '<script src="//unpkg.com/document-register-element"><\x2fscript>'
  );
}

if (!document.documentElement.attachShadow) {
  document.write('<script src="//unpkg.com/attachshadow"><\x2fscript>');
}


