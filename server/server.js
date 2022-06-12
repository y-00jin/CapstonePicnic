const express = require('express');
const app = express();
// const fileUpload = require('express-fileupload');
const multer = require("multer");
const path = require('path')

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(fileUpload());

// 파일 업로드
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../src/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  var upload = multer({ storage: storage });
  
  var uploadMultiple = upload.array('memory')
  
  app.get("/Memory", (req, res) => {
    
  });
  
  app.post('/api/upload', uploadMultiple, function (req, res, next) {

      if (req.files.length === 0) {
              return res.status(400).json({ msg: '파일을 하나 이상 업로드 해주세요' });
      } else if(req.files){
          console.log(req.files)
          console.log("files uploaded")

          return res.status(200).json({ msg: '추억 저장!' });
      }
      
  })

// app.post('/api/upload', (req, res) => {
//     if (req.files === null) {
//       return res.status(400).json({ msg: '파일을 하나 이상 업로드 해주세요' });
//     }
  
//     const file = req.files.file;
//     const newFileName = new Date().valueOf() + file.name;

//     console.log(newFileName);
    
//     file.mv(__dirname + '/../src/uploads/' + newFileName, err => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send(err);
//       }
      
//       res.json({ fileName: newFileName, filePath: '/uploads/' + newFileName });
//     });
//   });

// 테이블 읽어오기
const {
    T_member,
    Sequelize: { Op },
  } = require('./models');
sequelize.query('SET NAMES utf8;')


// 테이블 읽어오기
const {
    T_memory,
    Sequelize: { Op2 },
  } = require('./models');
sequelize.query('SET NAMES utf8;')

// SignUp.js -> 데이터 추가
app.post('/api/add', (req, res) => {
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

// app.get('/api/data', (req, res) => {
//     T_member.findAll()
//      .then( result => { res.send(result) })
//      .catch( err => { throw err })
//  }) 

// Change.js -> 데이터 조회 (id 조회)
app.post('/api/keywordId', (req, res) => {
    T_member.findAll({
        where: {[Op.and]: [{id : req.body.id },{name:req.body.name}]}
        // where: { id : req.body.id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

// Change.js -> 비밀번호 변경
app.post('/api/updatePw', (req, res) => {
    T_member.update({ password : req.body.pw }, {
        where : { id : req.body.id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})


// SignUp.js -> 데이터 조회 (id 조회)
app.post('/api/keywordData', (req, res) => {
    T_member.findAll({
        where: { id : req.body.id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

// Login.js -> id 조회
app.post('/api/keywordSingleData', (req, res) => {
    T_member.findOne({
        where: { id : req.body.id}
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})


// Calendar.jsx -> id로 t_memory 테이블 memory_date 조회
app.post('/api/getMemoryDate', (req, res) => {
    T_memory.findAll({
        // attributes: [sequelize.fn('DATE_FORMAT', sequelize.col('memory_date'), '%d')],
        // where: {[Op2.and]: [{creator_id : req.body.sessionId },sequelize.where(sequelize.fn('month', sequelize.col(memory_date)), req.body.getCurMonth )]}   //// 여기부터 수정
        where: { creator_id : req.body.sessionId }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})


// Calendar.jsx -> id, month로 일 조회
// app.post('/api/getDate', (req, res) => {
//     T_memory.findAll({
//         where: {[OP.and]:[{creator_id : req.body.id}, sequelize.fn('MONTH', sequelize.col('memory_date')), req.body.currentMonth]}  
//     })
//     .then( result => { res.send(result) })
//     .catch( err => { throw err })
// })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
