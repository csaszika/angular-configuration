### TSLINT

Add tslint to your rulesDirectory and extend base configuration:

```
{
  "rulesDirectory": [
    "node_modules/codelyzer",
    "node_modules/@otp/otp-angular-configuration/tslint"
  ],
  "extends": ["./node_modules/@otp/otp-angular-configuration/tslint.json"]
}
```
Usage in package.json:
```
"scripts": {
  "ts-lint": "ng lint"
  "lint": "npm run ts-lint && npm run other-linters"
}
```
Note:
The "lint" script will be called by CI then all linter scripts must be added.

### TSCONFIG

Extend base configuration:

```
{
  "extends": "./node_modules/@otp/otp-angular-configuration/tsconfig.json"
}
```

### STYLELINT

Extend base configuration:

```
{
  "extends": "@otp/otp-angular-configuration/stylelint"
}
```
Usage in package.json:
```
"scripts": {
  "lint-style": "stylelint \"src/**/*.ts\""
  "lint-style-fix": "stylelint \"src/**/*.ts\" --fix"
}
```

### PRETTIER

Create .prettierrc.js file and use base configuration:

```
const baseConfig = require('@otp/otp-angular-configuration/prettierrc');

module.exports = {
  ...baseConfig
};

```
Usage in package.json:
```
"scripts": {
  "prettier": "prettier --config .prettierrc.js --list-different \"src/**/*.ts\""
}
```

### COMMITLINT

```
module.exports = {
  extends: [
    '@otp/otp-angular-configuration/commitlint.config'
  ]
};
```
Usage in package.json:
```
"scripts": {
  "commitmsg": "commitlint -e $GIT_PARAMS"
}
```

### Check Developmenmt enviroment

With this script you can ensure that everyone will use the exact same version of node and npm.
(before an npm package install).

Copy the check-dev-env.js from the scripts folder into your project (into a scripts folder).
Usage in package.json:
```
"scripts": {
  "preinstall": "node ./scripts/check-dev-env nodeVersion=8.11 npmVersion=6.4.1",
}
```