// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": ["eslint:recommended"],
  "plugins": [],
  "rules": {
    "semi": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "no-multi-assign": "off",
    "consistent-return": "off",
    "no-return-assign": "off",
    "arrow-parens": "off",
    "arrow-body-style":"off",
    "prefer-promise-reject-errors": "off",
    "no-unused-expressions": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "no-bitwise": "off",
    "linebreak-style": "off",
    "prefer-arrow-callback": "off",
    "func-names": "off",
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    "prefer-destructing": "off",
    "no-console": "off",
    "no-trailing-spaces": "off",
    "no-useless-escape ": "off",
    "no-mixed-operators": "off",
    "no-plusplus": "off"
  },
  "globals": {

  },
}
