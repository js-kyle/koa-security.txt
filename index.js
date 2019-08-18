'use strict';

/**
 * Serves a security.txt file
 *
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */

module.exports = function(options) {

  options = options || {};
  if (!options.paths) {
    options.paths = ['/security.txt', '/.well-known/security.txt'];
  }

  if (!options.languages) {
    options.languages = ['en'];
  }

  return (ctx, next) => {
    if (!options.paths.includes(ctx.path)) {
      return next();
    }

    if ('GET' !== ctx.method && 'HEAD' !== ctx.method) {
      ctx.status = 'OPTIONS' == ctx.method ? 200 : 405;
      ctx.set('Allow', 'GET, HEAD, OPTIONS');
    } else {
      ctx.type = 'text/plain';
      let securitytxtBody = '';
      if (options.contact) securitytxtBody = securitytxtBody + `Contact: mailto:${options.contact}\n`;
      if (options.encryption) securitytxtBody = securitytxtBody + `Encryption: ${options.encryption}\n`;
      if (options.acknowledgments) securitytxtBody = securitytxtBody + `Acknowledgments: ${options.acknowledgments}\n`;
      if (options.canonical) securitytxtBody = securitytxtBody + `Canonical: ${options.canonical}\n`;
      if (options.languages) securitytxtBody = securitytxtBody + `Preferred-Languages: ${options.languages.toString()}\n`;
      if (options.policy) securitytxtBody = securitytxtBody + `Policy: ${options.policy}\n`;
      if (options.hiring) securitytxtBody = securitytxtBody + `Hiring: ${options.hiring}\n`;

      ctx.body = securitytxtBody;

    }
  };
};
