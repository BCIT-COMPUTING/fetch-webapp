import styles from './DogCard.module.css';

const DogCard = (props: { data: {
            dogName: string;
            dogPhoto: string;
            dogBreed: string;
            dogDescription: string;
            dogGender: string;
            dogAge: number; } }) => {
  const {
    dogName,
    dogPhoto,
    dogBreed,
    dogDescription,
    dogGender,
    dogAge,
  } = props.data;
  return (
    <div className={styles.dogInfo}>
      <h2 className={styles.name}>{dogName}</h2>
      <img className={styles.dogImg} src={dogPhoto} alt="dog imdogAge" />
      <div className={styles.descDiv}>
        <h2 className={styles.title}>Description</h2>
        <p className={`${styles.info} ${styles.desc}`}>{dogDescription}</p>
      </div>
      <div className={styles.otherInfo}>
        <h2 className={styles.title}>
          Age: <span className={styles.info}>{dogAge} years old</span>
        </h2>
        <h2 className={styles.title}>Breed: <span className={styles.info}>{dogBreed}</span></h2>
        <h2 className={styles.title}>
          Gender: <span className={styles.info}>{dogGender}</span>
        </h2>

      </div>
    </div>
  )
}

export default DogCard;