import { useEffect, useRef } from 'react';
import styles from './Card.module.css';

export default function Card({ card, onFlipCard, flipped, disabled }) {
    const cardRef = useRef();

    useEffect(() => {
        cardRef.current.className = styles.flipped;

        const timer = setTimeout(() => {
            cardRef.current.className = '';
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const flipCard = () => {
        if (!disabled) {
            onFlipCard(card);
        }
    };

    return (
        <div className={styles.card}>
            <div ref={cardRef} className={flipped ? styles.flipped : ''}>
                <img className={styles.front} src={card.src} alt="card" />
                <img className={styles.back} src="/img/cover.png" onClick={flipCard} alt="cover" />
            </div>
        </div>
    );
}
