import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';


export function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <a href="https://github.com/gustavos00">
        <img
          src="https://github.com/gustavos00.png"
          alt="Gustavo Santos image"
        />
      </a>
      <div>
        <strong>Gustavo Santos</strong>

        <p>
          <img src="icons/level.svg" alt="Level up" />
          Level {`${level}`}
        </p>
      </div>
    </div>
  );
}
