import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountDown } = useContext(CountdownContext);

    function handleChallengeSucceded() {
      completeChallenge();
      resetCountDown();
    }
    function handleChallengeFailed() { 
      resetChallenge();
      resetCountDown();
    }

    return (
        <div className={ styles.challengeBoxContainer }>

            { activeChallenge ? 
            (
            <div className={ styles.challengeActive }>
                <header>Ganhe { activeChallenge.amount } xp</header>
                <main>
                    <img src={ `/icons/${ activeChallenge.type }.svg` } alt="Body"/>
                    <strong>Novo desfio</strong>
                    <p>{activeChallenge.description}</p>
                </main>
                <footer>
                    <button 
                      type="button"
                      className={ styles.challengeFailedButton }
                      onClick={ handleChallengeFailed }
                     >Falhei</button>
                    <button 
                      type="button"
                      className={ styles.challengeSuccessedButton }
                      onClick={ handleChallengeSucceded }
                     >Completei</button>
                </footer>
            </div>
            ) :  
            ( 
              <div className={ styles.challengeBoxNotActive }>
              <strong>Finalize um ciclo para receber um desafio</strong>
              <p>
                <img src="icons/level-up.svg" alt="Level Up"/>
                Avance de level completando desafios.
              </p>

              </div>
            )}
            
        </div>
    )
}