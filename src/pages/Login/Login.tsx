import {useDispatch, useSelector} from "react-redux";
import {createUserAdapter} from "../../adapters";
import {useFetchAndLoad} from "../../hooks";
import {createUser, modifyUser} from "../../redux/states/user";
import {AppStore} from "../../redux/store";
import {login} from "../../services/rickAndMorty.service";
import "./Login.css";

export const Login = () => {
  const {loading, callEndpoint} = useFetchAndLoad();

  // Esta es la manera con redux, obtener la data del estado dentro de la aplicacion,
  // Cuando se modifique se va a actualizar.
  const userState = useSelector((store: AppStore) => store.user);

  const stateModifyName = {
    name: "Gentleman"
  };

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const morty = await callEndpoint(login());

    dispatch(createUser(createUserAdapter(morty)));
  };

  const handleModify = async () => {
    dispatch(modifyUser(stateModifyName));
  };

  return (
    <>
      {loading ? (
        <div>
          <h3>LOADING...</h3>
        </div>
      ) : (
        <div>
          <button className="button" onClick={handleLogin}>
            GET ME MORTY!
          </button>
          <button className="button" onClick={handleModify}>
            MODIFY MORTY!
          </button>
          <div>
            <div>{JSON.stringify(userState)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
