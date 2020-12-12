const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");

// const getTodos = require("./routes/getTodos");


// middleware
app.use(cors());
app.use(bodyParser.json());

// app.use("/todos", getTodos);


// ROUTES //
// create a todo 
// app.post("/todo", async (req, res) => {
//     const {todoDetails, todoDate, todoTime} = req.body
//     const newTodo = await mysqlConnection.query("INSERT INTO mydb.todos (todoDetails, todoDate, todoTime) VALUES (?,?,?)", 
//         [todoDetails, todoDate, todoTime], (err, data) => {
//         if(!err) {
//             data.message = "Create new todo successful"
//             res.send(data)
//         } else {
//             res.send(err.message)
//         }
//     });
// });
        
// get all todos
// app.get("/todos", async (req, res) => {
//     const allTodos = await mysqlConnection.query("SELECT * FROM mydb.todos", (err, row, data) => {
//         if(!err) {
//             res.send(row)
//         } else if(err) {
//            res.send(err.message)
//         }
//     });
// });

// get a todo
// app.get("/todo/:id", async (req, res) => {
//     const { id } = req.params
//     const getTodo = await mysqlConnection.query("SELECT * FROM mydb.todos WHERE todoId = ? ",[id], (err, row, data) => {
//         if(!err) {
//             res.send(row)
//         } else {
//             res.send(err.message)
//         }
//     });
// });

// update a todo
// app.put("/todo/:id", async (req, res) => {
//     const { id } = req.params
//     const { todoDetails, todoDate, todoTime } = req.body
//     const updateTodo = mysqlConnection.query("UPDATE mydb.todos SET todoDetails = ?, todoDate = ?, todoTime = ? WHERE todoId = ?",[todoDetails, todoDate, todoTime, id], (err, data) => {
//         if(!err) {
//             data.message = "Update successful"
//             res.send(data)
//         } else {
//             res.send(err.message)
//         }
//     });
// }); 

// delete a todo
// app.delete("/todo/:id", (req, res) => {
//     const { id } = req.params
//     const deleteTodo = mysqlConnection.query("DELETE FROM mydb.todos WHERE todoId = ?", [id], (err, data) => {
//         if(!err) {
//             data.message = "Delete successful"
//             res.send(data)
//         } else {
//             res.send(err.message)
//         }
//     });
// });

app.listen(5000, () => {
    console.log("server has started on port 5000...")
});
