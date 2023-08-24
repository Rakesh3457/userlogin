const sequelize = require('../database/connection');
const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
    try{
        const userNotes = await req.user.getNote();
        res.status(200).json(userNotes);
    }
    catch(err){
        console.log(err);
        res.status(500).json(null);
    }
} 

exports.postNote = async (req, res) => {
    try{
        await req.user.createNote({
            tag : req.body.tag,
            title : req.body.title,
            description : req.body.description
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(200).json(err.response);
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(null);
    }
}

exports.deleteNote = async (req, res) => {
    try{
        await Note.destroy({ where : {
            id : req.params.id
        }})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(200).json(err.response);
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(null);
    }
}

exports.editNote = async (req, res) =>{
    try{
        await Note.update({
            tag : req.body.tag,
            title : req.body.title,
            description : req.body.description
        }, { where : {
            id : req.params.id
        }})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(200).json(err.response);
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(null);
    }
}