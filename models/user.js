
/**
 * User Model:
 *  email, firstName, lastName, password, emailConfirmed?, confirmationToken, registrationDate,
 *  resetPasswordToken, resetPasswordTime, role (admin, member)
*/

const bcrypt = require('bcrypt');
const { DataTypes, Model, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

class User extends Model {

    static associate(models) {
        // define association here
    }

    async comparePassword(login_password) {
        try {
            const isPassword = await bcrypt.compare(login_password, this.password);
            return isPassword;
        } catch (error) {
            console.log(error);   
        }
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

    role: {
        type: DataTypes.ENUM("admin", "member"),
        defaultValue: "member"
    }
},

{
    hooks: {
        beforeCreate: async (User) => {
            if(User.isNewRecord) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(User.password, salt);
                User.password = hashedPassword;
            }
        },

        beforeSave: async (User) => {
            if(User.isNewRecord === false) { // run if record is not new
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(User.password, salt);
                User.password = hashedPassword;
            } 
        }
    },
    sequelize,
    tableName: 'users',
    modelName: 'User'
});


    

// Create table
User
.sync()
.then(() => console.log('Table created'))
.catch(console.log);



module.exports = User;
