// ../node_modules/.pnpm/prismjs@1.29.0/node_modules/prismjs/components/prism-php-extras.js
Prism.languages.insertBefore("php", "variable", {
  "this": {
    pattern: /\$this\b/,
    alias: "keyword"
  },
  "global": /\$(?:GLOBALS|HTTP_RAW_POST_DATA|_(?:COOKIE|ENV|FILES|GET|POST|REQUEST|SERVER|SESSION)|argc|argv|http_response_header|php_errormsg)\b/,
  "scope": {
    pattern: /\b[\w\\]+::/,
    inside: {
      "keyword": /\b(?:parent|self|static)\b/,
      "punctuation": /::|\\/
    }
  }
});
//# sourceMappingURL=prismjs_components_prism-php-extras.js.map
