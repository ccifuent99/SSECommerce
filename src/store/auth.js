import axios from "axios";
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "UPDATE_AUTH") {
    return {
      ...state,
      username: action.auth.username,
      firstName: action.auth.firstName,
      lastName: action.auth.lastName,
      email: action.auth.email,
      avatar: action.auth.avatar,
    };
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      const localCart = JSON.parse(window.localStorage.getItem("cart"));

      for (let lineItem of localCart.lineItems) {
        await axios.post(
          "/api/orders/cart",
          { product: lineItem.product, quantity: lineItem.quantity },
          {
            headers: { authorization: token },
          }
        );
      }

      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const adminLoginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth/isadmin", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const updateAuth = (account) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/register", account, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "UPDATE_AUTH", auth: response.data });
  };
};

export const adminAttemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/isadmin", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export default auth;
