import { redCard, blueCard, greenCard, yellowCard, inheritColorCard, cardWithLongSymbol } from '@/mocks/cards';
import { getCardSymbol, getCardColor, getClassObject } from '@/composables/useCard';

describe('getCardSymbol', () => {
  it('returns short symbol if the card symbol is <3 characters in length', () => {
    const expected = '0';
    expect(getCardSymbol(redCard)).toEqual(expected);
  });
  it('returns long symbol if the card symbol is >3 characters in length', () => {
    const expected = 'S';
    expect(getCardSymbol(cardWithLongSymbol)).toEqual(expected);
  });
});
describe('getCardColor', () => {
  it('returns "bg-red-500" when reversed = true', () => {
    const expected = 'bg-red-500';
    expect(getCardColor(redCard, true)).toEqual(expected);
  });
  it('returns correct card color when reversed != true', () => {
    const expectedRed = 'bg-red-500';
    const expectedYellow = 'bg-yellow-400';
    const expectedGreen = 'bg-green-400';
    const expectedBlue = 'bg-blue-400';
    const expectedTeal = 'bg-teal-400';
    expect(getCardColor(redCard, false)).toEqual(expectedRed);
    expect(getCardColor(yellowCard, false)).toEqual(expectedYellow);
    expect(getCardColor(greenCard, false)).toEqual(expectedGreen);
    expect(getCardColor(blueCard, false)).toEqual(expectedBlue);
    expect(getCardColor(inheritColorCard, false)).toEqual(expectedTeal);
  });
});
describe('getClassObject', () => {
  it('returns the correct object with css classes based on paramaters', () => {
    const expectedWithAllParamsTrue = {
      'cursor-pointer': true,
      'pointer-events-none': false,
      'hover:z-10': true,
      'hover:bottom-7': true,
      absolute: true,
    };

    const expectedWithAllowInteractionFalse = {
      'cursor-pointer': false,
      'pointer-events-none': true,
      'hover:z-10': true,
      'hover:bottom-7': true,
      absolute: true,
    };
    expect(getClassObject(true, true, true)).toEqual(expectedWithAllParamsTrue);
    expect(getClassObject(false, true, true)).toEqual(expectedWithAllowInteractionFalse);
  });
});
