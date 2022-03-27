import styles from "./DogInfoPage.module.css";
import { DogInfo } from "./data";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "../../store/appContext";

const DogInfoPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  useEffect(() => {
    if (user.isLoggedIn === false) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.btn}>Back</button>
      {DogInfo.map((dog) => (
        <div key={dog.name} className={styles.dogInfo}>
          <h2 className={styles.name}>{dog.name}</h2>
          <img className={styles.dogImg} src={dog.img} alt="dog image" />
          <h2 className={styles.title}>Description</h2>
          <p className={styles.info}>{dog.description}</p>
          <h2 className={styles.title}>
            Gender: <span className={styles.info}>{dog.gender}</span>
          </h2>
          <h2 className={styles.title}>
            Age: <span className={styles.info}>{dog.age} years old</span>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default DogInfoPage;
