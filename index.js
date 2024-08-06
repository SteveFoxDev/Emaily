const express = require('express');

const app = express();

app.get('/',  (req, res, next) => {
    res.send({hi: 'there',
        steve: 'cool'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});