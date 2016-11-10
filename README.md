# typescript-express-passportjs
ExpressJS template project uses TypeScript, Moongose, Continuous Integration [CircleCI.io](https://circleci.com/) and Code Coverage [CodeCov.io](https://codecov.io)

[![codecov](https://codecov.io/gh/thanhtruong0315/typescript-express-passportjs/branch/master/graph/badge.svg)](https://codecov.io/gh/thanhtruong0315/typescript-express-passportjs)
[![CircleCI](https://circleci.com/gh/thanhtruong0315/typescript-express-passportjs/tree/master.svg?style=shield)](https://circleci.com/gh/thanhtruong0315/typescript-express-passportjs/tree/master)

### Node.js version >= 4.0
### Typescript@2.0.7 

Run npm install:
```shell
npm install -g typescript nodemon mocha nyc codecov
npm install
```

Test:
```shell
npm test
```

Start Server:
```shell
cd src
node App.js
```

How to change mongodb database URL
* Open [src/Services/Database](https://github.com/thanhtruong0315/typescript-express-passportjs/blob/master/src/Services/Database.ts)
* Change URL
```
mongoose.connect('<YOUR-DATABASE-URL>');
```
Generate Secret Key in *Config* folder.
=============
```
$ ssh-keygen
$ openssl rsa -in private_key_filename -pubout -outform PEM -out public_key_output_filename
```
