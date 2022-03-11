
import axios from "axios";
import styles from './AdminPage.module.css';
import { useState } from 'react';

const AdminPage = () => {
  const [stats, setStats] = useState({});
  const endPointUrl = "http://localhost:8080";

  const populateAdminPage = async () => {
    await axios.get(endPointUrl + "/admin").then(response => {
      setStats(response.data);
      console.log(response.data);
    });
  }
  //How can I do this without using the refresh button? Infinite loop occurs if I use the GET request on page load.

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminContainer}>
        <h1>Fetch</h1>
        <h2>Admin admins</h2>
        <input type="button" value="Refresh" onClick={ () => {populateAdminPage()}} />
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