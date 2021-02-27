import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  let countdownTimeout: NodeJS.Timeout;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  /**
   * Não deve acontecer:
   * 25 = '2' '5'
   * 5 = '' '5'
   *
   * Deveria acontecer:
   * 05 = '0' '5'
   *
   * Para isso serve o padStart(2, '0') (Se não tiver 2 caracteres, ele insere um 0 do lado esquerdo.)
   */

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);

    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo Terminado
        </button>
      ) : (
        /*<> = Chamasse "Fragmetent". É usado devido a limitação do react em relação aos objetos sem uma div em volta. */
        <>
          {isActive ? (
            <button
              type="button"
              className={` ${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Pausar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
