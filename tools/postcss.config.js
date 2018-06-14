/* eslint-disable global-require */
module.exports = () => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-nested')(),
    require('postcss-nesting')(),
    require('postcss-custom-properties')(),
    require('postcss-inherit')(),
    // https://github.com/seaneking/rucksack
    require('rucksack-css')({
      autoprefixer: true,
    }),
  ],
});
