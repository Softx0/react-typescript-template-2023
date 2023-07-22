import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {AxiosCall} from "../domain";

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let powerController: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    const {controller} = axiosCall;

    if (controller) {
      powerController = controller;
    }

    setLoading(true);

    let result = {} as AxiosResponse<any>;

    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);

      throw err;
    }

    setLoading(false);

    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    powerController && powerController.abort();
  };

  useEffect(
    () => () => {
      cancelEndpoint();
    },
    []
  );

  return {loading, callEndpoint};
};

export default useFetchAndLoad;
