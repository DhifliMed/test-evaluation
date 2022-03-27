module.exports = {
  tableName: "surveys",
  attributes: {
    question: {
      type: 'string',
      unique: true,
      required: true
    },
    options: {
      collection: 'option',
      via: 'survey'
    }
  }
};

