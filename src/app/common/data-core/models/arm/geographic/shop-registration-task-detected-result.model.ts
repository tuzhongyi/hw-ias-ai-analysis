import { ShopRegistration } from './shop-registration.model';

export class ShopRegistrationTaskDetectedResult extends ShopRegistration {
  /**	Boolean	是否检测到，true：检测到的，false：未检测到	O	R */
  Detected?: boolean;
}
