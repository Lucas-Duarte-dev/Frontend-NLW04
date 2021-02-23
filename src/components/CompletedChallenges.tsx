import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desfios completos</span>
            <span>5</span>
        </div>
    )
}