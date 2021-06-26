import { useState, useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/atoms';

import * as utils from '../../utils/functs';

import CheveronLeft from "../icons/Cheveron-left";
import CheveronRight from "../icons/Cheveron-right";

const QytComponent = ({ size, availible, setAvailible, inDisplay, setInDisplay }) => {

  const [cart, setCart] = useRecoilState(cartState)

  const [qty, setQty] = useState(cart[size].qty)


  useEffect(() => {
    setQty(cart[size].qty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart[size].qty])

  const increase = (e) => {
    const target = e.currentTarget.dataset.size;

    const prevState = { ...cart };
    let qty = prevState[target].qty;

    qty++;

    const nextState = {
      ...prevState,
      [size]: {
        qty
      },
    };

    setCart(nextState)
  }


  const decrease = (e) => {
    const target = e.currentTarget.dataset.size;

    const prevState = { ...cart };

    if (prevState[target].qty <= 1) {
      delete prevState[target]
      setCart({ ...prevState })

      setInDisplay([...utils.filterArr(inDisplay, target)])
      return setAvailible([target, ...availible]);
    }

    let qty = prevState[target].qty;
    qty--;

    const nextState = {
      ...prevState,
      [size]: {
        qty
      },
    };

    setCart(nextState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (qty === '') return;

    const prevState = { ...cart }
    const current = parseInt(qty)

    if (current === prevState[size].qty) return;

    if (current <= 0) {
      delete prevState[size]
      setCart({ ...prevState });

      setInDisplay([...utils.filterArr(inDisplay, size)]);
      return setAvailible([size, ...availible]);
    }
    const nextState = {
      ...prevState,
      [size]: {
        qty: current
      },
    };

    setQty(current);
    e.target.reset()
    return setCart(nextState);
  }


  return (
    <section className="sizes__qty">
      <CheveronLeft
        data-size={size}
        onClick={decrease}
      />
      <form className="sizes__qty--form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)} />
      </form>
      <CheveronRight
        data-size={size}
        onClick={increase}
      />
    </section>
  )
}

export default QytComponent;
