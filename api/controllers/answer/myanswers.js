module.exports = {


  friendlyName: 'My answers',


  description: 'List current User answers.',


  inputs: {

    survey: {
      type: 'number',
      required: false,
    }

  },


  exits: {
    success: {
      statusCode: 201,
      description: 'My answers',
    },
    UserIsNotAuthenticate: {
      statusCode: 401,
      description: 'User is not authenticated',
    },
    error: {
      description: 'Something went wrong',
    },

  },


  fn: async function (inputs, exits) {
    try {
      
      const useremail = this.req.token.sub;
      const user = await sails.models.user.findOne({email:useremail})
      let answers;
      if(inputs.survey){
        const options = await sails.models.option.find({survey:inputs.survey})
        const optionsIds = options.map((option)=>(option.id))
        answers = await sails.models.answer.find({user:user.id,option:{in:optionsIds}}).populate('option')
      }else {
        answers = await sails.models.answer.find({user:user.id}).populate('option')
      }
      const resultAnswers = await Promise.all(answers.map(async (answer)=>{
        answer.option = await sails.models.option.findOne({id:answer.option.id}).populate('survey')
        return answer
      }))
      return exits.success({
        message:"Answer created",
        data: resultAnswers
      })

    } catch (error) {

      return exits.error({
        message:"An unknown error occured please retry",
        error: error.message,
      });
      
    }

  }


};
