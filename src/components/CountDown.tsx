import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/CountDown.module.css";

let countDownTimeout: NodeJS.Timeout;

export function CountDown() {
  const { startNewChallenge } = useContext(ChallengesContext)


  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinishd, setHasFinishd] = useState(false);

  const minutos = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutos).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinishd(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinishd ? (
        <button disabled className={styles.countDownButton}>
          Ciclo encerrado <img src="/icons/check-circle.svg" alt="check circle"/>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              onClick={resetCountDown}
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Abandonar ciclo <img src="icons/close.svg" alt="close"/>
            </button>
          ) : (
            <button
              type="button"
              onClick={startCountDown}
              className={styles.countDownButton}
            >
              Iniciar um ciclo <img src="icons/play.svg" alt="body"/>
            </button>
          )}
        </>
      )}
    </div>
  );
}
