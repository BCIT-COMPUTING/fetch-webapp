import axios from 'axios';
import { getStorageValue } from '../store/localStorageHook';

const endPointBaseUrl = 'http://localhost:8080/match';

interface Match {
  userId: String,
  likes: [String],
  dislikes: [String]
}

const getMatchByUserId = async () => {
  const { user: { _id }} = getStorageValue('user', '');
  const res = await axios.get(`${endPointBaseUrl}/${_id}`);
  console.log(res.data);
  return <Match> res.data;
};

const addMatch = () => {
  const { user: { _id }} = getStorageValue('user', '');
  console.log(_id);
  axios.post(`${endPointBaseUrl}/add`, {
    userId: _id
  }).then(res => console.log(res))
  .catch(err => console.log(err));
}

const addLikeToMatch = async (dogId: String) => {
  const { user: { _id }} = getStorageValue('user', '');
  axios.put(`${endPointBaseUrl}/addLikes/${_id}`, {
    dogId
  }).then(res => console.log(res.data))
  .catch(e => console.log(e));
};

const addDislikeToMatch = async (dogId: String) => {
  const { user: { _id }} = getStorageValue('user', '');
  axios.put(`${endPointBaseUrl}/addDislikes/${_id}`, {
    dogId
  }).then(res => console.log(res.data))
  .catch(e => console.log(e));
};

export {
  getMatchByUserId,
  addLikeToMatch,
  addDislikeToMatch,
  addMatch
}