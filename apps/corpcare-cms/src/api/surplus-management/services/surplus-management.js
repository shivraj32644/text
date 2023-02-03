'use strict';

/**
 * surplus-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::surplus-management.surplus-management'
);
