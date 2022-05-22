const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 테이블 읽어오기
const {
    T_member,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;')

// 데이터 추가
app.post('/api/test', (req, res) => {
    console.log(req.body);

    T_member.create({
        id: req.body.id,
        password: req.body.password,
        name : req.body.name,
    })
    .then( result => {
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
