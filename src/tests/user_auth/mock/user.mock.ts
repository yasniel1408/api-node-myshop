import shortid from 'shortid';

const firstUserBody = {
  email: `example+${shortid.generate()}@example.com`,
  password: 'Sup3rSecret!23'
};
const newFirstName = 'Jose';
const newFirstName2 = 'Paulo';
const newLastName2 = 'Faraco';
const newAvatar2 = 'paulo.jpg';

export { firstUserBody, newFirstName, newFirstName2, newLastName2, newAvatar2 };
