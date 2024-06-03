// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-jsonp.js
Prism.languages.jsonp = Prism.languages.extend("json", {
  "punctuation": /[{}[\]();,.]/
});
Prism.languages.insertBefore("jsonp", "punctuation", {
  "function": /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/
});
//# sourceMappingURL=prismjs_components_prism-jsonp.js.map
