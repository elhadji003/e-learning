export const API_URL = "http://localhost:8765/api";
export const API_URL_PWD = "http://localhost:8765/api/password";
export const API_STORAGE = "http://localhost:8765/api/storage"
export const API_COURS = "http://localhost:8765/api/courses"

export const LOGIN_ROUTE = `${API_URL}/login`;
export const REGISTER_ROUTE = `${API_URL}/register`;
export const GET_ME_ROUTE = `${API_URL}/me`;
export const DELETE_ME_ACCOUNT_ROUTE = `${API_URL}/deleteMeAccount`;
export const GET_USERS_ROUTE = `${API_URL}/users`;
export const GET_ME_BY_ROUTE = `${API_URL}/users`;
export const UPDATE_USER_ROUTE = `${API_URL}/update`;
export const DELETE_USER_ROUTE = `${API_URL}/delete`;
export const REFRESH_TOKEN_ROUTE = `${API_URL}/refresh-token`;
export const UPDATE_PASSWORD_ROUTE = `${API_URL}/updatePwd`

//cours
export const POST_COURS_ROUTE = `${API_COURS}/cour`;
export const GET_COURS_ROUTE = `${API_COURS}/cours`;
export const PUT_COURS_ROUTE = `${API_COURS}/cour`;
export const DELETE_COURS_ROUTE = `${API_COURS}/cour`;


// Mot e passe
export const FORGOTPWD_ROUTE = `${API_URL_PWD}/forgotPassword`;
export const RESETPWD_ROUTE = `${API_URL_PWD}/resetPassword`;

// Storage image
export const UPDATE_PROFILE_IMAGE_ROUTE = `${API_STORAGE}/profileImage`;
export const GET_PROFILE_BY_ID_ROUTE = `${API_STORAGE}/profile`;





