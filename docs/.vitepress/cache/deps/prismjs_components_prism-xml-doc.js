// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-xml-doc.js
(function(Prism2) {
  function insertDocComment(lang, docComment) {
    if (Prism2.languages[lang]) {
      Prism2.languages.insertBefore(lang, "comment", {
        "doc-comment": docComment
      });
    }
  }
  var tag = Prism2.languages.markup.tag;
  var slashDocComment = {
    pattern: /\/\/\/.*/,
    greedy: true,
    alias: "comment",
    inside: {
      "tag": tag
    }
  };
  var tickDocComment = {
    pattern: /'''.*/,
    greedy: true,
    alias: "comment",
    inside: {
      "tag": tag
    }
  };
  insertDocComment("csharp", slashDocComment);
  insertDocComment("fsharp", slashDocComment);
  insertDocComment("vbnet", tickDocComment);
})(Prism);
//# sourceMappingURL=prismjs_components_prism-xml-doc.js.map
