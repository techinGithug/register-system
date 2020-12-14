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
// Admin
app.get("/admins", async (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.admins", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.get("/admins/getByUsername/:username", async (req, res) => {
    const { username } = req.params
    const result = mysqlConnection.query("SELECT * FROM register_system.admins WHERE am_username = ?",[username], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.put("/admins/blockStudent/:id", async (req, res) => {
    const { id } = req.params
    const { data } = req.body
    const result = mysqlConnection.query("UPDATE register_system.students SET is_block = ? WHERE id = ?",[data, id], (err, data) => {
        if(!err) {
            data.message = "Blocked this student successful"
            res.send(data)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.put("/admins/unblockStudent/:id", async (req, res) => {
    const { id } = req.params
    const { data } = req.body
    const result = mysqlConnection.query("UPDATE register_system.students SET is_block = ? WHERE id = ?",[data, id], (err, data) => {
        if(!err) {
            data.message = "Unblocked this student successful"
            res.send(data)
        } else if(err) {
            res.send(err.message)
        }
    })
});

// Student //
app.get("/students", async (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.students", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.get("/students/getByUsername/:username", async (req, res) => {
    const { username } = req.params
    const result = await mysqlConnection.query("SELECT * FROM register_system.register_user WHERE regist_username = ?",[username], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.get("/students/getById/:id", async (req, res) => {
    const { id } = req.params
    const result = await mysqlConnection.query("SELECT * FROM register_system.register_user WHERE id = ? ",[id], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    });
});

app.put("/students/updateById/:id", async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    const result = mysqlConnection.query("UPDATE register_system.students SET std_password = ? WHERE id = ?",[password, id], (err, data) => {
        if(!err) {
            data.message = "Update password successful"
            res.send(data)
        } else {
            res.send(err.message)
        }
    });
}); 

app.get("/students/getLastStudentId", async (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.register_user WHERE regist_type = '1' order by regist_id desc limit 1", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

app.post("/students/insert", async (req, res) => {
    const { id,username, password, email, phone, type, block, status } = req.body
    const result = mysqlConnection.query("INSERT INTO register_system.register_user (regist_id, regist_username, regist_password, regist_email, regist_phone, regist_type, is_block, regist_status) VALUES (?,?,?,?,?,?,?,?)",[id,username,password,email,phone,type,block,status], (err, data) => {
        if(!err) {
            data.message = "Insert student successful"
            res.send(data)
        } else {
            res.send(err.message)
        }
    })
});

// Teacher //
app.get("/teachers", (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.teachers", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

app.get("/teachers/getByUsername/:username", async (req, res) => {
    const { username } = req.params
    const result = mysqlConnection.query("SELECT * FROM register_system.teachers WHERE t_username= ?", [username], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    });
});

app.get("/teachers/getById/:id", async (req, res) => {
    const { id } = req.params
    const result = await mysqlConnection.query("SELECT * FROM register_system.teachers WHERE id = ? ",[id], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    });
});

app.put("/teachers/updateById/:id", async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    const result = mysqlConnection.query("UPDATE register_system.teachers SET t_password = ? WHERE id = ?",[password, id], (err, data) => {
        if(!err) {
            data.message = "Update password successful"
            res.send(data)
        } else {
            res.send(err.message)
        }
    });
}); 

// Subjects
app.get("/subjects", (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.subjects", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

// Messages
app.get("/messages", (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.messages", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

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
