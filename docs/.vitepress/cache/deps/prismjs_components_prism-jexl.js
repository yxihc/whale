// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-jexl.js
Prism.languages.jexl = {
  "string": /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
  "transform": {
    pattern: /(\|\s*)[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][\wа-яА-Я\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*/,
    alias: "function",
    lookbehind: true
  },
  "function": /[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][\wа-яА-Я\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*\s*(?=\()/,
  "number": /\b\d+(?:\.\d+)?\b|\B\.\d+\b/,
  "operator": /[<>!]=?|-|\+|&&|==|\|\|?|\/\/?|[?:*^%]/,
  "boolean": /\b(?:false|true)\b/,
  "keyword": /\bin\b/,
  "punctuation": /[{}[\](),.]/
};
//# sourceMappingURL=prismjs_components_prism-jexl.js.map
