const express = require('express');
const req = require('express/lib/request');
var router = express.Router();

const dbConfig = require("../db.config.js")

// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

const Pool = require('pg').Pool

// const pool = new Pool({
//   // user: '',
//   // host: 'arjuna.db.elephantsql.com',
//   // database: '',
//   // password: '',
//   // port: 5432,
// })

const pool = new Pool ({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
})

//return all entries
router.get('/getAllEntries', (request, response) => {
    console.log("getAllEntries running")
      pool.query('SELECT * FROM my_bookmarks', (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
        // response.status(200).json("results.rows")
      })
    })

//return single entry based on bmk_id
router.post('/getEntryById', (request, response) => {
  console.log("getEntryById running: ", request.body.bmk_id)
pool.query('SELECT * FROM  my_bookmarks WHERE bmk_id = $1', [request.body.bmk_id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).json(results.rows)
})
})

//get entries using search text
router.post('/getEntryByText', (request, response) => {
  console.log("getEntryByText running: ", request.body.bmk_queryText)
pool.query('SELECT * FROM  my_bookmarks WHERE bmk_description ILIKE $1', [request.body.bmk_queryText], (error, results) => {
  if (error) {
    throw error
  }
  console.log(results.rowCount)
  response.status(200).json(results.rows)
})
})

//add new entry
router.post('/createNewBookmark', (request, response) => {
const { bmk_id, bmk_description, bmk_link, bmk_comments, bmk_edit_date, bmk_create_date } = request.body
console.log(request.body)
  console.log("create new running")
    pool.query('INSERT INTO my_bookmarks (bmk_id, bmk_description, bmk_link, bmk_comments, bmk_edit_date, bmk_create_date) VALUES ($1, $2, $3, $4, $5, $6)', 
              [bmk_id, bmk_description, bmk_link, bmk_comments, bmk_edit_date, bmk_create_date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(JSON.stringify(`Entry added with ID: ${request.body.bmk_id}`)) 
    })
  })

//delete entry
router.delete('/deleteOneBookmark', (request, response) => {
console.log("deleteOneBooking running: ", request.body.bmk_id)
  pool.query('DELETE FROM my_bookmarks WHERE bmk_id = $1', [request.body.bmk_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(JSON.stringify(`Bookmark number ${request.body.bmk_id} has been deleted`))
  })
})


router.put('/updateSingleItem', (request, response) => {
  console.log("updateSingleItem running using item: ", request.body.bmk_id)
  // const id = parseInt(request.params.id)
  const { bmk_description, bmk_link, bmk_comments, bmk_edit_date, bmk_id } = request.body
console.log("update user run")
  pool.query('UPDATE my_bookmarks SET bmk_description = $1, bmk_link = $2, bmk_comments = $3, bmk_edit_date = $4 WHERE bmk_id = $5', 
          [bmk_description, bmk_link, bmk_comments, bmk_edit_date, bmk_id ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(JSON.stringify(`Bookmark number ${request.body.bmk_id} has been updated`))
    }
  )
})

module.exports = router;
