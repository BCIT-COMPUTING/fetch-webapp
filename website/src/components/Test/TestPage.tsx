
import { useAppContext } from "../../store/appContext";
import Nav from "../Nav/Nav";

const TestPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;

  return (
    <div>
      <Nav />
      TestPage: {isLoggedIn ? "T" : "F"}
      <button onClick={e => setState({isLoggedIn: !isLoggedIn})}>Change</button>
    </div>
  )
}

export default TestPage;