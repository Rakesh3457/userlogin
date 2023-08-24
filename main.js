const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const sequelize = require('./database/connection');
const User = require('./models/User');
const Note = require('./models/Note');

const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const notesRoutes = require('./routes/notes');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
    if(req.cookies.user){
        req.user = await User.findOne({
            where : {
                jwt : req.cookies.user
            }
        });
    }
    next();
})

app.use('/user', userRoutes);
app.use('/note', notesRoutes);
app.use('/', homeRoutes);

Note.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Note);

sequelize.sync();

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server started running at : ${process.env.PORT_NUMBER}`);
});
