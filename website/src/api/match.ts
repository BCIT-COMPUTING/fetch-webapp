import { getStorageValue } from "../store/localStorageHook";
import { getDogByUserID } from "../api/dogs";
import { publicRequest, endPointBaseUrl } from "../appConfigs";
const path = "/match";

interface Match {
  userId: String;
  likes: [String];
  dislikes: [String];
  viewed: [String];
}

const getMatchByUserId = async (_id: string) => {
  console.log("match userId " + _id);
  const res = await publicRequest.get(`${path}/${_id}`);
  console.log(JSON.stringify(res.data));
  return <Match>res.data[0] || [];
};

const addMatch = async () => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  try {
    const res = await publicRequest.post(`${path}/add`, {
      userId: _id,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addLikeToMatch = async (dogId: String) => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  publicRequest
    .put(`${path}/addLikes/${_id}`, {
      dogId,
    })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
};

const addViewedToMatch = async (dogId: String) => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  publicRequest
    .put(`${path}/addView/${_id}`, {
      dogId,
    })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
};

const addDislikeToMatch = async (dogId: String) => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  publicRequest
    .put(`${path}/addDislikes/${_id}`, {
      dogId,
    })
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
};

const checkMatchTableExist = async (id: string) => {
  const res = await publicRequest.get(`${path}/checkUser/${id}`);
  return res.data.result;
};

const getAllLikesByEveryOne = async () => {
  const {
    user: { _id },
  } = getStorageValue("user", "");
  const dog = await getDogByUserID(_id);
  const res = await publicRequest.get(`${path}/allLikes/${dog._id}`);
  return res.data || [];
};

export {
  getMatchByUserId,
  addLikeToMatch,
  addDislikeToMatch,
  addMatch,
  checkMatchTableExist,
  getAllLikesByEveryOne,
  addViewedToMatch,
};

export type { Match };
