declare namespace AMap {
  class RoadInfoSearch {
    constructor(...opts: any);

    roadInfoSearchByRoadName(
      key: string,
      callback: (status: string, result: any) => void
    ): void;
  }
}
