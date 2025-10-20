import xss from 'xss';

export function sanitizedBody(req, res, next) {
  if ( req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (key.toLowerCase() === 'password') continue;

      const value = req.body[key];
      if (typeof value === 'string') {
        req.body[key] = xss(value.trim());
      }
    }
  }
  next();
}
