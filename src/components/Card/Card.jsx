import styles from './Card.module.css';

export default function Card({ card, onFlipCard, flipped, disabled }) {
    const flipCard = () => {
        if (!disabled) {
            onFlipCard(card);
        }
    };

    return (
        <div className={styles.card}>
            <div className={flipped ? styles.flipped : ''}>
                <img className={styles.front} src={card.src} alt="card" />
                <img className={styles.back} src="/img/cover.png" onClick={flipCard} alt="cover" />
            </div>
        </div>
    );
}
