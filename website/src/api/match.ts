import axios from 'axios';
import { getStorageValue } from '../store/localStorageHook';

const endPointBaseUrl = 'http://localhost:8080/match';

interface Match {
  userId: String,
  likes: [String],
  dislikes: [String]
}

const getMatchByUserId = async (userId: String) => {
  const res = await axios.get(`${endPointBaseUrl}/match/${userId}`);
  return <Match> res.data;
};

const addLikeToMatch = async (dogId: String) => {
  const { user: { _id }} = getStorageValue('user', '');
  axios.post(`${endPointBaseUrl}/match/addLikes/${_id}`, {
    dogId
  }).then(res => console.log(res.data))
  .catch(e => console.log(e));
};

const addDislikeToMatch = async (dogId: String) => {
  const { user: { _id }} = getStorageValue('user', '');
  axios.post(`${endPointBaseUrl}/match/addDislikes/${_id}`, {
    dogId
  }).then(res => console.log(res.data))
  .catch(e => console.log(e));
};

export {
  getMatchByUserId,
  addLikeToMatch,
  addDislikeToMatch
}