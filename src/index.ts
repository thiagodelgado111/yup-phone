import { StringSchema } from 'yup';
import * as gPhoneNumber from 'google-libphonenumber';

const phoneUtil = gPhoneNumber.PhoneNumberUtil.getInstance();

declare module 'yup' {
  export interface StringSchema {
    phone(countryCode?: string, strict?: boolean): StringSchema;
  }
}

const CLDR_REGION_CODE_SIZE = 2;

const isValidCountryCode = (countryCode: any): boolean => typeof countryCode === 'string' && countryCode.length === CLDR_REGION_CODE_SIZE;

export const YUP_METHOD = 'phone';
export default function phoneValidationMethod(
  this: StringSchema,
  countryCode?: string,
  strict: boolean = false,
) {
  const errMsg = isValidCountryCode(countryCode)
    ? `\${path} must be a valid phone number for region ${countryCode}`
    : '${path} must be a valid phone number.'; // eslint-disable-line no-template-curly-in-string

  return this.test(YUP_METHOD, errMsg, (value: string) => {
    if (!isValidCountryCode(countryCode)) {
      // if not valid countryCode, then set default country to India (IN)
      // eslint-disable-next-line no-param-reassign
      countryCode = 'US';
      // eslint-disable-next-line no-param-reassign
      strict = false;
    }

    let isValid;
    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(value, countryCode);
      if (!phoneUtil.isPossibleNumber(phoneNumber)) {
        return false;
      }

      const regionCodeFromPhoneNumber = phoneUtil.getRegionCodeForNumber(phoneNumber);

      /* check if the countryCode provided should be used as
       default country code or strictly followed
     */
      isValid = strict
        ? phoneUtil.isValidNumberForRegion(phoneNumber, countryCode)
        : phoneUtil.isValidNumberForRegion(phoneNumber, regionCodeFromPhoneNumber);
    } catch (error) {
      isValid = false;
    }

    return !!isValid;
  });
}
