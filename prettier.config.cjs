/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],

  overrides: [
    {
      files: 'realm/**/*.json',
      options: {
        tabWidth: 4,
      },
    },
    {
      files: 'realm/data_sources/**/*.json',
      options: {
        printWidth: 20, // To force wrapping arrays
      },
    },
  ],
}
