
import { useAppStore } from "../../store/appContext";

const TestPage = () => {

  const { state, setState } = useAppStore();
  const { isLoggedIn } = state;

  return (
    <div>
      TestPage: {isLoggedIn ? "T" : "F"}
      <button onClick={e => setState({isLoggedIn: !isLoggedIn})}>Change</button>
    </div>
  )
}

export default TestPage;