'use strict';

/**
 * bonds service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bonds.bonds');
