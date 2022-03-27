const sailsHookOrganics = require("sails-hook-organics");

module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
    },
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {

    try {

      const newEmailAddress = inputs.email.toLowerCase();
      let newUser = await sails.models.user.create({
        username: inputs.username,
        email: newEmailAddress,
        password: inputs.password,
      }).fetch();
      return exits.success({
        message: `An account has been created for ${newUser.email} successfully.`,
      });

    } catch (error) {

      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'An error occurred',
          error: error,
        });
      }
      
      return exits.error({
        message:"An unknown error occured please retry",
        error: error.message,
      });

    }

  }


};
