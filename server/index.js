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
    const sql = "UPDATE register_system.register_user SET is_block = ? WHERE regist_id = ?"
    const result = mysqlConnection.query(sql,[data, id], (err, data) => {
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
    const sql = "UPDATE register_system.register_user SET is_block = ? WHERE regist_id = ?"
    const result = mysqlConnection.query(sql,[data, id], (err, data) => {
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
    const result = mysqlConnection.query(
        "SELECT std.*, reg.is_block FROM register_system.students std, register_system.register_user reg WHERE std.std_id = reg.regist_id AND reg.regist_type = '1' ", (err, row, data) => {
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

app.get("/students/getStudentByStudentId/:id", (req, res) => {
    const { id } = req.params
    let sql  = " select ";
        sql += "    std.*, ";
        sql += "    addr.user_address, ";
        sql += "    addr.sub_district, ";
        sql += "    addr.district, ";
        sql += "    addr.province, ";
        sql += "    addr.zipcode, ";
        sql += "    edu.std_faculty, ";
        sql += "    edu.std_major, ";
        sql += "    edu.std_level, ";
        sql += "    edu.std_type, ";
        sql += "    edu.t_advisor_id, ";
        sql += "    (select t_firstname ";
        sql += "        from  register_system.teachers ";
        sql += "        where t_id = edu.t_advisor_id ";
        sql += "    ) as t_name, ";
        sql += "    (select t_lastname ";
        sql += "        from register_system.teachers ";
        sql += "         where t_id = edu.t_advisor_id ";
        sql += "    ) as t_lastname ";
        sql += " from ";
        sql += "    register_system.students std, ";
        sql += "    register_system.education_data edu, ";
        sql += "    register_system.address_user addr ";
        sql += " where std.std_id = edu.std_id ";
        sql += "    and std.std_id = addr.user_id ";
        sql += "    and std.std_id = ? ";

    const result = mysqlConnection.query(sql, [id], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
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

app.get("/students/checkStudentPersonalData/:id", (req, res) => {
    const { id } = req.params
    const result = mysqlConnection.query("SELECT * FROM register_system.students WHERE std_id = ?",[id], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

app.get("/students/checkStudentEducationData/:id", (req, res) => {
    const { id } = req.params
    const result = mysqlConnection.query("SELECT * FROM register_system.education_data WHERE std_id = ?",[id], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

// app.post("/students/insert", async (req, res) => {
//     const { id,username, password, email, phone, type, block, status } = req.body
//     const result = mysqlConnection.query("INSERT INTO register_system.register_user (regist_id, regist_username, regist_password, regist_email, regist_phone, regist_type, is_block, regist_status) VALUES (?,?,?,?,?,?,?,?)",[id,username,password,email,phone,type,block,status], (err, data) => {
//         if(!err) {
//             data.message = "Insert student successful"
//             res.send(data)
//         } else {
//             res.send(err.message)
//         }
//     })
// });

app.post("/students/addStudentPersonalData", async (req, res) => {
    const { std_id, firstname, lastname, age, gender, birthday, address, zipcode } = req.body
    let result = {
        isError:false,
        message: "Add student data complete"
    }

    mysqlConnection.beginTransaction((err) => {
        if (!err){ //{ throw err; }
            mysqlConnection.query("INSERT INTO register_system.students (std_id, std_firstname, std_lastname, std_age, std_gender, std_birthday) VALUES (?,?,?,?,?,?)",
                [std_id, firstname, lastname, age, gender, birthday], (err, data, fields) => {
                if (err) {
                    result.isError=true
                    result.message=""
                    res.send(result)
                    return mysqlConnection.rollback(() => {
                        throw err;
                    });
                }
        
                mysqlConnection.query("INSERT INTO register_system.address_user (user_id, user_address, sub_district, district, province, zipcode) VALUES (?,?,?,?,?,?)", 
                    [std_id, address, "test", "test", "test", zipcode], (err, data, fields) => {
                    if (err) {
                        result.isError=true
                        result.message=""
                        res.send(result)
                        return mysqlConnection.rollback(() => {
                            throw err;
                        });
                    }

                    mysqlConnection.commit((err) => {
                        if (err) {
                            return mysqlConnection.rollback(() => {
                                throw err;
                            });

                        } else {
                            res.send(result)
                        }
                    });
                });
            });
        }

      });
});

app.post("/students/addStudentEducationData", async (req, res) => {
    const resData = {
        isError:false,
        message:"Add student education data complete"
    };

    const { std_id, faculty, major, level, type } = req.body
    const result = mysqlConnection.query("INSERT INTO register_system.education_data (std_id, std_faculty, std_major, std_level, std_type, t_advisor_id) VALUES (?,?,?,?,?,?)", 
        [std_id, faculty, major, level, type, "0"], (err, data) => {
        if(!err) {
            res.send(resData)
        } else {
            resData.isError=true
            resData.message=err.message
            res.send(resData)
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

app.get("/teachers/checkTeacherPersonalData/:id", async (req, res) => {
    const { id } = req.params
    let sql  = " select ";
        sql += "      t.t_id, ";
        sql += "      addr.user_id ";
        sql += " from ";
        sql += "      register_system.teachers t,  ";
        sql += "      register_system.address_user addr ";
        sql += " where ";
        sql += "      t.t_id = addr.user_id ";
        sql += " and t.t_id = ? ";

    const result = mysqlConnection.query(sql, [id], (err, row) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })

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
app.get("/subjects", async (req, res) => {
    let sql  = " select ";
        sql += "    sj.id, ";
        sql += "    sj.sj_code, ";
        sql += "    sj.sj_name, ";
        sql += "    sj.sj_credit, ";
        sql += "    sj.sj_teacher_id, ";
        sql += "    (select t_firstname ";
        sql += "        from register_system.teachers ";
        sql += "        where sj.sj_teacher_id = t_id ";
        sql += "    ) as t_firstname, ";
        sql += "    (select t_lastname ";
        sql += "        from register_system.teachers ";
        sql += "        where sj.sj_teacher_id = t_id ";
		sql += "    ) as t_lastname ";
        sql += " from ";
        sql += "    register_system.subjects sj, ";
        sql += "    register_system.teachers t ";
        sql += " where ";
        sql += "    sj.sj_teacher_id = t.t_id ";

    const result = mysqlConnection.query(sql, (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

app.post("/subjects/addSubject", (req, res) => {
    let resData = {
        isError:false,
        message: ""
    };

    const { code, name, credit, t_id} = req.body
    let sql  = " insert into register_system.subjects ";
        sql += " (sj_code, sj_name, sj_credit, sj_teacher_id) ";
        sql += "  values ";
        sql += " (?,?,?,?) ";

    const result = mysqlConnection.query(sql, [code, name, credit, t_id], (err, data) => {
        if(!err) {
            resData.isError=false
            resData.message="Add new subject complete"
            res.send(resData)

        } else {
            resData.isError=true
            resData.message=err.message
            res.send(resData)
        }
    })
});

// Messages
app.get("/messages", async (req, res) => {
    const result = mysqlConnection.query("SELECT * FROM register_system.messages", (err, row, data) => {
        if(!err) {
            res.send(row)
        } else {
            res.send(err.message)
        }
    })
});

// Other //
app.post("/others/registerUser", async (req, res) => {
    const { id,username, password, email, phone, type, block, status } = req.body
    const result = mysqlConnection.query("INSERT INTO register_system.register_user (regist_id, regist_username, regist_password, regist_email, regist_phone, regist_type, is_block, regist_status) VALUES (?,?,?,?,?,?,?,?)",[id,username,password,email,phone,type,block,status], (err, data) => {
        if(!err) {
            data.message = "Register user successful"
            res.send(data)
        } else {
            res.send(err.message)
        }
    })
});

app.get("/others/checkDuplicateUsername/:username", async (req, res) => {
    const { username } = req.params
    const result = mysqlConnection.query("SELECT regist_username FROM register_system.register_user WHERE regist_username = ?",[username], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.get("/others/checkDuplicateEmail/:email", async (req, res) => {
    const { email } = req.params
    const result = mysqlConnection.query("SELECT regist_email FROM register_system.register_user WHERE regist_email = ?",[email], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
            res.send(err.message)
        }
    })
});

app.put("/others/updateUsernameAndPasswordById/:id", async (req, res) => {
    const { id } = req.params
    const { password } = req.body
    const resutl = mysqlConnection.query("UPDATE register_system.register_user SET regist_password = ? WHERE id = ?", [password, id], (err, data) => {
        if(!err) {
            data.message = "Update password succressful"
            res.send(data)
        } else if(err){
            res.send(err.message)
        }
    })
});

app.get("/others/getUserDataByUsername/:username", async (req, res) => {
    const { username } = req.params
    const result = await mysqlConnection.query("SELECT * FROM register_system.register_user WHERE regist_username = ?",[username], (err, row, data) => {
        if(!err) {
            res.send(row)
        } else if(err) {
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
