import { atom } from 'recoil';

export const cartState = atom({
  key: 'cart',
  default: {
    medium: {
      qty: 1,
    },
  },
});
