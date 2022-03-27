module.exports = {


  friendlyName: 'Survey',


  description: 'Survey survey.',


  inputs: {
    question: {
      type: 'string',
      required: true,
    },
    options: {
      type: ['string'],
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New survey created',
    },
    NotEnoughOptions: {
      description: 'Something went wrong',
    },
    error: {
      description: 'Something went wrong',
    },
  },


  fn: async function (inputs, exits) {

    try {

      if(inputs.options.length <2)
        return exits.NotEnoughOptions({
          message: `A Survey needs at lease 2 options.`,
          data: resultsurvey
        });
      const newsurvey = await sails.models.survey.create({
        question: inputs.question
      }).fetch();
      const optionsarray = inputs.options.map((option)=>({content:option,survey:newsurvey.id}))
      const options = await sails.models.option.createEach(optionsarray).fetch();
      var resultsurvey = await sails.models.survey.findOne({ id: newsurvey.id }).populate('options');
      return exits.success({
        message: `A Survey has been created  successfully.`,
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
