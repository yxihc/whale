// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-cilkcpp.js
Prism.languages.cilkcpp = Prism.languages.insertBefore("cpp", "function", {
  "parallel-keyword": {
    pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
    alias: "keyword"
  }
});
Prism.languages["cilk-cpp"] = Prism.languages["cilkcpp"];
Prism.languages["cilk"] = Prism.languages["cilkcpp"];
//# sourceMappingURL=prismjs_components_prism-cilkcpp.js.map
