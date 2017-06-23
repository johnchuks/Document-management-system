// const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');
const admin = {
  email: 'admin@admin.com',
  password: 'adminpassword'
};
const user = {
  email: 'test@test.com',
  password: 'testuser'

};

const role = {
  title: 'kiba team'
};
const sampleUser1 = {
  fullName: 'john doe',
  userName: 'james',
  email: 'john@andela.com',
  password: bcrypt.hashSync('johndeo', bcrypt.genSaltSync(8), null),
  userId: 3
};
const sampleUser2 = {
  fullName: 'full Name',
  userName: 'userName',
  email: 'johne',
  password: bcrypt.hashSync('johnde', bcrypt.genSaltSync(8), null),
  userId: 3
};
const sampleUser3 = {
  fullName: 'james doe',
  userName: 'doe',
  email: 'doe@andela.com',
  password: bcrypt.hashSync('framekey', bcrypt.genSaltSync(8), null),
  userId: 3
};


module.exports.admin = admin;
module.exports.user = user;
module.exports.role = role;
module.exports.sampleUser1 = sampleUser1;
module.exports.sampleUser2 = sampleUser2;
module.exports.sampleUser3 = sampleUser3;
