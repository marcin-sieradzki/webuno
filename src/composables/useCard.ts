import { Card } from '@/Types';
import { computed, Ref } from 'vue';
import { getRandomNumber } from '@/utils/shared/numberUtils';

export function getCardSymbol(card: Card) {
  return card?.symbol.length < 3 ? card.symbol : card.symbol.charAt(0).toUpperCase();
}

export function getCardColor(card: Card, reversed: boolean) {
  if (reversed) {
    return 'bg-red-500';
  }
  switch (card.color) {
    case 'red':
      return 'bg-red-500';
    case 'yellow':
      return 'bg-yellow-400';
    case 'green':
      return 'bg-green-400';
    case 'blue':
      return 'bg-blue-400';
    default:
      return 'bg-teal-400';
  }
}

export function getClassObject(allowInteraction: boolean, popupOnHover: boolean, absolute: boolean) {
  return {
    'cursor-pointer': allowInteraction,
    'pointer-events-none': !allowInteraction,
    'hover:z-10': popupOnHover,
    'hover:bottom-7': popupOnHover,
    absolute: absolute,
  };
}

export function getStyleObject(
  randomlyRotated: boolean,
  cardRandomPosition: string,
  translateLeft: boolean,
  indexInStack: number
) {
  return {
    transform: buildTransform(randomlyRotated, cardRandomPosition, translateLeft, indexInStack),
    transformOrigin: randomlyRotated ? 'default' : 'center',
  };
}
const buildTransform = (
  randomlyRotated: boolean,
  cardRandomPosition: string,
  translateLeft: boolean,
  indexInStack: number
) => {
  if (randomlyRotated) {
    return cardRandomPosition;
  }
  if (translateLeft) {
    return `translate(${indexInStack * 2.5}rem)`;
  }
  return '';
};

export function buildCardRandomPosition() {
  return `rotate(${getRandomRotation()}) translate(${getRandomTranslateValues()})`;
}

const getRandomRotation = () => {
  return `${getRandomNumber(-60, 60)}deg`;
};

const getRandomTranslateValues = () => {
  return `${getRandomNumber(-10, 10)}px,${getRandomNumber(-10, 10)}px`;
};

export const useCard = ({
  card,
  reversed,
  allowInteraction,
  popupOnHover,
  absolute,
  randomlyRotated,
  translateLeft,
  indexInStack,
}: UseCardParams) => {
  const cardSymbol = computed(() => getCardSymbol(card?.value));
  const cardColor = computed(() => getCardColor(card?.value, reversed.value));
  const classObject = computed(() => getClassObject(allowInteraction.value, popupOnHover.value, absolute.value));
  const cardRandomPosition = computed(() => buildCardRandomPosition());
  const styleObject = computed(() =>
    getStyleObject(randomlyRotated.value, cardRandomPosition.value, translateLeft.value, indexInStack.value)
  );

  return {
    cardSymbol,
    cardColor,
    classObject,
    styleObject,
  };
};

interface UseCardParams {
  card: Ref<Card>;
  reversed?: Ref<boolean>;
  allowInteraction?: Ref<boolean>;
  popupOnHover?: Ref<boolean>;
  absolute?: Ref<boolean>;
  randomlyRotated?: Ref<boolean>;
  translateLeft?: Ref<boolean>;
  indexInStack?: Ref<number>;
}
