// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-go-module.js
Prism.languages["go-mod"] = Prism.languages["go-module"] = {
  "comment": {
    pattern: /\/\/.*/,
    greedy: true
  },
  "version": {
    pattern: /(^|[\s()[\],])v\d+\.\d+\.\d+(?:[+-][-+.\w]*)?(?![^\s()[\],])/,
    lookbehind: true,
    alias: "number"
  },
  "go-version": {
    pattern: /((?:^|\s)go\s+)\d+(?:\.\d+){1,2}/,
    lookbehind: true,
    alias: "number"
  },
  "keyword": {
    pattern: /^([ \t]*)(?:exclude|go|module|replace|require|retract)\b/m,
    lookbehind: true
  },
  "operator": /=>/,
  "punctuation": /[()[\],]/
};
//# sourceMappingURL=prismjs_components_prism-go-module.js.map
