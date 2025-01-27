const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exist. Please chose a different username.")
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }


app.post('/', async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("User Cannot be Found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render('home');
        } else {
            req.send('Wrong Password')
        }
    } catch {
        res.send('Wrong Details')
    }

})

});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});