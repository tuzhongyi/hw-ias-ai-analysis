declare namespace AMap {
  interface GeocoderOptions {
    city?: string | number;
    radius?: number;
    extensions?: 'base' | 'all';
  }

  interface GeocoderAddressComponent {
    province?: string;
    city?: string | string[];
    district?: string;
    township?: string;
    neighborhood?: { name: string };
    building?: { name: string };
    street?: string;
    streetNumber?: string;
    adcode?: string;
    citycode?: string;
  }

  interface GeocoderResult {
    info: string;
    regeocode?: {
      formattedAddress: string;
      addressComponent: GeocoderAddressComponent;
    };
    geocodes?: Array<{
      formattedAddress: string;
      location: LngLat;
      adcode?: string;
    }>;
  }

  class Geocoder {
    constructor(options?: GeocoderOptions);

    getAddress(
      location: LngLat | [number, number],
      callback: (status: string, result: GeocoderResult) => void
    ): void;

    getLocation(
      address: string,
      callback: (status: string, result: GeocoderResult) => void
    ): void;
  }
}
