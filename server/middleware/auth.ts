const isAuthenticated = (req: any, res: any, next: any) => {
  !req.user ? res.redirect('/') : next()
};

export default isAuthenticated;
