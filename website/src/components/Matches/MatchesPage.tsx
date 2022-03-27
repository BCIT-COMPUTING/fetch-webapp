import styles from './MatchesPage.module.css';
import { MatchInfo } from './data';
import { Link } from 'react-router-dom';

const MatchesPage = () => {
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