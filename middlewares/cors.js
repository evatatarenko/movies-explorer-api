const allowedCors = [
  'https://tatarenko-diploma.nomoredomainsrocks.ru',
  'http://tatarenko-diploma.nomoredomainsrocks.ru',
  'https://api.tatarenko-diploma.nomoredomainsicu.ru/users/me',
  'https://api.tatarenko-diploma.nomoredomainsicu.ru/movies',
  'https://api.tatarenko-diploma.nomoredomainsicu.ru/signup',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://158.160.109.76',
  'http://158.160.109.76',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
