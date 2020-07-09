# yup-phone [![MIT License](https://img.shields.io/badge/-MIT-56A902.svg?style=flat-square&maxAge=2592000 'MIT License')](LICENSE)

Adds a phone number validation check to yup validator using [**google-libphonenumber**](https://www.npmjs.com/package/google-libphonenumber) which gives accurate validation checks.  
Read more here [_libphonenumber_](https://github.com/googlei18n/libphonenumber/blob/master/README.md#readme).

## Install

```sh
$ npm install --save yup-phone
```

## Usage

```js
import * as yup from 'yup';
import phoneValidationMethod, { YUP_METHOD } from 'yup-phone';

yup.addMethod(yup.string, PHONE_METHOD, phoneValidation);

// validate any phone number (defaults to US)
const phoneSchema = yup
  .string()
  .phone()
  .required();
phoneSchema.isValid('9876543210'); // → true
```

```js
import * as yup from 'yup';
import phoneValidationMethod, { YUP_METHOD } from 'yup-phone';

// validate phone number loosely in the given region
const phoneSchema = Yup.string()
  .phone('IN')
  .required();
phoneSchema.isValid('+919876543210'); // → true
```

```js
import * as yup from 'yup';
import phoneValidationMethod, { YUP_METHOD } from 'yup-phone';

// validate phone number strictly in the given region
const phoneSchema = Yup.string()
  .phone('IN', true)
  .required();
phoneSchema.isValid('+919876543210'); // → true
```

For more, check [yup-phone.test.ts](src/__tests__/yup-phone.test.ts) file.

### Contributing

- Uses Rollup for bundling.
- Files are minified using closure compiler.
- Uses jest for testing.
- Generates CJS, UMD, and ESM builds.

```sh
$ npm run build # Build for production
$ npm run test # Run tests
```

### Acknowledgement

This is a fork of https://github.com/abhisekp/yup-phone

## License

[MIT](LICENSE).
