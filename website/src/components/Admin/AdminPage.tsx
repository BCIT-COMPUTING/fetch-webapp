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
    deleteDog: 0,
    getDogByUserId: 0,
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
                <th>Description</th>
                <th># of hits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>POST</td>
                <td>/auth/register</td>
                <td>User registration</td>
                <td>{stats.postRegister}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/login</td>
                <td>User login</td>
                <td>{stats.postLogin}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/verifyJWT</td>
                <td>Verification of JSON Web Token</td>
                <td>{stats.postVerifyJWT}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/getDogs</td>
                <td>Get list of all dogs</td>
                <td>{stats.getDogs}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/dog/addDog</td>
                <td>Add a dog</td>
                <td>{stats.postAddDog}</td>
              </tr>
              <tr>
                <td>DELETE</td>
                <td>/dog/delete</td>
                <td>Delete dog</td>
                <td>{stats.deleteDog}❌</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/profile/:id</td>
                <td>Get a dog by User ID (example: going to Profile page)</td>
                <td>{stats.getDogByUserId}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/admin/stats</td>
                <td>Obtaining the stats of Fetch app</td>
                <td>{stats.getStats}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/admin/reset</td>
                <td>Reset stats of Fetch app</td>
                <td>{stats.postReset}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>❌ = NOT handled yet</p>
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
