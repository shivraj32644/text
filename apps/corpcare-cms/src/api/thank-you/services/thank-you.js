'use strict';

/**
 * thank-you service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::thank-you.thank-you');
