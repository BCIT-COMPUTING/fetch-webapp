import styles from "./AdminPage.module.css";
import { useState, useEffect } from "react";
import { useAppStore } from "../../store/appContext";
import { useNavigate } from "react-router";
import { userRequest } from "../../appConfigs";

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const currentUser = user.user;
  const [stats, setStats] = useState({
    postRegister: 0,
    postLogin: 0,
    postVerifyJWT: 0,
    getDogs: 0,
    postAddDog: 0,
    putEditDog: 0,
    deleteDog: 0,
    getDogByUserId: 0,
    getDogByDogId: 0,
    postCreateMatch: 0,
    putAddLikeById: 0,

    getStats: 0,
    postReset: 0,
  });

  const hasCredentials = user.isLoggedIn && currentUser.isAdmin;

  const getStats = async () => {
    //pass token here
    try {
      let response = await userRequest.get("/admin/stats");
      setStats(response.data[0]);
    } catch (e) {
      console.error(e);
    }
  };

  const resetStats = async () => {
    //pass token here
    try {
      let response = await userRequest.post("/admin/reset");
      await setStats(response.data[0]);
      getStats();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminContent}>
        <h2>Statistics - /api/v1</h2>
        <div className={styles.adminTableContent}>
          <table>
            <thead>
              <tr>
                <th>HTTP Method</th>
                <th>Endpoint</th>
                <th className={styles.adminDescriptions}>Description</th>
                <th># of hits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>POST</td>
                <td>/auth/register</td>
                <td className={styles.adminDescriptions}>User registers</td>
                <td>{stats.postRegister}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/login</td>
                <td className={styles.adminDescriptions}>User logs in</td>
                <td>{stats.postLogin}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/verifyJWT</td>
                <td className={styles.adminDescriptions}>Verification of JSON Web Token</td>
                <td>{stats.postVerifyJWT}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/getDogs</td>
                <td className={styles.adminDescriptions}>Get list of all dogs</td>
                <td>{stats.getDogs}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/dog/addDog</td>
                <td className={styles.adminDescriptions}>Add a dog</td>
                <td>{stats.postAddDog}</td>
              </tr>
              <tr>
                <td>PUT</td>
                <td>/dog/putEditDog</td>
                <td className={styles.adminDescriptions}>Edit a dog</td>
                <td>{stats.putEditDog}</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/dog/delete/:id</td>
                <td className={styles.adminDescriptions}>Delete a dog</td>
                <td>{stats.deleteDog}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/:id</td>
                <td className={styles.adminDescriptions}>Get a dog by dog ID (main) </td>
                <td>{stats.getDogByDogId} ✖</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/profile/:id</td>
                <td className={styles.adminDescriptions}>Get a dog by User ID (example: going to Profile page)</td>
                <td>{stats.getDogByUserId}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/match/add</td>
                <td className={styles.adminDescriptions}>Create a match? (main)</td>
                <td>{stats.postCreateMatch} ✖</td>
              </tr>
              <tr>
                <td>PUT</td>
                <td>/match/addLikes/:id</td>
                <td className={styles.adminDescriptions}>Add a like by ID (main)</td>
                <td>{stats.putAddLikeById} ✖</td>
              </tr>
              
              <tr>
                <td>GET</td>
                <td>/admin/stats</td>
                <td className={styles.adminDescriptions}>Get the stats of Fetch app</td>
                <td>{stats.getStats}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/admin/reset</td>
                <td className={styles.adminDescriptions}>Reset stats of Fetch app</td>
                <td>{stats.postReset}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <input className={styles.resetBtn} type="button" value="Reset Stats" onClick={async () => {
          await resetStats();
          getStats();
          }}
        />
      </div>
    </div>
  );
};

export default AdminPage;
