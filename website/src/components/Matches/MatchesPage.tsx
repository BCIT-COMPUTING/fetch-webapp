import styles from "./MatchesPage.module.css";
import { Link } from "react-router-dom";
import { getDogByUserID } from "../../api/dogs";
import { getAllLikesByEveryOne, getMatchByUserId } from "../../api/match";
import { useState, useEffect } from "react";
import type { Match } from "../../api/match";
import type { Dog } from "../../api/dogs";
import { useAppStore } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

const MatchesPage = () => {
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const { user } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { userId, likes } = await getMatchByUserId(user.user._id);
      const allLikes = await getAllLikesByEveryOne();
      allLikes.forEach(async (dog: Match) => {
        const d = await getDogByUserID(dog.userId);
        if (likes !== undefined) {
          if (likes.includes(d._id) && userId !== d.userID) {
            setDogs((dogs) => dogs.concat(d));
          }
        }
      });
    })();
  }, []);

  return (
    <>
      <div className={styles.matchPageContainer}>
        <div className={styles.matchContent}>
          {
            (dogs.length === 0) ? 
            <div className={styles.msgDiv}>
              <h2 className={styles.msgText}>No Match Found</h2>
              <button className={styles.btn} onClick={() => navigate("/main")}>Go to Main</button>
            </div>
          :
            <h1 className={styles.matchHeader}>Matches Page</h1>
          }
          { dogs &&
          dogs.map((match: Dog, index) => (
            <Link
              key={index}
              to={{ pathname: `/dog-info/${match._id}` }}
              state={match}
            >
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
  );
};

export default MatchesPage;
