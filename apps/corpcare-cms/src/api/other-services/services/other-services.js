'use strict';

/**
 * other-services service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::other-services.other-services');
