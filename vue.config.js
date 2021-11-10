module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/index.scss";`,
      },
    },
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
};
