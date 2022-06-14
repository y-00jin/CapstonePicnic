const express = require('express');
const app = express();
const multer = require("multer");
const path = require('path');

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

let filename = [];
let filepath = '';

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 테이블 읽어오기
const {
    T_member,
    T_memory,
    T_file,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;')


// 테이블 읽어오기
// const {
//     T_memory,
//     Sequelize1: { Op2 },
//   } = require('./models');
// sequelize1.query('SET NAMES utf8;')

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
// app.post('/api/keywordSingleData', (req, res) => {
//     T_member.findOne({
//         where: { id : req.body.id}
//     })
//     .then( result => { res.send(result) })
//     .catch( err => { throw err })
// })


// Calendar.jsx & PhotoAlbum -> id로 t_memory 테이블 memory_date 조회
app.post('/api/getMemoryDate', (req, res) => {
    T_memory.findAll({
        // attributes: [sequelize.fn('DATE_FORMAT', sequelize.col('memory_date'), '%d')],
        // where: {[Op2.and]: [{creator_id : req.body.sessionId },sequelize.where(sequelize.fn('month', sequelize.col(memory_date)), req.body.getCurMonth )]}   //// 여기부터 수정
        where: { creator_id : req.body.sessionId },
        order:[['memory_date', 'ASC']]
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

// PhotoAlbum.js -> id, searchPlace, dateStart, dateEnd로 t_memory테이블 조회
app.post('/api/getMemorySearch', (req, res) => {
    T_memory.findAll({
               
        where: {[Op.and]: [{creator_id : req.body.sessionId },
            {title:{[Op.like] : '%' + req.body.searchPlace + '%'}},
            {memory_date:{[Op.between]: [req.body.dateStart, req.body.dateEnd]}}]}
            
    
        // where: { creator_id : req.body.sessionId }
        })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

// PhotoAlbum.js -> id, searchPlace, dateStart, dateEnd로 t_memory테이블 조회
app.post('/api/getMemorySearchNoTitle', (req, res) => {
    T_memory.findAll({
               
        where: {[Op.and]: [{creator_id : req.body.sessionId },
            {memory_date:{[Op.between]: [req.body.dateStart, req.body.dateEnd]}}]}
            
    
        // where: { creator_id : req.body.sessionId }
        })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

// PhotoAlbum.js -> id, searchPlace, dateStart, dateEnd로 t_memory테이블 조회
app.post('/api/getMemorySearchNoDate', (req, res) => {
    T_memory.findAll({
               
        where: {[Op.and]: [{creator_id : req.body.sessionId },
            {title:{[Op.like] : '%' + req.body.searchPlace + '%'}}
            ]}
    
        // where: { creator_id : req.body.sessionId }
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

// 파일 업로드
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "C:/Capstone/picnic-front/src/uploads");
      filepath = "C:/Capstone/picnic-front/src/uploads";
    },
    filename: function (req, file, cb) {
      const newFileName = Date.now() + path.extname(file.originalname)
      cb(null, newFileName);
      filename.push(newFileName);
      console.log( "파일 이름 배열" + filename)
    },
  });
  
  var upload = multer({ storage: storage });
  
  var uploadMultiple = upload.array('memory')

  app.post('/api/upload', uploadMultiple, function (req, res, next) {

      if (req.files.length === 0) {
              return res.status(400).json({ msg: '파일을 하나 이상 업로드 해주세요' });
      } else if(req.files){
          console.log(req.files)
          console.log("files uploaded")

          return res.status(200).send();
      }
  })
  
// memory_idx 조회
app.post('/api/findMemoryIdx', (req, res) => {
    console.log(req.body.search_memory_date)
    T_memory.findAll({
        where: {[Op.and]: [{search_memory_date : req.body.search_memory_date},{creator_id : req.body.creator_id}]}
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

// FileUpload.js -> 텍스트 추가
app.post('/api/memoryWrite', (req, res) => {
    console.log(req.body);

    T_memory.create({
        title: req.body.title,
        contents: req.body.contents,
        memory_date : req.body.memory_date,
        creator_id : req.body.creator_id,
        search_memory_date : req.body.search_memory_date,
    })
    .then( result => {
        res.send(result)
    }).catch( err => {
        console.log(err)
        throw err;
    })
})


// t_file 조회
app.post('/api/getFile', (req, res) => {
    T_file.findAll({

        where: {[Op.and]: [{creator_id : req.body.sessionId },
            {file_seq:{[Op.like] : '1'}},
            {memory_idx: req.body.memory_idx}
            ]},
        order:[['memory_date', 'ASC']]
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})


// FileUpload.js -> 사진 추가
app.post('/api/fileUpload', (req, res) => {

    // const newName = () => multer.diskStorage({
    //     filename: function (req, file, cb) {
    //       cb(null, Date.now() + path.extname(req.body.original_name));
    //       filename = Date.now() + path.extname(req.body.original_name);
    //     },
    // });
    
    let i = req.body.file_seq;
    let newFilename = filename[i-1]

    console.log(newFilename);

    console.log(req.body);

    T_file.create({
        memory_idx: req.body.memory_idx,
        file_seq: req.body.file_seq,
        file_name: newFilename,
        file_path : filepath + "/" + newFilename,
        creator_id : req.body.creator_id,
        memory_date : req.body.memory_date,
    })
    .then( result => {
        res.json({ msg: '추억 저장!' , result: result})
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
