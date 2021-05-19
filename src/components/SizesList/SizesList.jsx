import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/atoms';

import * as utils from '../../utils/functs';

import QytComponent from '../QytComponent/QytComponent.jsx';
import Trash from '../icons/trash';

import './SizesList.scss';

const SizesList = () => {
  const [cart, setCart] = useRecoilState(cartState)

  const [inDisplay, setInDisplay] = useState([...Object.keys(cart)])
  const [availible, setAvailible] = useState(['large', 'small', 'xlarge'])



  const handleAddSize = (e) => {
    if (e.target.value === "") return;
    const target = e.target.value;
    const prev = { ...cart };

    if (!prev[target]) {
      prev[target] = { qty: 1 }
      setCart({ ...prev })
    }
    setInDisplay([target, ...inDisplay])
    setAvailible([...utils.filterArr(availible, target)])
  }

  const handleRemoveSize = (e) => {
    if (availible.includes(e.currentTarget.dataset.size)) return;
    const target = e.currentTarget.dataset.size;
    const prev = { ...cart }
    delete prev[target]
    setCart({ ...prev })

    setInDisplay([...utils.filterArr(inDisplay, target)])
    setAvailible([target, ...availible])
  }

  return (
    <section className="sizes">

      <div className="sizes__header">
        <span className="sizes__header__text">Size</span>
        <span className="sizes__header__text">Qty</span>
      </div>
      {
        inDisplay.map((size, idx) => {
          return (
            <div
              key={idx}
              className="sizes__item">
              <span>{size === 'xlarge' ? 'X-Large' : size}</span>
              {
                cart[size] &&
                <QytComponent
                  size={size}
                  inDisplay={inDisplay}
                  availible={availible}
                  setInDisplay={setInDisplay}
                  setAvailible={setAvailible} />
              }
              <Trash className="remove"
                data-size={size}
                onClick={handleRemoveSize} />
            </div>
          )
        }
        )
      }
      {
        availible.length !== 0 ? (
          <select className="sizes__select" onChange={handleAddSize}>
            <option value="" default >Add More Sizes</option>
            {
              availible.map(size =>
                <option key={size} value={size}>{size === 'xlarge' ? 'X-Large' : size}</option>
              )
            }
          </select>
        ) : ''
      }
    </section>
  );
};

export default SizesList;
