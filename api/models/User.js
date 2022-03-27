module.exports = {
  tableName: "users",
  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      isEmail: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
    }
  },
  customToJSON: function () {
    // prevent passwer from return statements
    return _.omit(this, ["password"]);
  },
  beforeCreate: async function (values, proceed) {
    // Hashing the password before saving the model
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
    return proceed();
  },
};

