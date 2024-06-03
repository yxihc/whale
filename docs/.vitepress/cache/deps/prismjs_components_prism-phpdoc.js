// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-phpdoc.js
(function(Prism2) {
  var typeExpression = /(?:\b[a-zA-Z]\w*|[|\\[\]])+/.source;
  Prism2.languages.phpdoc = Prism2.languages.extend("javadoclike", {
    "parameter": {
      pattern: RegExp("(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + typeExpression + "\\s+)?)\\$\\w+"),
      lookbehind: true
    }
  });
  Prism2.languages.insertBefore("phpdoc", "keyword", {
    "class-name": [
      {
        pattern: RegExp("(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" + typeExpression),
        lookbehind: true,
        inside: {
          "keyword": /\b(?:array|bool|boolean|callback|double|false|float|int|integer|mixed|null|object|resource|self|string|true|void)\b/,
          "punctuation": /[|\\[\]()]/
        }
      }
    ]
  });
  Prism2.languages.javadoclike.addSupport("php", Prism2.languages.phpdoc);
})(Prism);
//# sourceMappingURL=prismjs_components_prism-phpdoc.js.map
