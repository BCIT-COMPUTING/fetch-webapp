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
    numOfSuccessfulLogins: 0,
    numOfFailedLogins: 0,
    numOfLoginAttempts: 0,
    numOfUsers: 0,
    numOfTimesVisitedStatPage: 0,
  });

  const hasCredentials = user.isLoggedIn && currentUser.isAdmin;

  const getStats = async () => {
    //pass token here
    await userRequest.get("/admin").then((response) => {
      setStats(response.data);
      console.log(response.data);
    });
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
                <th># hits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>POST</td>
                <td>/auth/register</td>
                <td>{stats.numOfSuccessfulLogins}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/login</td>
                <td>{stats.numOfFailedLogins}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/verifyJWT</td>
                <td>{stats.numOfLoginAttempts}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/getDogs</td>
                <td>{stats.numOfUsers}</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/dog/addEditDog</td>
                <td>{stats.numOfTimesVisitedStatPage}</td>
              </tr>
              <tr>
                <td>POST???</td>
                <td>/dog/delete</td>
                <td>{stats.numOfTimesVisitedStatPage}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/dog/:id</td>
                <td>{stats.numOfTimesVisitedStatPage}</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/admin/stats</td>
                <td>{stats.numOfTimesVisitedStatPage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
