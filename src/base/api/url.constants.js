export class URLConstants {}

URLConstants.BASE_URL = "http://localhost:4001";

// AUTH ROUTES

URLConstants.login = () => `${URLConstants.BASE_URL}/v1/auth/login`;

URLConstants.register = () => `${URLConstants.BASE_URL}/v1/auth/register`;

// USER ROUTES
URLConstants.user = (userId) => `${URLConstants.BASE_URL}/v1/user/${userId}`;
