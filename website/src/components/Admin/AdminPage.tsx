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
    postAddEditDog: 0,
    deleteDog: 0,
    getDogById: 0,
    getStats: 0,
    postReset: 0,
  });

  const hasCredentials = user.isLoggedIn && currentUser.isAdmin;

  const getStats = async () => {
    //pass token here
    await userRequest.get("/admin/stats").then(async (response) => {
      console.log(response.data[0]);
      await setStats(response.data[0]);
    });
  };

  const resetStats = async () => {
    //pass token here
    await userRequest.post("/admin/reset").then(async (response) => {
      console.log(response.data[0]);
      await setStats(response.data[0]);
    });
    await getStats();
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
                <td>{stats.postRegister}✅</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/login</td>
                <td>User login</td>
                <td>{stats.postLogin}✅</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/verifyJWT</td>
                <td>Verification of JSON Web Token</td>
                <td>{stats.postVerifyJWT}✅</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/getDogs</td>
                <td>Obtain dogs?</td>
                <td>{stats.getDogs}❌</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/dog/addEditDog</td>
                <td>Add/edit dog?</td>
                <td>{stats.postAddEditDog}❌</td>
              </tr>
              <tr>
                <td>POST???</td>
                <td>/dog/delete</td>
                <td>Delete dog</td>
                <td>{stats.deleteDog}❌</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/:id</td>
                <td>Get a dog by ID</td>
                <td>{stats.getDogById}❌</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/admin/stats</td>
                <td>Obtaining the stats of Fetch app</td>
                <td>{stats.getStats}✅</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/admin/reset</td>
                <td>Reset stats of Fetch app</td>
                <td>{stats.postReset}✅</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>✅ = handled this stat in the backend</p>
        <p>❌ = NOT handled yet</p>
        <input className={styles.resetBtn} type="button" value="Reset Stats" onClick={async () => {
          await resetStats();
          await getStats();
          }}
        />
      </div>
    </div>
  );
};

export default AdminPage;
