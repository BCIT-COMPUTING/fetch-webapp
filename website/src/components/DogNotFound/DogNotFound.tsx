import styles from './DogNotFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return(
    <div>
      <p className={styles.text}>Please add sign up a dog</p>
      {/* TODO navigate to dog sign in */}
      <button className={styles.btn} onClick={() => navigate('/')}>SIGN IN DOG</button>
    </div>
  )
}

export default NotFound;