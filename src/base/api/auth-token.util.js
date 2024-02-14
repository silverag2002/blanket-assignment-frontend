import { isSSR } from "../constants/common.const";
import StorageUtil from "../utils/StorageUtil";
export class AuthTokenHandler {
  static setAccessToken(accessToken) {
    this.accessToken = accessToken;
    StorageUtil.set("Bearer", accessToken);
  }
  static getAccessToken() {
    if (isSSR) {
      return "";
    }
    this.accessToken = StorageUtil.get("Bearer");
    return this.accessToken;
  }

  static clearToken() {
    this.accessToken = "";
  }
}
AuthTokenHandler.accessToken = "";
