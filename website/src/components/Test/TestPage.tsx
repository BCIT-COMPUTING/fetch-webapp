
import { useAppContext } from "../../store/appContext";

const TestPage = () => {

  const { state, setState } = useAppContext();
  const { isLoggedIn } = state;

  return (
    <div>
      TestPage: {isLoggedIn ? "T" : "F"}
      <button onClick={e => setState({isLoggedIn: !isLoggedIn})}>Change</button>
    </div>
  )
}

export default TestPage;