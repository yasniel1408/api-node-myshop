/* eslint-disable import/prefer-default-export */
import shortid from 'shortid';

const firstUserBody = {
  email: `example+${shortid.generate()}@example.com`,
  password: 'Sup3rSecret!23'
};

export { firstUserBody };
