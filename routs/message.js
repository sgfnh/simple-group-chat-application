const express = require('express');
const data = require('./data');
// const { use } = require('./login');
const fs = require("fs")
const router = express.Router();

router.get(`/`, (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            console.log(err)
            data = "No chat exist"
        }
        res.send(`${data}<form action="/" onsubmit= "document.getElementById('username').value=localStorage.getItem('username')"
    method="POST"><input id="message" name="message" type="text"placeHolder="message">
    <input type="hidden" name="username" id="username">
    <button type="submit">send</button></form>`)
    })
})
router.post(`/`, (req, res, next) => {

    data.push(`{${req.body.username}:${req.body.message}}`)
    console.log(data);
    console.log(`${req.body.username}:${req.body.message}`);
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, { flag: 'a' }, (err) => {
        err ? console.log(err) : res.redirect('/')
    })
    res.redirect(`/`)
})
module.exports = router