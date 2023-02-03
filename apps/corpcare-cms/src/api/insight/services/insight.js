'use strict';

/**
 * insight service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::insight.insight');
