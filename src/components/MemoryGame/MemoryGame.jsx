import { useEffect, useState } from 'react';
import cardImages from '../../global/cardImages';
import styles from './MemoryGame.module.css';
import { v4 as uuidv4 } from 'uuid';
import Card from '../Card/Card';

export default function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        return [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: uuidv4() }));
    };

    const reset = () => {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
    };

    const newGame = () => {
        const shuffledCards = shuffleCards();

        setCards(shuffledCards);
        setTurns(0);
        reset();
    };

    useEffect(() => {
        newGame();
    }, []);

    useEffect(() => {
        if (cards.every(el => el.matched)) {
            setTimeout(() => {
                alert(`Congratulations! You completed the game with ${turns} turns.`);
                newGame();
            }, 800);
        }
    }, [cards]);

    const choiceHandler = card => {
        if (!firstChoice) {
            setFirstChoice(card);
            return;
        }

        setSecondChoice(card);
    };

    useEffect(() => {
        if (firstChoice && secondChoice) {
            setDisabled(true);
            firstChoice.src === secondChoice.src &&
                setCards(prevCards =>
                    prevCards.map(el =>
                        el.src === firstChoice.src ? { ...el, matched: true } : el
                    )
                );

            setTimeout(() => {
                reset();
            }, 800);

            setTurns(turns + 1);
        }
    }, [firstChoice, secondChoice]);

    const setFlipped = card => {
        return firstChoice === card || secondChoice === card || card.matched;
    };

    return (
        <>
            <h1>Magic Match</h1>
            <button className={styles.button} onClick={newGame}>
                New Game
            </button>

            <div className={styles['card-grid']}>
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        onFlipCard={choiceHandler}
                        flipped={setFlipped(card)}
                        disabled={disabled}
                    />
                ))}
            </div>

            <p>Turns: {turns}</p>
        </>
    );
}
