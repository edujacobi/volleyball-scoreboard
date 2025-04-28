import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import Colors from "../utils/colors";

export type Player = 'Home' | 'Visitor';
export type ScoreChange = 'increment' | 'decrement';

interface GameContextProps {
    scoreHome: number;
    scoreVisitor: number;
    currentPlayer: Player;
    changeScore: (team: Player, scoreChange: ScoreChange) => void;
    restartSet: () => void;
    restartGame: () => void;
    getScore: (team: Player) => number;
    getSets: (team: Player) => number;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    colorHome: string,
    colorVisitor: string,
    setColor: (team: Player, color: Colors) => void;
    gameFinished: boolean;
    changeSides: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider = ({children}: GameProviderProps) => {
    const [scoreHome, setScoreHome] = useState(0);
    const [setsHome, setSetsHome] = useState(0);
    const [colorHome, setColorHome] = useState(Colors.Blue);

    const [scoreVisitor, setScoreVisitor] = useState(0);
    const [setsVisitor, setSetsVisitor] = useState(0);
    const [colorVisitor, setColorVisitor] = useState(Colors.Red);

    const [currentPlayer, setCurrentPlayer] = useState<Player>('Home');

    const [gameFinished, setGameFinished] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    function changeScore(team: Player, scoreChange: ScoreChange) {
        const points = scoreChange === 'increment' ? 1 : -1;

        if (gameFinished && scoreChange === 'increment') {
            return;
        } else if (gameFinished && scoreChange === 'decrement') {
            setGameFinished(false)
        }

        if (scoreChange === "increment") {
            setCurrentPlayer(team);
        }

        if (team === 'Home') {
            setScoreHome((prev) => prev + points);
            if (scoreHome + points >= 25 && scoreHome - scoreVisitor >= 2) {
                setSetsHome((prev) => prev + points);
                setGameFinished(true);
            }
        } else {
            setScoreVisitor((prev) => prev + points);
            if (scoreVisitor + points >= 25 && scoreVisitor - scoreHome >= 2) {
                setSetsVisitor((prev) => prev + points);
                setGameFinished(true);
            }
        }
    }

    function getScore(team: Player) {
        if (team === 'Home') {
            return scoreHome;
        } else {
            return scoreVisitor;
        }
    }

    function getSets(team: Player) {
        if (team === 'Home') {
            return setsHome;
        } else {
            return setsVisitor;
        }
    }

    function restartSet() {
        setScoreHome(0);
        setScoreVisitor(0);
        setCurrentPlayer('Home');
        setGameFinished(false);
    }

    function restartGame() {
        restartSet();
        setSetsHome(0);
        setSetsVisitor(0);
    }

    function changeSides() {
        const scoreAux = scoreHome;
        setScoreHome(scoreVisitor);
        setScoreVisitor(scoreAux);

        const setsAux = setsHome;
        setSetsHome(setsVisitor);
        setSetsVisitor(setsAux);

        const colorAux = colorHome;
        setColorHome(colorVisitor);
        setColorVisitor(colorAux);

        const playerChange = currentPlayer === 'Home' ? 'Visitor' : 'Home';
        setCurrentPlayer(playerChange);
    }

    function setColor(team: Player, color: Colors) {
        if (team === 'Home') {
            setColorHome(color);
        } else {
            setColorVisitor(color);
        }
    }

    const obj = useMemo(() => (
        {
            scoreHome,
            scoreVisitor,
            currentPlayer,
            changeScore,
            restartSet,
            restartGame,
            getScore,
            getSets,
            isMenuOpen,
            setIsMenuOpen,
            colorHome,
            colorVisitor,
            setColor,
            gameFinished,
            changeSides,
        } as GameContextProps
    ), [
        scoreHome,
        scoreVisitor,
        isMenuOpen,
        colorHome,
        colorVisitor,
        gameFinished
    ])

    return (
        <GameContext.Provider value={obj}>
            {children}
        </GameContext.Provider>
    );
};

export function useGame(): GameContextProps {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame deve ser usado dentro de um GameProvider');
    }
    return context;
}
