module.exports = {


  friendlyName: 'ListSurveys',


  description: 'List surveys.',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New survey created',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {
    try {

      var resultsurvey = await sails.models.survey.find().populate('options');
      return exits.success({
        message: `List of surveys.`,
        data: resultsurvey
      });

    } catch (error) {

      return exits.error({
        message:"An unknown error occured please retry",
        error: error.message,
      });
      
    }

  }


};
