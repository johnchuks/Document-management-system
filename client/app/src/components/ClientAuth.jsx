
const clientAuth = (replace) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    replace({
      pathName: '/login'
    });
  }
};
export default clientAuth;
