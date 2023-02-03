'use strict';

/**
 * mutual-funds service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mutual-funds.mutual-funds');
