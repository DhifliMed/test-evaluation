module.exports = {


  friendlyName: 'Answer',


  description: 'Create answer.',


  inputs: {
    option: {
      type: 'number',
      required: true,
    }
  },


  exits: {

    success: {
      statusCode: 201,
      description: 'Answer created',
    },
    OptionDoesNotExist: {
      statusCode: 400,
      description: 'Option does not exist',
    },
    UserIsNotAuthenticate: {
      statusCode: 401,
      description: 'User is not authenticated',
    },
    AlreadyAnswered: {
      statusCode: 400,
      description: 'Survey already Answered',
    },
    error: {
      description: 'Something went wrong',
    },

  },


  fn: async function (inputs, exits) {

    try{

      const option = await sails.models.option.findOne({ id: inputs.option });
      const survey = await sails.models.survey.findOne({ id: option.survey });
      const brothers =  await sails.models.option.find({ survey: survey.id });
      const brothersIds = brothers.map((option)=>(option.id))
      if(!option){
        return exits.OptionDoesNotExist({
          message:"Option does not exist please retry"
        });
      }
      const useremail = this.req.token.sub;
      const user = await sails.models.user.findOne({email:useremail})
      if(!user){
        return exits.UserIsNotAuthenticate({
          message:"User is not authenticated"
        });
      }
      answered = await sails.models.answer.find({user:user.id,option:{in:brothersIds}})
      if(answered.length >0)
        return exits.AlreadyAnswered({
          message:"User Already answered this survey"
        });
      const answer = await sails.models.answer.create({user:user.id,option:option.id}).fetch()
      return exits.success({
        message:"Answer created",
        data: answer
      });

    } catch (error) {

      return exits.error({
        message:"An unknown error occured please retry",
        error: error.message,
      });

    }

  }


};
