'use strict';

/**
 * fixed-deposits service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fixed-deposits.fixed-deposits');
