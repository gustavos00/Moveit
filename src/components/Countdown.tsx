import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown} = useContext(CountdownContext)
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
