import styles from './MatchesPage.module.css';
import { MatchInfo } from './data';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMatchByUserId } from '../../api/match';
import axios from 'axios';
import { getStorageValue } from '../../store/localStorageHook';

interface Match {
  userId: String,
  likes: [String],
  dislikes: [String]
}

const endPointBaseUrl = 'http://localhost:8080/match';

const MatchesPage = () => {
  
  const [userInfo, setUserInfo] = useState({});
  
  const getMatchByUserId = async () => {
    const { user: { _id }} = getStorageValue('user', '');
    const res = await axios.get(`${endPointBaseUrl}/${_id}`);
    setUserInfo(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    console.log("use effect executed");
    getMatchByUserId();
  }, [])

  return(
    <>
      <div className={styles.matchPageContainer}>
        <div className={styles.matchContent}>
          <h1 className={styles.matchHeader}>Matches Page</h1>

          
          
          {MatchInfo.map((match) => (
            <Link to="/dogInfo">
              <div className={styles.matchItem}>
                <img className={styles.matchImage} src={match.image} />
                <div className={styles.matchDescription}>
                  <div>
                    <h3>{match.name}</h3>
                    <p>Age: {match.age}</p>
                    <p>Sex: {match.sex}</p>
                  </div>
                  <div className={styles.matchDate}>
                    <p>Date Matched: {match.dateMatched}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default MatchesPage;