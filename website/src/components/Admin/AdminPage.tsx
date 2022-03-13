
import axios from "axios";
import styles from './AdminPage.module.css';
import { useState, useEffect } from 'react';

const AdminPage = () => {
  const [stats, setStats] = useState({});
  const endPointUrl = "https://fetch-be.azurewebsites.net";

  useEffect(() => {
    axios.get(endPointUrl + "/admin").then(response => {
      setStats(response.data);
      console.log(response.data);
    });
  }, [])

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminContainer}>
        <h1>Fetch</h1>
        <h2>Admin admins</h2>
        <table>
          <tbody>
            <tr>
              <td>Successful logins:</td>
              <td>{stats.numOfSuccessfulLogins}</td>
            </tr>
            <tr>
              <td>Failed logins:</td>
              <td>{stats.numOfFailedLogins}</td>
            </tr>
            <tr>
              <td>Total number of login attempts:</td>
              <td>{stats.numOfLoginAttempts}</td>
            </tr>
            <tr>
              <td>Number of users:</td>
              <td>{stats.numOfUsers}</td>
            </tr>
            <tr>
              <td>Number of times visited stat page:</td>
              <td>{stats.numOfTimesVisitedStatPage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPage;