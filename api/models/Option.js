module.exports = {
  tableName: "options",
  attributes: {
    content: {
      type: 'string',
      required: true
    },
    survey:{
      model: 'survey'
    }
  }
};

