import styles from './MatchesPage.module.css';
import { MatchInfo } from './data';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorageValue } from '../../store/localStorageHook';

// interface Match {
//   userId: String,
//   likes: [String],
//   dislikes: [String]
// }

const endPointBaseUrl = 'http://localhost:8080/match';

const MatchesPage = () => {
  
  const [userInfo, setUserInfo] = useState({});
  const [likes, setLikes] = useState([]);
  
  const getMatchByUserId = async () => {
    try {
      const { user: { _id }} = await getStorageValue('user', '');
      const res = await axios.get(`${endPointBaseUrl}/${_id}`);

      if (res.status === 200) {
        await setUserInfo(res.data);
        console.log(userInfo);

        await setLikes(res.data.likes);
        console.log(res.data.likes);
      }

      await getMatches(res.data.likes);

    } catch (e) {
      console.error(e);
    }
  };

  const getMatches = async (usersLiked: any) => {
    try {
      const res = await axios.post(`${endPointBaseUrl}/checkLikes`, {
        likes: usersLiked
      })
      if (res.status === 200) {
        console.log("got 200 from checkLikes");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log("use effect executed");
    getMatchByUserId();


  }, [])

  return(
    <>
      <div className={styles.matchPageContainer}>
        <div className={styles.matchContent}>
          <h1 className={styles.matchHeader}>Matches Page</h1>

          {likes.map((userId) => (
            <div key={userId}>
              {userId}
            </div>
          ))}
          
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