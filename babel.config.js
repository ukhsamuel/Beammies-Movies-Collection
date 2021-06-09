module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // or "entry"
        corejs: '3.0.0',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'],
};
