import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { getAllDogs,
  getDogByUserID } from "../../api/dogs";
import type { Dog } from "../../api/dogs";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import {
  addLikeToMatch,
  addDislikeToMatch,
  addMatch,
  addViewedToMatch,
  getMatchByUserId,
  checkMatchTableExist
} from "../../api/match";
import { useAppStore } from "../../store/appContext";

const MainPage = () => {
  const { user, setUser } = useAppStore();
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [msg, setMsg] = useState("Start Swiping!");
  const [lastDirection, setLastDirection] = useState("");
  const [myList, setMyList] = useState<Array<String>>([]);

  const navigate = useNavigate();

  const swiped = (dogId: String, direction: String, nameToDelete: String) => {
    addViewedToMatch(dogId);
    if (direction === "left") {
      addLikeToMatch(dogId);
      setMsg(`You liked ${nameToDelete} :)`);
    } else {
      console.log("dislike dogID " + dogId);
      addDislikeToMatch(dogId);
      setMsg(`You disliked ${nameToDelete} :(`);
    }
    setLastDirection(direction.toString());
  };

  const outOfFrame = (name: String) => {
  };

  useEffect(() => {
    (async () => {
      const { _id } = await getDogByUserID(user.user._id);
      const allDogs = await getAllDogs(user.user._id);
      const checkTable = await checkMatchTableExist(user.user._id);
      const {
        viewed = [] as String[] || []
      } = await getMatchByUserId(user.user._id);
      if (!checkTable) {
        await addMatch();
        allDogs.forEach((d) => {
          setDogs((dogs) => dogs.concat(d));
        });
      } else {
        allDogs.forEach((d) => {
          if (!viewed.includes(d._id)) {
            setDogs((dogs) => dogs.concat(d));
          }
        });
      }
      setMyList(viewed);
    })();
  }, []);

  return (
    <>
      <div className={styles.mainPageContainer} >
        <h1 className={styles.mainHeader}>{msg}</h1>
        <button onClick={() => navigate("/match")} className={styles.matchBtn}>
          Go To Match
        </button>
        {dogs.map((dog, index) => (
          <TinderCard
            className={styles.swipe}
            key={index}
            onSwipe={(dir) => swiped(dog._id, dir, dog.name)}
            onCardLeftScreen={() => outOfFrame(dog.name)}
          >
            <div
              className={styles.cardDiv}
              style={{
                backgroundColor:
                  dog.gender === "female" ? "rgb(229, 194, 200)" : "#0096FF",
              }}
            >
              <h2 className={styles.name}>{dog.name}</h2>
              <img
                className={styles.img}
                alt="dog image"
                src={dog.photo.toString()}
              />
              <p><b>Age:</b> {dog.age}</p>
              <p><b>Gender:</b> {dog.gender}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </>
  );
};

export default MainPage;
