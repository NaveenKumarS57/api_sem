const{ create, 
    getUserByUserId, 
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserMail } = require("./user.service");

const{ genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { bcrypt } = require("bcrypt");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getUserByUserId: (req, res)=>{
        const id = req.params.id;
        getUserByUserId(id, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req,res)=>{
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "there is no record"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "updated seccessfully"
            });
        });
    },
    deleteUser: (req,res)=>{
        const id = req.body;
        deleteUser(data, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 1,
                    message: "there is no record"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    },
    login: (req,res)=>{
        const body = req.body;
        getUserByUserMail(body.mailid, (err, results)=>{
            if(err){
                console.log(err)
                return;
            }
            if(!results){
                return res.json({
                    seccess: 0,
                    message: "record not found"
                });
            }

            // (body.password === results.password)?result=true:result=false;
            
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results},"abc123",{
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successful",
                    token: jsontoken
                });
            }
            else{
                return res.json({
                    success: 0,
                    data: results.password,
                    data:body.password,
                    data: "Invalid email or password"
                });
            }
        });
    },
    signup: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    }
}