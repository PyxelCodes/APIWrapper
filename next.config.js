/* eslint-disable global-require */
module.exports = {
    distDir: 'build',
    darkMode: "class",
    future: {
      webpack5: true,
    },
    purge: {
      content: ["./src/**/*.tsx", "./public/index.html"],
      options: {
        safelist: ["h-8", "h-11"],
      },
    }
  };