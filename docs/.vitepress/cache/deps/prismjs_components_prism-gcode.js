// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-gcode.js
Prism.languages.gcode = {
  "comment": /;.*|\B\(.*?\)\B/,
  "string": {
    pattern: /"(?:""|[^"])*"/,
    greedy: true
  },
  "keyword": /\b[GM]\d+(?:\.\d+)?\b/,
  "property": /\b[A-Z]/,
  "checksum": {
    pattern: /(\*)\d+/,
    lookbehind: true,
    alias: "number"
  },
  // T0:0:0
  "punctuation": /[:*]/
};
//# sourceMappingURL=prismjs_components_prism-gcode.js.map
