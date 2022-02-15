import express from 'express';
import UserController from "./controllers/UserController";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import UserDao from "./daos/UserDao";
import TuitController from "./controllers/TuitController";
import TuitDao from "./daos/TuitDao";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";


// Connect to database
const app = express();
mongoose.connect('mongodb+srv://tangk01:' + process.env.DB_PASSWORD +
    '@cluster0.nfgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


// Creates RESTful API
app.use(bodyParser.json())

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
  res.send(req.params.a + req.params.b);
})

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
const likesController = LikeController.getInstance(app);
const followsController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);