import StorageUtil from "./StorageUtil";
export default class AppStorage extends StorageUtil {
  static setUserData(user) {
    return StorageUtil.set("user", user);
  }
  static getUserData() {
    return StorageUtil.get("user");
  }
}
