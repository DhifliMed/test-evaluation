module.exports = {
  tableName: "answers",
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    option: {
      model: 'option',
      required: true
    }
  }
};

