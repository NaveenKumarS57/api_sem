const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(
            `insert into login(mailid,password,name,empid)
                    values(?,?,?,?)`,
            [
                data.mailid,
                data.password,
                data.name,
                data.empid
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack=>{
        pool.query(
            `select id,mailid,password,name,empid from login`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    getUserByUserId: (id, callBack)=>{
        pool.query(
            `select id,mailid,password,name,empid from login where id = ?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },
    updateUser: (data, callBack)=>{
        pool.query(
            `update login set password=?,name=?,empid=? where mailid = ?`,
            [
                data.password,
                data.name,
                data.empid,
                data.mailid
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    deleteUser: (data, callBack)=>{
        pool.query(
            `delete from login where id = ?`,
            [
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                // if(results.affectedRows)
                // return callBack(null,data.id);
                return callBack(null,results.affectedRows);
                // return callBack(null,0);
            }
        );
    },
    getUserByUserMail: (mail, callBack)=>{
        pool.query(
            `select * from login where mailid = ?`,
            [mail],
            (error, results, fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};