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
    const prev = { ...cart };
    prev[target].qty++
    setCart({ ...prev })
  }

  const decrease = (e) => {
    const target = e.currentTarget.dataset.size;
    const prev = { ...cart };
    if (prev[target].qty <= 1) {
      delete prev[target]
      setCart({ ...prev })

      setInDisplay([...utils.filterArr(inDisplay, target)])
      return setAvailible([target, ...availible]);
    }
    prev[target].qty--
    setCart({ ...prev })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (qty === '') return;

    const prev = { ...cart }
    const current = parseInt(qty)

    if (current === prev[size].qty) return;


    if (current <= 0) {
      delete prev[size]
      setCart({ ...prev });

      setInDisplay([...utils.filterArr(inDisplay, size)]);
      return setAvailible([size, ...availible]);
    }

    prev[size].qty = current;
    setQty(current);
    e.target.reset()
    return setCart({ ...prev });
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
