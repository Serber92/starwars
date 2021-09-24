export const initialState = {
  user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
  token: sessionStorage.getItem("token"),
  isAuthenticated: sessionStorage.getItem("user") ? true : false,
  page: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
