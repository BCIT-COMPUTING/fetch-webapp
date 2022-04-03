import styles from './MatchesPage.module.css';
import { Link } from 'react-router-dom';
import { getDogByUserID } from '../../api/dogs';
import { 
  getAllLikesByEveryOne,
  getMatchByUserId
 } from '../../api/match';
import { useState, useEffect } from 'react';
import type { Match } from '../../api/match';
import type { Dog } from '../../api/dogs';


const MatchesPage = () => {

  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [myLikes, setMyLikes] = useState<Array<Dog>>([]);

  useEffect(() => {
    (async() => {
      const { likes } = await getMatchByUserId();
      console.log('my likes ' + likes);
      const allLikes = await getAllLikesByEveryOne();
      allLikes.forEach(async (dog: Match) => {
        let d = await getDogByUserID(dog.userId);
        console.log('dog id: ' + d._id);
        if(likes.includes(d._id)) {
          setDogs(dogs => dogs.concat(d));
        }
      })

    })();
  }, []);

  return(
    <>
      <div className={styles.matchPageContainer}>
        <div className={styles.matchContent}>
          <h1 className={styles.matchHeader}>Matches Page</h1>
          {dogs.map((match: Dog, index) => (
            <Link key ={index} to={{pathname: `/dog-info/${match._id}`}} state={match} >
              <div className={styles.matchItem}>
                <img className={styles.matchImage} src={match.photo} />
                <div className={styles.matchDescription}>
                  <div>
                    <h3>{match.name}</h3>
                    <p>Age: {match.age}</p>
                    <p>Sex: {match.gender}</p>
                  </div>
                  <div className={styles.matchDate}>
                    {/* <p>Date Matched: {match.dateMatched}</p> */}
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