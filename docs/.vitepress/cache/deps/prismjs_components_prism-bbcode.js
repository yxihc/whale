// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-bbcode.js
Prism.languages.bbcode = {
  "tag": {
    pattern: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))*\s*\]/,
    inside: {
      "tag": {
        pattern: /^\[\/?[^\s=\]]+/,
        inside: {
          "punctuation": /^\[\/?/
        }
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+)/,
        inside: {
          "punctuation": [
            /^=/,
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ]
        }
      },
      "punctuation": /\]/,
      "attr-name": /[^\s=\]]+/
    }
  }
};
Prism.languages.shortcode = Prism.languages.bbcode;
//# sourceMappingURL=prismjs_components_prism-bbcode.js.map
