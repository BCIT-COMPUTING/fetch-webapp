import styles from './MainPage.module.css';
import { useEffect, useState} from 'react';
import { getAllDogs } from '../../api/dogs'
import type { Dog } from '../../api/dogs';
import TinderCard from 'react-tinder-card';

const MainPage = () => {

  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [msg, setMsg] = useState('');
  const [lastDirection, setLastDirection] = useState('');

  const swiped = (direction:String, nameToDelete:String) => {
    if(direction === 'left') {
      setMsg(`You like ${nameToDelete}`);
    } else {
      setMsg(`You don't like ${nameToDelete}`);
    }
    setLastDirection(direction.toString())
  }

  const outOfFrame = (name:String) => {
    console.log(name);
  }

  useEffect(() => {
    (async() => {
      const allDogs = await getAllDogs();
      console.log(allDogs);
      setDogs(allDogs);
    })();
  }, []);

  return(
    <>
      { dogs.map((dog, index) =>
          <TinderCard className={styles.swipe}
                      key={index}
                      onSwipe={(dir) => swiped(dir, dog.name)}
                      onCardLeftScreen={() => outOfFrame(dog.name)}
                      >
          <div className={styles.cardDiv}
          style={ { backgroundColor: (dog.gender === 'female') ? 'rgb(229, 194, 200)' : 'rgb(126, 126, 212)' }} >
            <h2 className={styles.name}>{dog.name}</h2>
            <img className={styles.img}
                alt="dog image"
                src={dog.photo.toString()}/>
          </div>
        </TinderCard>
        )
      }
      <p className={styles.msg}>{msg}</p>
    </>
  )
};

export default MainPage;
