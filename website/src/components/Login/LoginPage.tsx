
import { useAppContext } from "../../store/appContext";

const LoginPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;

  return (
    <div>
      LoginPage: {isLoggedIn ? "T" : "F"}
      <button onClick={e => setState({isLoggedIn: !isLoggedIn})}>Change</button>
    </div>
  )
}

export default LoginPage;