module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/proposal-prepper-web/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/e70e2__pnpm_87f691ea._.js",
  "chunks/[root-of-the-server]__201a7d2b._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/proposal-prepper-web/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];