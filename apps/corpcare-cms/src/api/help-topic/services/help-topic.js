'use strict';

/**
 * help-topic service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help-topic.help-topic');
