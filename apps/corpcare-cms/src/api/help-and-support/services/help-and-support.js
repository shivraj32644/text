'use strict';

/**
 * help-and-support service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help-and-support.help-and-support');
