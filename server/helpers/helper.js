
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

  module.exports.paginationMetaData = paginationMetaData;
  module.exports.responseHelper = responseHelper;
  module.exports.responseUserHelper = responseUserHelper;
