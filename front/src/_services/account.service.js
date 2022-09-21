let saveToken = (token, userId, email) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

let getToken = () => {
  return localStorage.getItem("token");
};

let getUserId = () => {
  return localStorage.getItem("userId");
}

let getUserEmail = () => {
  return localStorage.getItem("email");
}
export const accountService = {
  saveToken,
  logout,
  isLogged,
  getToken,
  getUserId,
  getUserEmail
};
