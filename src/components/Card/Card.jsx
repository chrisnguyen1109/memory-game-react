import styles from './Card.module.css';
import coverImg from '../../assets/img/cover.png';

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
                <img className={styles.back} src={coverImg} onClick={flipCard} alt="cover" />
            </div>
        </div>
    );
}
