'use strict';

/**
 * wealth-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wealth-management.wealth-management');
