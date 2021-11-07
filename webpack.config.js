vocabulary = require('./src/vocabulary').vocabulary;
extractLanguage = require('./src/vocabulary').extractLanguage;
const { nanoid } = require("nanoid");
const versionPostfix = `_${nanoid()}`;

// Webpack configuration

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const fs = require("fs");

const templatesUrl = path.resolve(__dirname, './src/pages/templates/');

module.exports = {
  entry: {
    index: './src/index.js',
    checkLocalSettings: './src/checkLocalSettings.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `js/[name]${versionPostfix}.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/favicon/", to: "assets/" },
        { from: "src/scripts/vendor/", to: "assets/" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: `css/styles${versionPostfix}.css`
    }),
    ...getPlugins(
      [
        'index',
        'services',
        'services__mobile-apps',
        'services__information-systems',
        'career',
        'career__back-end-developer',
        'team',
        'fundamentals',
        'request-was-succesfully-sent',
      ]
    ),
  ],
};

function getPlugins(pageNames) {
  const allLanguages = [];
  pageNames.forEach((name) => {
    ['cs', 'en']
      .forEach((language) => allLanguages.push(
        new HtmlWebpackPlugin(getOptions(name, language))
      ));
  });
  return allLanguages;
};

function getOptions(pageName, language) {
  const parentPage = pageName.split('__').length > 1 && pageName.split('__')[0];
  const backButtonUrl = parentPage
    ? language === 'cs' ? `/${parentPage}.html` : `/${parentPage}_en.html`
    : language === 'cs' ? '/' : '/index_en.html';

  return {
    filename: pageName + (language === 'cs' ? '' : `_en`) + '.html',
    template: `./src/pages/${pageName}.html`,
    vocabulary: extractLanguage(language),
    backButtonUrl,
    languagePostfix: language === 'en' ? '_en' : '',
    head: fs.readFileSync(`${templatesUrl}/head.html`)
      + `<link rel="stylesheet" href="css/styles${versionPostfix}.css">
        <title data-vocabulary="1">${vocabulary[1][language]}</title>
        </head>`,
    header: fs.readFileSync(`${templatesUrl}/head.html`)
      + `<script src="js/checkLocalSettings${versionPostfix}.js"></script>
      <link rel="stylesheet" href="css/styles${versionPostfix}.css">
      <title data-vocabulary="1">${vocabulary[1][language]}</title>
      </head>`
      + `<body class="${pageName}Page">`
      + fs.readFileSync(`${templatesUrl}/header-start.html`)
      + `<nav class="topNav">
      <ul class="topNavList">
        <li class="topNavList__item ${pageName === 'index' ? 'topNavList__youAreHereItem' : ''}">
          <a data-vocabulary="2"
          ${pageName !== 'index' ? 'href="' + (language !== 'en' ? '/"' : 'index_en.html"') : ''}
          >
            ${vocabulary['2'][language]}
          </a>
        </li>
        <li class="topNavList__item ${pageName === 'services' ? 'topNavList__youAreHereItem' : ''}">
          <a data-vocabulary="3"
          ${pageName !== 'services' ? 'href="' + (language !== 'en' ? '/#whatWeCanDo"' : 'index_en.html#whatWeCanDo"') : ''}
          >
             ${vocabulary['3'][language]}
          </a>
        </li>
        <li class="topNavList__item ${pageName === 'career' ? 'topNavList__youAreHereItem' : ''}">
          <a data-vocabulary="4"
            ${pageName !== 'career' ? 'href="' + (language !== 'en' ? 'career.html"' : 'career_en.html"') : ''}
          >
             ${vocabulary['4'][language]}
          </a>
        </li>
        <li class="topNavList__item ${pageName === 'team' ? 'topNavList__youAreHereItem' : ''}">
          <a data-vocabulary="5"
          ${pageName !== 'team' ? 'href="' + (language !== 'en' ? '/#whoWeAre"' : 'index_en.html#whoWeAre"') : ''}
          >
             ${vocabulary['5'][language]}
          </a>
        </li>
        <li class="topNavList__item ${pageName === 'fundamentals' ? 'topNavList__youAreHereItem' : ''}">
          <a data-vocabulary="6"
          ${pageName !== 'fundamentals' ? 'href="' + (language !== 'en' ? '/#fundamentals"' : 'index_en.html#fundamentals"') : ''}
          >
              ${vocabulary['6'][language]}
          </a>
        </li>
        <li class="topNavList__item">
          <a data-vocabulary="7" 
            class="topNavList__languageSwitcher ${language !== 'en' ? 'english' : ''}"
            href="${language === 'en' ? pageName + '.html' : pageName + '_en.html'}"
          >
              ${vocabulary['7'][language]}
          </a>
        </li>
        <li class="topNavList__item">
          <a href="${language !== 'en' ? '/#contactForm' : 'index_en.html#contactForm'}" data-vocabulary="8" class="topNavList__accentedItem">
              ${vocabulary['8'][language]}
          </a>
        </li>
      </ul>
    </nav>
    </header>`,
    footer: fs.readFileSync(`${templatesUrl}/footer.html`)
      + `<script src="js/index${versionPostfix}.js"></script>
      </body>
      </html>`,
    minify: { removeComments: true },
    inject: false
  };
};