
  const paginationMetaData = (count, limit, offset) => ({
    totalCount: count,
    pageCount: Math.ceil(count / limit),
    page: Math.floor(offset / limit) + 1,
    pageSize: limit
  });
  const responseHelper = (res) => {
    res.status(404).json({ message: 'Document not found' });
  };
  const responseUserHelper = (res) => {
    res.status(404).json({ message: 'User not found' });
  };

  const updateProfile = (req, res, user) => {
    user.update({
      fullName: req.body.fullName || user.fullName,
      userName: req.body.userName || user.userName,
      email: req.body.email || user.email,
      password: req.body.password || user.password,
      roleId: req.body.roleId || user.roleId
    }).then((updatedUser) => {
      res.status(200).send({
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        userName: updatedUser.userName,
        email: updatedUser.email,
        roleId: updatedUser.roleId
      });
    }).catch(error => res.status(400).send(error));
  };

  module.exports.paginationMetaData = paginationMetaData;
  module.exports.responseHelper = responseHelper;
  module.exports.responseUserHelper = responseUserHelper;
  module.exports.updateProfile = updateProfile;
