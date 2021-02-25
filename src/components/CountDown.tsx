import { useContext } from "react";
import { CountdownContext } from "../contexts/CountDownContext";
import styles from "../styles/components/CountDown.module.css";



export function CountDown() {
  const { 
    minutes,
    seconds,
    hasFinishd,
    isActive,
    resetCountDown,
    startCountDown 
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  
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
