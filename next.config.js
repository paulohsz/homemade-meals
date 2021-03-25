const redirects = require('./config/redirects');

module.exports = {
  trailingSlash: true, // Put "/" last url [example 'localhost/faq' --> 'localhost/faq/' ]
  async redirects() { // Redirects (Simple)
    return redirects;
  },
};
