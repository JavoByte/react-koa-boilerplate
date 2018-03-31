/* eslint-disable global-require */
module.exports = () => ({
  plugins: [
    require('postcss-nested')(),
    require('postcss-nesting')(),
    // https://github.com/seaneking/rucksack
    require('rucksack-css')({
      autoprefixer: true,
    }),
  ],
});
