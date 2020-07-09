import { StringSchema } from 'yup';
declare module 'yup' {
    interface StringSchema {
        phone(countryCode?: string, strict?: boolean): StringSchema;
    }
}
declare const YUP_METHOD = "phone";
declare function phoneValidationMethod(this: StringSchema, countryCode?: string, strict?: boolean): StringSchema<string>;
export { YUP_METHOD, phoneValidationMethod as default };
