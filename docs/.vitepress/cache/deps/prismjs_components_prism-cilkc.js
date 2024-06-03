// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-cilkc.js
Prism.languages.cilkc = Prism.languages.insertBefore("c", "function", {
  "parallel-keyword": {
    pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
    alias: "keyword"
  }
});
Prism.languages["cilk-c"] = Prism.languages["cilkc"];
//# sourceMappingURL=prismjs_components_prism-cilkc.js.map
