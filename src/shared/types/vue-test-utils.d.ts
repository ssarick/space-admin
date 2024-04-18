import { DOMWrapper } from '@vue/test-utils';

declare module '@vue/test-utils' {
  export declare class VueWrapper {
    /**
     * @method findByTestId
     * @description Custom DOMWrapper search method for the "data-test" attribute
     */
    findByTestId: <T extends Node>(testId: string) => DOMWrapper<T>;
  }
}