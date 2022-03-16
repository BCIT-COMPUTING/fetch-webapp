
import styles from './AdminPage.module.css';
import { useState, useEffect } from 'react';
import { endPointBaseUrl } from '../../appConfigs';
import { useAppStore } from '../../store/appContext';
import { useNavigate } from 'react-router';


const AdminPage = () => {
  const navigate = useNavigate();
  const { state } = useAppStore();
  const [stats, setStats] = useState({
    numOfSuccessfulLogins: 0,
    numOfFailedLogins: 0,
    numOfLoginAttempts: 0,
    numOfUsers: 0,
    numOfTimesVisitedStatPage: 0,
  });

  const hasCredentials = state.isLoggedIn && state.isAdmin;


  useEffect(() => {
    if(hasCredentials === false) {
      navigate('/login');
      return;
    }

    fetch(endPointBaseUrl + "/admin", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setStats(data);
        console.log(data);
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