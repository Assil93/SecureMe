import {MapUserToken} from "../models/mapUserToken";

export class Object2MapUserToken {

  public static mapUserToken: MapUserToken;
  public static mapsUserToken: MapUserToken[] = [];

  public static apply(object): MapUserToken {
    this.mapUserToken = {
      id: object.id,
      username: object.username,
      token: object.token
    }

    return this.mapUserToken;
  }

  public static applyOnArray(objects): MapUserToken[] {
    this.mapsUserToken = [];

    objects.forEach(object => {
      this.mapsUserToken.push(this.apply(object));
    });

    return this.mapsUserToken;
  }
}
