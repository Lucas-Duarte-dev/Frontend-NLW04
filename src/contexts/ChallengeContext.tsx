import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengeCompleted: number; 
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 9, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallangeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallangeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            experienceToNextLevel,
            challengeCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge 
        }}>
            { children }
        </ChallengesContext.Provider>
    );
}

