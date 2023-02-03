'use strict';

/**
 * treasury-solutions service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::treasury-solutions.treasury-solutions'
);
