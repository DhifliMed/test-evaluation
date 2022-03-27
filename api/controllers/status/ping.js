// test api is working
module.exports = {


  friendlyName: 'Ping',


  description: 'Ping status.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    
    return {data:"pong"};

  }


};
