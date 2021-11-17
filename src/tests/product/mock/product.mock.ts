/* eslint-disable import/prefer-default-export */
import shortid from 'shortid';

const firstProductBody = {
  name: `Laptop ${shortid.generate()}`,
  photo: `laptop${shortid.generate()}.png`,
  price: Math.round(Math.random() * 100),
  amount: Math.round(Math.random() * 10),
  description: 'Laptop Description'
};

export { firstProductBody };
