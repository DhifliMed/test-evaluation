/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  // setting all routes under jwt validation
  '*': ['isAuthorized'],
  // free of auth routes
  "status/ping": ['AuthFree'],
  "user/login": ['AuthFree'],
  "user/register": ['AuthFree'],
  "main": ['AuthFree'],

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

};
