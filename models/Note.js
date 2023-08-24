const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Note = sequelize.define('Note', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNul : false
    },
    tag : {
        type : Sequelize.INTEGER,
        allowNul : false
    },
    title : {
        type : Sequelize.STRING,
        allowNul : false
    },
    description : {
        type : Sequelize.STRING,
        allowNul : false
    }
});

module.exports = Note;