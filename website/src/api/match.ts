import { getStorageValue } from '../store/localStorageHook';
import { getDogByUserID } from '../api/dogs';
import { publicRequest } from '../appConfigs';

const path = '/match';

interface Match {
  userId: String,
  likes: [String],
  dislikes: [String]
}

const getMatchByUserId = async () => {
  const { user: { _id }} = getStorageValue('user', '');
  const res = await publicRequest.get(`${path}/${_id}`);
  console.log(res.data);
  return <Match> res.data;
};

const addMatch = () => {
  const { user: { _id }} = getStorageValue('user', '');
  console.log(_id);
  publicRequest.post(`${path}/add`, {
    userId: _id
  }).then(res => console.log(res))
  .catch(err => console.log(err));
}

const addLikeToMatch = async (dogId: String) => {
  console.log('dogId like ' + dogId);
  const { user: { _id }} = getStorageValue('user', '');
  publicRequest.put(`${path}/addLikes/${_id}`, {
    dogId
  }).then(res => console.log(res.data))
  .catch(e => console.log(e));
};

const addDislikeToMatch = async (dogId: String) => {
  console.log('dogId dislike ' + dogId);
  const { user: { _id }} = getStorageValue('user', '');
  publicRequest.put(`${path}/addDislikes/${_id}`, {
    dogId
  }).then(res => console.log(res.data))
  .catch(e => console.log(e));
};

const checkMatchTableExist = async (id: string) => {
  const res = await publicRequest.get(`${path}/checkUser/${id}`);
  console.log(res.data.result);
  return res.data.result;
};

const getAllLikesByEveryOne = async () => {
  const { user: { _id }} = getStorageValue('user', '');
  const dog = await getDogByUserID(_id);
  const res = await publicRequest.get(`${path}/allLikes/${dog._id}`);
  return res.data;
};

export {
  getMatchByUserId,
  addLikeToMatch,
  addDislikeToMatch,
  addMatch,
  checkMatchTableExist,
  getAllLikesByEveryOne
}

export type { Match };