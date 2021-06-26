import { selector } from 'recoil';

import { cartState } from './atoms';

export const sizesState = selector({
  key: 'sizeState',
  get: ({ get }) => get(cartState),
  set: ({ get, set }, size) => {
    const prevState = { ...get(cartState) };

    const updatedQty = {};
    let qty = prevState[size].qty;
    qty++;

    updatedQty.qty = qty;

    const nextState = {
      ...prevState,
      [size]: { ...updatedQty },
    };

    console.log({ nextState });

    return set(cartState, nextState);
  },
});
