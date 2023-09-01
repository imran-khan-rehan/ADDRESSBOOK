const express = require('express');
const mongoose = require('mongoose');
const { user, contacts } = require('./model/models');
// const app = express();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const cookieParser = require('cookie-parser');
const { name } = require('ejs');
app.use(cookieParser());
mongoose.connect("mongodb://127.0.0.1:27017/addressBook", {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => console.log("connected to db")).catch(console.error);

app.get('/', (req, res) => {
    res.send("helo");
});

app.post('/register', async (req, res) => {
    try {

        const emailExists = await user.exists({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email address already exists' });
        }

        const newUser = new user({
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();

        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
app.post('/insertContact', async (req, res) => {
    contacts.findOne({ email: req.body.email, name: req.body.name }, (err, contact) => {
        if (err) {
            res.status(404).json("error in finding");
        }
        if (contact) {
            res.status(404).json("this contact already exist");
        }
        else {
            const newcontact = new contacts({
                email: req.body.email,
                name: req.body.name,
                number: req.body.number
            });
            newcontact.save();
            res.json(newcontact);
        }
    });
});

app.post('/deleteContact', (req, res) => {
    contacts.findOneAndDelete({ email: req.body.email, name: req.body.name }, (err, contact) => {
        if (err) {
            res.status(404).json({ error: "error in deletion" });

        }
        if (contact) {
            console.log("deleted success", req.body.name);
            res.json("successfully deleted");

        }
        else {
            res.json({ error: "an error in successfully deleted" });
        }
    });
});

app.post('/updateContact', (req, res) => {
    const updateFields = {};
console.log("in update function");
    if (req.body.newname) {
        updateFields.name = req.body.newname;
    }

    if (req.body.newNumber) {
        updateFields.number = req.body.newnumber;
    }

    // Add more fields as needed

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json("No fields to update");
    }
console.log(updateFields);
    contacts.updateOne(
        { email: req.body.email, name: req.body.oldname },
        { $set: updateFields },
        (err, contact) => {
            if (err) {
                return res.status(404).json("Error in updating");
            }
            if (contact.nModified > 0) {
                console.log("successfully update");
                return res.json("Successfully updated");
            } else {
                return res.status(404).json("Error in update, this is not an existence error");
            }
        }
    );
});


app.get('/getContacts/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const numbers = await contacts.find({ email }, 'name number');
      console.log(numbers);
      console.log(req.params.email);
      res.json(numbers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/login', async (req, res) => {
    const emailexist = await user.exists({ email: req.body.email });
    const passwordexist = await user.exists({ password: req.body.password });
    if (emailexist && passwordexist) {

        res.cookie('userEmail', req.body.email, { httpOnly: true }).status(200).json({ exist: "email exist" })
    }
    else {
        res.status(400).json("this email not exist");
    }
});

app.listen(3001, () => {
    console.log("server is starring");
})