
/**
 * User Model:
 *  email, firstName, lastName, password, emailConfirmed?, confirmationToken, registrationDate,
 *  resetPasswordToken, resetPasswordTime, role (admin, member)
*/

const { DataTypes, Model, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

class User extends Model {

    static associate(models) {
        // define association here
    }
}

User.init({

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    confirmationStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    emailConfirmationToken: {
        type: DataTypes.STRING
    },

    registrationDate: {
        type: DataTypes.BIGINT    
    },

    passwordResetToken: {
        type: DataTypes.STRING
    },

    resetPasswordTime: {
        type: DataTypes.BIGINT  // unix timestamp of reset passwd request
    },

    role: {
        type: DataTypes.ENUM("admin", "member"),
    }
},

{
    sequelize,
    tableName: 'users',
    modelName: 'User'
});

// Create table
User
.sync({ force: true })
.then(() => console.log('Table created'))
.catch(console.log);



module.exports = User;
