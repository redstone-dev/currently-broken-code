const express = require('express')
const crypto = require('crypto')

const app = express()

function genSalt() {
    let salt = "";
    for (let i = 0; i < 16; i++) {
        salt.concat(Math.floor(Math.random() * 100) / 100)
    }
    return salt
}

app.use((req, res, next) => {
    const encryptedIP = crypto.scryptSync(req.ip, genSalt(), 8).toString('hex');
    const dateObj = new Date();

    const dateString = dateObj.toDateString() + "T" + dateObj.toTimeString().toString()

    console.log(`IP: ${encryptedIP} at ${dateString}`);
    res.send("Query handled")
    next();
})

// app.get('/follower_count/:username', (req, res) => {
//     console.log(req.params)
//     const followerCount = fetch('https://thingproxy.freeboard.io/fetch/https://api.scratch.mit.edu/users/' + req.params[0] + '/followers')
//         .then((response) => response.text)
//         .then((data) => {
//             let json = JSON.parse(data)
//             console.log(data)
//             if (!json.ok || json.status !== 200) {
//                 return 'Response from Scratch API was not OK'
//             } else {
//                 console.log(json.toString.length)
//                 return json.toString.length
//             }
//         })
//     res.send(followerCount)
// })

app.listen(3001, () => {
    console.log('Listening on port 3001')
})