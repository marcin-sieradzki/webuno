import { gsap } from 'gsap';
import { Card } from 'src/Types';

export const useAnimateCard = () => {
  const animatePlayedCard = (card: Card) => {
    if (!card) {
      return;
    }

    const playedCard = document.querySelector(`#card${card.id}`);
    const playedBy = playedCard?.getAttribute('played-by');
    if (!playedBy) {
      return;
    }

    const { height, width } = document.querySelector('body')?.getBoundingClientRect();
    const playerDeck = document.querySelector(`div[data-seat*="seat${playedBy}"]`);
    const seat = playerDeck?.getAttribute('data-seat')?.split('.')[1];

    const playerRect = playerDeck?.getBoundingClientRect();

    const from = { x: 0, y: 0 };
    switch (seat) {
      case 'bottom':
        from.x = 0;
        from.y = playerRect.bottom - playerRect?.height - playerRect.y / 2;
        break;
      case 'left':
        from.x = -width / 2 + playerRect?.width;
        from.y = 0;
        break;
      case 'top':
        from.x = 0;
        from.y = -playerRect?.height - playerRect.top - playerRect.y;
        break;
      case 'right':
        from.x = width / 2 - playerRect.y;
        from.y = 0;
        break;

      default:
        break;
    }

    const tl = gsap.timeline();
    tl.from(playedCard, { ...from, duration: 0.5, rotate: 180 });
    tl.to(playedCard, { scale: 1.3, duration: 0.2 }, '-=0.35');
    tl.to(playedCard, { scale: 1, duration: 0.2, ease: 'power4' });
  };
  return {
    animatePlayedCard,
  };
};
