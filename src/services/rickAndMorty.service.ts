import axios from "axios";
import {User} from "../domain";
import {loadAbort} from "../utils/helpers";

export const login = () => {
  const URL_BASE = `${import.meta.env.VITE_REACT_APP_API_URL}`;
  const controller = loadAbort();

  return {
    call: axios.get<User>(URL_BASE, {signal: controller.signal}),
    controller
  };
};
