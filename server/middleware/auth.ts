const isAuthenticated = (req: any, res: any, next: any) => {
  !req.isAuthenticated() ? res.redirect('/') : next();
};

export default isAuthenticated;
