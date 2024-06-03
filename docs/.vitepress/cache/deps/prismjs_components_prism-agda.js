// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-agda.js
(function(Prism2) {
  Prism2.languages.agda = {
    "comment": /\{-[\s\S]*?(?:-\}|$)|--.*/,
    "string": {
      pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
      greedy: true
    },
    "punctuation": /[(){}⦃⦄.;@]/,
    "class-name": {
      pattern: /((?:data|record) +)\S+/,
      lookbehind: true
    },
    "function": {
      pattern: /(^[ \t]*)(?!\s)[^:\r\n]+(?=:)/m,
      lookbehind: true
    },
    "operator": {
      pattern: /(^\s*|\s)(?:[=|:∀→λ\\?_]|->)(?=\s)/,
      lookbehind: true
    },
    "keyword": /\b(?:Set|abstract|constructor|data|eta-equality|field|forall|hiding|import|in|inductive|infix|infixl|infixr|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\b/
  };
})(Prism);
//# sourceMappingURL=prismjs_components_prism-agda.js.map
