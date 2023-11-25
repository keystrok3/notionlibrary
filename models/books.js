const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../config/db');

class Books extends Model {

    static associate(models) {
        //associations
    }
}


Books.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },

    author: {
        type: DataTypes.STRING,
    },

    number_available: {
        type: DataTypes.INTEGER
    }
}, {
    
    sequelize,
    tableName: 'books',
    modelName: 'Books'   
});


// Create table
Books
.sync()
.then(() => console.log("Table Created"))
.catch(console.log);


module.exports = Books;