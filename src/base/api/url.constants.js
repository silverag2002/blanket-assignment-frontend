export class URLConstants {}
//DEV
//URLConstants.BASE_URL = "http://localhost:4001";
//PROD
URLConstants.BASE_URL = "http://13.235.71.106/";

// AUTH ROUTES

URLConstants.login = () => `${URLConstants.BASE_URL}/v1/auth/login`;

URLConstants.register = () => `${URLConstants.BASE_URL}/v1/auth/register`;

// USER ROUTES
URLConstants.user = (userId) => `${URLConstants.BASE_URL}/v1/user/${userId}`;

URLConstants.fileUpload = (userId) =>
  `${URLConstants.BASE_URL}/v1/user/upload/${userId}`;

URLConstants.deleteImage = (userId) =>
  `${URLConstants.BASE_URL}/v1/user/delete-image/${userId}`;
