const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');
const { param } = require('../../routers');


exports.realEscapeString = (str) => {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
            // and double/single quotes
        }
    });
}

exports.RES = (str) => {
    console.log(str);
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
            // and double/single quotes
        }
    });
}






//DAPP ===================================================================
exports.searchByDID = (req, res, next) => {
    try {
        mycon.execute("SELECT user_m1.idUser,user_m1.email,user_m1.pword,user_m1.mobileno,user_m1.authcode,user_m1.`status`,user_m1.dateTime,user_m1.utypeId,user_m1.leader,user_m1.DID,user_m1.`name`,user_m1.address,user_m1.city,user_m1.whatsapp,user_m1.others,user_m1.job,user_m1.olduid,user_m1.other,user_m1.nic,user_m1.wallet,user_m1.trening_1,user_m1.trening_2 FROM user_m1 WHERE user_m1.DID=" + req.body.did,
            (error, rows, fildData) => {
                if (!error) {
                    if (rows.length > 0) {
                        res.send(rows);
                    } else {
                        res.send({ no: 'no' });
                    }
                } else {
                    // console.log(error);
                    res.send({ 'no': 'no' });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.addDID = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("INSERT INTO `user_m1` ( `email`, `mobileno`, `authcode`, `status`, `dateTime`, `utypeId`, `leader`, `DID`, `name`, `address`, `city`, `whatsapp`, `nic` ) " +
            " VALUES	(  '" + req.body.email + "', '" + req.body.mobileno + "','2', 0, '" + day + "', 6, '" + req.body.leader + "', '" + req.body.DID +
            "', '" + req.body.name + "', '" + req.body.address + "', '" + req.body.city + "', '" + req.body.whatsapp + "', '" + req.body.nic + "' )",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                    res.send({ 'no': 'no' });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.updateDID = (req, res, next) => {
    console.log(req.body);
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("UPDATE `user_m1` SET `email`='" + req.body.email + "',`mobileno`='" + req.body.mobileno +
            "',`authcode`='2',`status`=1,`dateTime`='" + day + "',`utypeId`=6,`leader`=" + req.body.leader + ",`DID`='" + req.body.DID +
            "',`name`='" + req.body.name + "',`address`='" + req.body.address + "',`city`='" + req.body.city +
            "',`whatsapp`='" + req.body.whatsapp + "', `nic`='" + req.body.nic + "' WHERE `idUser`=" + req.body.uid,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                    res.send({ 'no': 'no' });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getMeeting = (req, res, next) => {
    console.log(req.body);
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("SELECT meeting.id,meeting.shedule,meeting.link,meeting.pword,meeting.`status`,meeting.meetingid FROM meeting WHERE meeting.`status`=1",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                    res.send({ 'no': 'no' });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



// getAllUsers 
exports.getAllUsers = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser,userkey.`key`,uservalue.`value` FROM `user` INNER JOIN uservalue ON uservalue.userId=`user`.idUser INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey ORDER BY `user`.idUser ASC,userkey.keyOder ASC",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

// userLogin
exports.userLogin = (req, res, next) => {
    try {
        var q = "SELECT `user`.idUser,`user`.email,`user`.pword,`user`.mobileno,`user`.authcode,`user`.`status`,`user`.dateTime,`user`.utypeId FROM `user` WHERE `user`.email='" + req.body.email + "'";
        mycon.execute(q,
            (e, r, f) => {
                if (!e) {
                    var user = r[0];
                    console.log(user);
                    if (user) {
                        bcript.compare(req.body.pword, user.pword, (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(401).json({ message: 'user name or password is wrong' });
                            } else {
                                if (result) {
                                    const token = jwt.sign({
                                        uid: user.idUser,
                                        email: user.email,
                                        mobile: user.mobileno,
                                        uType: user.utypeId
                                    },
                                        process.env.JWT_KEY,
                                        {
                                            expiresIn: "1h"
                                        },
                                    );
                                    return res.status(200).json({
                                        mg: "Auth Successfull",
                                        token: token
                                    });
                                } else {
                                    return res.status(401).json({ message: 'user name or password is wrong' });
                                }
                            }
                        });
                    } else {
                        return res.status(401).json({ message: 'user name or password is wrong' });
                    }
                } else {
                    console.log(e);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



// userSignup(email,pword, mobile)
exports.signUp = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        var val = Math.floor(1000 + Math.random() * 9000);
        var q = "SELECT `user`.idUser FROM `user` WHERE `user`.email='" + req.body.email + "'";
        mycon.execute(q, (e, r, f) => {
            if (!e) {
                if (r.length > 0) {
                    return res.status(401).json({ message: 'This Email Address Alrady Exsist Please Login Or Register With Other Email' });
                } else {
                    bcript.hash(req.body.pword, 10, (err, hash) => {
                        if (err) {
                            return status(500).json({ error: err });
                        } else {
                            console.log(hash);
                            var qq = "INSERT INTO  `user`(  `email`, `pword`, `mobileno`, `authcode`, `status`, `dateTime`, `utypeId`)" +
                                " VALUES ( '" + req.body.email + "', '" + hash + "', '" + req.body.mobile + "', '" + val + "', '0', '" + day + "', 5)";
                            mycon.execute(qq, (ee, rr, ff) => {
                                if (!ee) {
                                    res.send({ uid: rr.insertId, email: req.body.email });
                                } else {
                                    console.log(ee);
                                    return status(500).json({ error: ee });
                                }
                            });
                        }
                    });
                }
            } else {
                console.log(e);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

exports.getUserKeys = (req, res, next) => {
    try {
        mycon.execute("SELECT userkey.idUserKey,userkey.`key`,userkey.keyStatus,userkey.keyOder,userkey.formId,userkey.val,userkey.type FROM userkey WHERE userkey.keyStatus=1 ORDER BY userkey.keyOder ASC",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.saveNewUser = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        console.log("00000000000");
        let values = req.body.values;
        let leader = values[0].val;
        console.log(leader);



        mycon.execute("INSERT INTO `user` (  `status`, `dateTime`, `utypeId`, `leader` ) VALUES (0, '" + day + "', 5, '" + leader + "' )",
            (error, rows, fildData) => {
                if (!error) {
                    let uid = rows.insertId;

                    if (req.body.t1 != undefined || req.body.t1 != null) {
                        console.log(req.body.t1);
                        mycon.execute("INSERT INTO `user_has_traning`( `user_id`, `traning_id`, `status`) VALUES ('" + uid + "', '" + req.body.t1 + "', 1)", (e, r, f) => {
                            if (!e) {
                                console.log(r);
                            }
                        })
                    }

                    if (req.body.t2 != undefined || req.body.chart2 != null) {
                        console.log(req.body.t2);
                        mycon.execute("INSERT INTO `user_has_traning`( `user_id`, `traning_id`, `status`) VALUES ('" + uid + "', '" + req.body.t1 + "', 1)", (e, r, f) => {
                            if (!e) {
                                console.log(r);
                            }
                        })
                    }


                    values.forEach(e => {
                        let q = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + uid + ", " + e.idUserKey + ", '" + e.val + "', 1)";
                        mycon.execute(q, (er, ro, fi) => {
                            if (!er) {
                                //  console.log(ro);
                            } else {
                                console.log(er)
                            }
                        });
                    });

                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

//(uid)
exports.searchUserById = (req, res, next) => {
    try {
        mycon.execute("SELECT userkey.`key`,uservalue.`value`,uservalue.idUserValue,uservalue.userId,uservalue.keyId,uservalue.valueStatus,userkey.keyOder,userkey.formId,userkey.type FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" + req.body.uid + "' ORDER BY userkey.keyOder ASC",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.sendLoginInformation = (uid) => {
    try {

        let link = "www.smartwin.lk/#/createpass"
        let mobile = '';
        let email = '';
        let name = '';
        let textMg = '';

        mycon.execute("SELECT userkey.`key`,uservalue.`value`,uservalue.idUserValue,uservalue.userId,uservalue.keyId,uservalue.valueStatus,userkey.keyOder,userkey.formId,userkey.type FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId= '" + uid + "' ORDER BY userkey.keyOder ASC", (e, r, f) => {
            if (!e) {
                r.forEach(el => {
                    if (el.keyId === 9) {
                        mobile = el.value;
                    }
                    if (el.keyId === 22) {
                        email = el.value;
                    }
                    if (el.keyId === 2) {
                        name = el.value;
                    }
                });

                var val = Math.floor(1000 + Math.random() * 9000);
                mycon.execute("UPDATE `user` SET `authcode`='" + val + "' WHERE `idUser`=" + uid, (er, ro, fi) => {
                    if (!er) {
                        console.log(ro);
                    }
                });

                console.log(mobile + ' -- ' + email + ' -- ' + name);

                textMg += "Welcome to Smart Win Entrepreneur !" +
                    "  Dear " + name + " your  SW No: " + uid + " and your verification number : " + val + "" +
                    "";


                mg.emailSend({
                    to: email,
                    subject: 'Smart Win Entrepreneur',
                    message: textMg
                });



                mg.smsSend({ mob: mobile, message: textMg });
                console.log(textMg);
                //  res.send({ ok: textMg });
            }
        });
    } catch (error) {
        console.log(error);
        //  res.status(500).send(error);
    }
}

exports.createPassword = (req, res, next) => {
    let b = req.body;
    try {
        mycon.execute("SELECT `user`.email,`user`.pword,`user`.mobileno,`user`.authcode,`user`.idUser,`user`.`status`,`user`.dateTime,`user`.utypeId FROM `user` WHERE `user`.idUser='" + b.uid + "' AND `user`.authcode='" + b.code + "'", (e, r, f) => {
            if (!e) {
                if (r[0] && r[0].idUser > 0) {

                    bcript.hash(req.body.pword, 10, (err, hash) => {
                        if (err) {
                            return status(500).json({ error: err });
                        } else {
                            console.log(hash);
                            mycon.execute("UPDATE  `user` SET  `pword` = '" + hash + "',  `authcode` = null, `status` = 1, `utypeId` = 3 WHERE	`idUser` = " + b.uid, (ee, rr, ff) => {
                                if (!ee) {
                                    res.send({ mg: "password created" });
                                }
                            });
                        }
                    });

                } else {
                    res.send({ mg: "Vreification Code is Wrong" });
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getTreeId = (req, res, next) => {
    try {
        mycon.execute("SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.userId='" + req.body.uid + "' ORDER BY sw_tree.swTreeId ASC LIMIT 1", (er, ro, fi) => {
            if (!er) {
                res.send(ro);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getUsersList = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser,uservalue.`value`,uservalue.keyId,userkey.keyOder,userkey.`key` FROM `user` INNER JOIN uservalue ON uservalue.userId=`user`.idUser INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey ORDER BY `user`.idUser ASC,userkey.keyOder ASC", (er, ro, fi) => {
            if (!er) {
                let uid = 0;
                let arr = new Array();
                let obj = {
                    idUser: '',
                    value1: '',
                    value2: '',
                    value3: '',
                    value4: '',
                    value5: '',
                    value6: '',
                    value7: '',
                    value8: '',
                    value9: '',
                    value10: '',
                    value11: ''
                };
                ro.forEach(e => {
                    uid = e.idUser;
                    if (uid != e.idUser) {
                        switch (e.keyOder) {
                            case 1: obj.value1 = e.value;
                                break;
                        }
                    } else {
                        obj.idUser = e.idUser;
                        switch (e.keyOder) {
                            case 1: obj.value1 = e.value;
                                break;
                            case 2: obj.value2 = e.value;
                                break;
                            case 3: obj.value3 = e.value;
                                break;
                            case 4: obj.value4 = e.value;
                                break;
                            case 5: obj.value5 = e.value;
                                break;
                            case 6: obj.value6 = e.value;
                                break;
                            case 7: obj.value7 = e.value;
                                break;
                            case 8: obj.value8 = e.value;
                                break;
                            case 9: obj.value9 = e.value;
                                break;
                            case 10: obj.value10 = e.value;
                                break;
                            case 11: obj.value11 = e.value;
                                arr.push(JSON.parse(JSON.stringify(obj)));
                                break;
                        }
                    }

                });
                console.log(arr);
                res.status(200).send(arr);
            } else {
                console.log(er);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.getUsersListByLeader = (req, res, next) => {
    try {
        mycon.execute("SELECT `user`.idUser,uservalue.`value`,uservalue.keyId,userkey.keyOder,userkey.`key` FROM `user` INNER JOIN uservalue ON uservalue.userId=`user`.idUser INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE `user`.leader='" + req.body.leader + "' ORDER BY `user`.idUser ASC,userkey.keyOder ASC", (er, ro, fi) => {
            if (!er) {
                let uid = 0;
                let arr = new Array();
                let obj = {
                    idUser: '',
                    value1: '',
                    value2: '',
                    value3: '',
                    value4: '',
                    value5: '',
                    value6: '',
                    value7: '',
                    value8: '',
                    value9: '',
                    value10: '',
                    value11: ''
                };
                ro.forEach(e => {
                    uid = e.idUser;
                    if (uid != e.idUser) {
                        switch (e.keyOder) {
                            case 1: obj.value1 = e.value;
                                break;
                        }
                    } else {
                        obj.idUser = e.idUser;
                        switch (e.keyOder) {
                            case 1: obj.value1 = e.value;
                                break;
                            case 2: obj.value2 = e.value;
                                break;
                            case 3: obj.value3 = e.value;
                                break;
                            case 4: obj.value4 = e.value;
                                break;
                            case 5: obj.value5 = e.value;
                                break;
                            case 6: obj.value6 = e.value;
                                break;
                            case 7: obj.value7 = e.value;
                                break;
                            case 8: obj.value8 = e.value;
                                break;
                            case 9: obj.value9 = e.value;
                                break;
                            case 10: obj.value10 = e.value;
                                break;
                            case 11: obj.value11 = e.value;
                                arr.push(JSON.parse(JSON.stringify(obj)));
                                break;
                        }
                    }

                });
                console.log(arr);
                res.status(200).send(arr);
            } else {
                console.log(er);
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}





exports.update = (req, res, next) => {
    try {
        req.body.udata.forEach(ee => {
            //  console.log(ee);
            if (ee.keyId == 4) {
                console.log(ee);
                mycon.execute("UPDATE `user` SET `leader` = '" + ee.value + "' WHERE `idUser` = '" + ee.userId + "'", (er, ro, ff) => {
                    if (!er) {
                        console.log(ro);
                    }
                });
            }

            this.updateUserValues(ee);
        });
        res.send({ "ok": "updated" });
        setTimeout(() => {
        }, 2000);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.updateUserValues = (parm) => {
    let q = "UPDATE `uservalue` SET `value`='" + this.realEscapeString(parm.value) + "' WHERE `idUserValue`= " + parm.idUserValue;
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            return;
        } else {
            console.log(er)
            return;
        }
    });
}

exports.saveUserValues = (parm) => {
    let q = "UPDATE `uservalue` SET `value`='" + this.realEscapeString(parm.value) + "' WHERE `idUserValue`= " + parm.idUserValue;
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            return;
        } else {
            console.log(er)
            return;
        }
    });
}


exports.getUserData = (parm) => {
    let q = "SELECT uservalue.keyId,uservalue.`value`,userkey.`key` FROM uservalue INNER JOIN userkey ON uservalue.keyId=userkey.idUserKey WHERE uservalue.userId='" + parm.id + "' ORDER BY userkey.keyOder ASC";
    mycon.execute(q, (er, ro, fi) => {
        if (!er) {
            return;
        } else {
            console.log(er)
            return;
        }
    });
}



exports.singalMessage = (req, res, next) => {

    mg.smsSend(req.body);

    res.send({ "sms": "ok" });
}


exports.checkForEmptyPinAndRegister = (req, res, next) => {
    let q = "SELECT sw_tree.swTreeId,sw_tree.parentId,sw_tree.A,sw_tree.B,sw_tree.userId,sw_tree.commitionId,sw_tree.APoint,sw_tree.BPoint,sw_tree.layar,sw_tree.`status`,sw_tree.userName,sw_tree.other1,sw_tree.other2 FROM sw_tree WHERE sw_tree.swTreeId= " + req.body.ref;
    mycon.execute(q, (er, ro, fi) => {
        mycon.execute("SELECT sw_commition.idCommition,sw_commition.register_date,sw_commition.userId,sw_commition.introducerid,sw_commition.introducerCommitionId,sw_commition.`status` FROM sw_commition WHERE sw_commition.userId='" + req.body.intro + "' ORDER BY sw_commition.idCommition ASC", (ee, rr, ff) => {
            let obj = {
                mg: '',
                message: ''
            };

            if (!er && !ee) {
                console.log("not error")
                if (ro[0] && rr[0]) {
                    console.log("not null")
                    mycon.execute("SELECT `user`.email,`user`.mobileno FROM `user` WHERE `user`.email='" + req.body.email + "'", (e, r, f) => {
                        if (!e) {

                            if (r[0] != null) {
                                console.log(r);
                                obj.mg = 'no';
                                obj.message = "Email Address Is Already Exist";
                                res.send(obj);
                                return;
                            } else {
                                console.log("ela");
                                let introCom = rr[0].idCommition;
                                if (ro[0].A == null) {
                                    console.log('AAAAA');
                                    obj.mg = 'A';
                                    req.body.side = 'A';
                                    req.body.introCom = introCom;
                                    this.signUpOnline(req.body);
                                } else if (ro[0].B == null) {
                                    console.log('BBBBB');
                                    obj.mg = 'B';
                                    req.body.side = 'B';
                                    req.body.introCom = introCom;
                                    this.signUpOnline(req.body);
                                } else {
                                    console.log('======');
                                    obj.mg = 'no';
                                    obj.message = "Referance Number is Wrong"
                                    res.send(obj);
                                    return;
                                }

                            }
                        } else {
                            console.log(e);
                            obj.mg = 'no';
                            obj.message = "Introducer Number is Wrong"
                            res.send(obj);
                            return;
                        }
                    });
                } else {
                    obj.mg = 'no';
                    obj.message = "Introducer Number is Wrong"
                    console.log('null');
                    res.send(obj);
                    return;
                }

            } else {
                console.log(er);
                res.send(er);
            }
        });
    });
}


exports.signUpOnline = (parm) => {
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var val = Math.floor(1000 + Math.random() * 9000);

    bcript.hash(parm.pword, 10, (err, hash) => {
        if (err) {
            return status(500).json({ error: err });
        } else {



            let q = "INSERT INTO `user` (`email`,`pword`,`mobileno`,`authcode`,`status`,`dateTime`,`utypeId`) VALUES ('" + parm.email + "','" + hash + "','" + parm.mobile + "','" + val + "',1,'" + day + "',3)";
            mycon.execute(q, (er, rr, fi) => {

                if (!er) {
                    userID = rr.insertId;

                    mycon.execute("INSERT INTO `sw_commition`(`register_date`, `userId`, `introducerid`, `introducerCommitionId`, `status`) " +
                        " VALUES ('" + day + "', " + userID + ", " + parm.intro + ", " + parm.introCom + ", 1)", (e, r, f) => {
                            if (!e) {
                                //  console.log(ro);
                            } else {
                                console.log(r)
                            }
                        }
                    );

                    let q = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + userID + ",1, '', 1)";
                    mycon.execute(q, (er, ro, fi) => {
                        if (!er) {
                            //  console.log(ro);
                        } else {
                            console.log(er)
                        }
                    });


                    let qq = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + userID + ",2, '" + parm.name + "', 1)";
                    mycon.execute(qq, (er, ro, fi) => {
                        if (!er) {
                            //  console.log(ro);
                        } else {
                            console.log(er)
                        }
                    });

                    let qqq = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + userID + ",22, '" + parm.email + "', 1)";
                    mycon.execute(qqq, (er, ro, fi) => {
                        if (!er) {
                            //  console.log(ro);
                        } else {
                            console.log(er)
                        }
                    });


                    for (let i = 3; i < 22; i++) {
                        let q = "INSERT INTO  `uservalue`(  `userId`, `keyId`, `value`, `valueStatus`) VALUES (  " + userID + ", " + i + ", '', 1)";
                        mycon.execute(q, (er, ro, fi) => {
                            if (!er) {
                                //  console.log(ro);
                            } else {
                                console.log(er)
                            }
                        });
                    }


                    mycon.execute("INSERT INTO  `sw_tree` (  `parentId`, `A`, `B`, `userId`, `commitionId`, `APoint`, `BPoint`, `layar`, `status`, `userName`, `other1`, `other2` ) " +
                        "  VALUES	( " + parm.ref + ", NULL, NULL, " + userID + ", NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0' )", (er, ro, fi) => {
                            if (!er) {
                                let treeId = ro.insertId;

                                if (parm.side === 'A') {
                                    mycon.execute("UPDATE `sw_tree` SET `A`='" + treeId + "' WHERE `swTreeId`=" + parm.ref, (errr, rooo, fiii) => {
                                        if (!errr) {
                                        } else {
                                            console.log(errr);
                                        }
                                    });
                                }
                                if (parm.side === 'B') {
                                    mycon.execute("UPDATE `sw_tree` SET `B`='" + treeId + "' WHERE `swTreeId`=" + parm.ref, (errr, rooo, fiii) => {
                                        if (!errr) {
                                        } else {
                                            console.log(errr);
                                        }
                                    });
                                }

                                let idA = null;
                                let idB = null;


                                // --------------------------

                                mycon.execute("INSERT INTO `sw_tree` ( `parentId`, `A`, `B`, `userId`, `commitionId`, `APoint`, `BPoint`, `layar`, `status`, `userName`, `other1`, `other2` )"
                                    + "  VALUES ( " + treeId + ", NULL, NULL, " + userID + ", NULL, 0, 0, 0, 0, '../../../assets/img/x-button.png', 0, '0' )", (err, roo, fii) => {
                                        if (!err) {
                                            idA = roo.insertId;
                                            mycon.execute("UPDATE `sw_tree` SET `A`='" + idA + "' WHERE `swTreeId`=" + treeId, (errr, rooo, fiii) => {
                                                if (!errr) {
                                                    mycon.execute("INSERT INTO `sw_tree` ( `parentId`, `A`, `B`, `userId`, `commitionId`, `APoint`, `BPoint`, `layar`, `status`, `userName`, `other1`, `other2` )"
                                                        + "  VALUES ( " + treeId + ", NULL, NULL, " + userID + ", NULL, 0, 0, 0, 0, '../../../assets/img/x-button.png', 0, '0' )", (err, roo, fii) => {
                                                            if (!err) {
                                                                idB = roo.insertId;
                                                                mycon.execute("UPDATE `sw_tree` SET `B`='" + idB + "' WHERE `swTreeId`=" + treeId, (errr, rooo, fiii) => {
                                                                    if (!errr) {
                                                                        return;

                                                                    } else {
                                                                        console.log(errr);
                                                                    }
                                                                });
                                                            } else {
                                                                console.log(err);
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    console.log(errr);
                                                }
                                            });
                                        } else {
                                            console.log(err);
                                        }
                                    }
                                );



                                // ------------------------------

                            } else {
                                console.log(er);
                            }
                        });
                } else {
                    console.log(er)



                    return;
                }
            });
        }

    });
}




exports.signUpPersanal = (req, res, next) => {
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    var val = Math.floor(1000 + Math.random() * 9000);

    mycon.execute("SELECT `user`.email,`user`.mobileno FROM `user` WHERE `user`.email='" + req.body.email + "'", (e, r, f) => {
        if (!e) {
            if (r[0] != null) {
                let obj = { "mg": "no", "message": "Email Address Is Already Exist" };
                res.send(obj);
            } else {
                bcript.hash(req.body.pword, 10, (err, hash) => {
                    if (err) {
                        return status(500).json({ error: err });
                    } else {
                        let q = "INSERT INTO `user` (`email`,`pword`,`mobileno`,`authcode`,`status`,`dateTime`,`utypeId`) VALUES ('" + req.body.email + "','" + hash + "','" + req.body.mobile + "','" + val + "',1,'" + day + "',4)";
                        mycon.execute(q, (er, rr, fi) => {
                            if (!er) {
                                userID = rr.insertId;
                                res.send(rr);
                            }
                        });
                    }
                });
            }
        } else {
            console.log(e);
        }
    });
}

// forgetPassword

// verify

// etc...


// KUMI
exports.getDistric = (req, res, next) => {
    try {
        mycon.execute("SELECT distric.iddistric,distric.distric_sinhala,distric.distric_english,distric.distric_status FROM distric",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getCitys = (req, res, next) => {
    try {
        mycon.execute("SELECT city.idcity,city.city_sinhala,city.city_english,city.distric_iddistric FROM city WHERE city.distric_iddistric=" + req.body.id,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getLeaders = (req, res, next) => {
    try {
        mycon.execute("SELECT leader.idleader,leader.leader FROM leader",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getTranings = (req, res, next) => {
    try {
        mycon.execute("SELECT traning.idTraning,traning.type_id,traning.plase,traning.date,traning.description FROM traning WHERE traning.type_id= " + req.body.tid,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getTraningsByUsers = (req, res, next) => {
    try {
        mycon.execute("SELECT user_has_traning.iduht,user_has_traning.user_id,user_has_traning.traning_id,user_has_traning.`status`,traning.plase,traning.date,traning.description,traning_type.type,traning_type.idTraningType FROM user_has_traning INNER JOIN traning ON traning.idTraning=user_has_traning.traning_id INNER JOIN traning_type ON traning.type_id=traning_type.idTraningType WHERE user_has_traning.user_id= " + req.body.uid,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.deleteTraning = (req, res, next) => {
    try {
        mycon.execute("DELETE from user_has_traning WHERE iduht = " + req.body.uht,
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



exports.setTrening = (req, res, next) => {
    try {
        let uid = req.body.uid;

        console.log(req.body);

        if (req.body.t1 != undefined || req.body.t1 != null) {
            console.log(req.body.t1);
            mycon.execute("INSERT INTO `user_has_traning`( `user_id`, `traning_id`, `status`) VALUES ('" + uid + "', '" + req.body.t1 + "', 1)", (e, r, f) => {
                if (!e) {
                    console.log(r);
                } else {
                    console.log(e);
                }
            })
        }

        if (req.body.t2 != undefined || req.body.chart2 != null) {
            console.log(req.body.t2);
            mycon.execute("INSERT INTO `user_has_traning`( `user_id`, `traning_id`, `status`) VALUES ('" + uid + "', '" + req.body.t2 + "', 1)", (e, r, f) => {
                if (!e) {
                    console.log(r);
                } else {
                    console.log(e);
                }
            })
        }
        res.send({ "ok": "done" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.getOldData = (req, res, next) => {
    try {
        mycon.execute("SELECT uservalue.idUserValue,uservalue.userId,CASE WHEN uservalue.keyId='1' THEN uservalue.`value` END AS DID,CASE WHEN uservalue.keyId='2' THEN uservalue.`value` END AS NameEka,CASE WHEN uservalue.keyId='4' THEN uservalue.`value` END AS Leader,CASE WHEN uservalue.keyId='5' THEN uservalue.`value` END AS Address,CASE WHEN uservalue.keyId='8' THEN uservalue.`value` END AS City,CASE WHEN uservalue.keyId='9' THEN uservalue.`value` END AS Mobile_Number,CASE WHEN uservalue.keyId='10' THEN uservalue.`value` END AS Whats_App_Number,CASE WHEN uservalue.keyId='11' THEN uservalue.`value` END AS Others,CASE WHEN uservalue.keyId='12' THEN uservalue.`value` END AS Other_1,CASE WHEN uservalue.keyId='13' THEN uservalue.`value` END AS Other_2,CASE WHEN uservalue.keyId='14' THEN uservalue.`value` END AS Other_3,CASE WHEN uservalue.keyId='21' THEN uservalue.`value` END AS National_ID_Number,CASE WHEN uservalue.keyId='22' THEN uservalue.`value` END AS Email,CASE WHEN uservalue.keyId='23' THEN uservalue.`value` END AS Wallet_Address FROM uservalue WHERE userId > 5 ORDER BY userId ASC",
            (error, rows, fildData) => {
                if (!error) {

                    var uid = 0;
                    var arr = [];
                    var obj = {
                        userId: 0,
                        DID: null,
                        NameEka: null,
                        Leader: null,
                        Address: null,
                        City: null,
                        Mobile_Number: null,
                        Whats_App_Number: null,
                        Others: null,
                        Other_1: null,
                        Other_2: null,
                        Other_3: null,
                        National_ID_Number: null,
                        Email: null,
                        Wallet_Address: null
                    }


                    const length = rows.length;
                    let x = 0;
                    recall = () => {
                        r = rows[x];
                        if (uid != r.userId) {
                            arr.push(obj);
                            this.insertOBJ(obj);

                            obj.DID = null;
                            obj.NameEka = null;
                            obj.Leader = null;
                            obj.Address = null;
                            obj.City = null;
                            obj.Mobile_Number = null;
                            obj.Whats_App_Number = null;
                            obj.Others = null;
                            obj.Other_1 = null;
                            obj.Other_2 = null;
                            obj.Other_3 = null;
                            obj.National_ID_Number = null;
                            obj.Email = null;
                            obj.Wallet_Address = null;

                            uid = r.userId;
                            obj.userId = r.userId;

                            if (r.DID) obj.DID = r.DID;
                            if (r.NameEka) obj.NameEka = r.NameEka;
                            if (r.Leader) obj.Leader = r.Leader;
                            if (r.Address) obj.Address = r.Address;
                            if (r.City) obj.City = r.City;
                            if (r.Mobile_Number) obj.Mobile_Number = r.Mobile_Number;
                            if (r.Whats_App_Number) obj.Whats_App_Number = r.Whats_App_Number;
                            if (r.Others) obj.Others = r.Others;
                            if (r.Other_1) obj.Other_1 = r.Other_1;
                            if (r.Other_2) obj.Other_2 = r.Other_2;
                            if (r.Other_3) obj.Other_3 = r.Other_3;
                            if (r.National_ID_Number) obj.National_ID_Number = r.National_ID_Number;
                            if (r.Email) obj.Email = r.Email;
                            if (r.Wallet_Address) obj.Wallet_Address = r.Wallet_Address;

                        } else {

                            if (r.DID) obj.DID = r.DID;
                            if (r.NameEka) obj.NameEka = r.NameEka;
                            if (r.Leader) obj.Leader = r.Leader;
                            if (r.Address) obj.Address = r.Address;
                            if (r.City) obj.City = r.City;
                            if (r.Mobile_Number) obj.Mobile_Number = r.Mobile_Number;
                            if (r.Whats_App_Number) obj.Whats_App_Number = r.Whats_App_Number;
                            if (r.Others) obj.Others = r.Others;
                            if (r.Other_1) obj.Other_1 = r.Other_1;
                            if (r.Other_2) obj.Other_2 = r.Other_2;
                            if (r.Other_3) obj.Other_3 = r.Other_3;
                            if (r.National_ID_Number) obj.National_ID_Number = r.National_ID_Number;
                            if (r.Email) obj.Email = r.Email;
                            if (r.Wallet_Address) obj.Wallet_Address = r.Wallet_Address;
                        }

                        setTimeout(() => {
                            if (rows.length > x) {
                                x++;
                                console.log(x);
                                recall();
                            } else {
                                res.send(arr);
                            }
                        }, 10);

                    }

                    recall();





                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.insertOBJ = (obj) => {
    console.log(obj);

    try {
        mycon.execute("INSERT INTO `user` (`email`,`mobileno`,`status`,`utypeId`,`leader`,`DID`,`name`,`address`,`city`,`whatsapp`,`others`,`job`,`olduid`,`other`,`nic`,`wallet`)" +
            " VALUES ('" + obj.Email + "','" + obj.Mobile_Number + "',0,1,'" + obj.Leader + "','" + obj.DID + "','" + obj.NameEka + "','" + obj.Address + "','" + obj.City + "','" + obj.Whats_App_Number + "','" + obj.Others + "','" + obj.Other_1 + "','" + obj.userId + "','" + obj.Other_3 + "','" + obj.National_ID_Number + "','" + obj.Wallet_Address + "')", (e, r, f) => {
                if (!e) {
                    console.log(r);
                }
            })
    } catch (error) {

    }
}

exports.setOldTrening = (req, res, next) => {

    try {
        mycon.execute("SELECT `user`.idUser,user_has_traning.user_id,traning.type_id,traning.plase,traning.date FROM `user` INNER JOIN user_has_traning ON user_has_traning.user_id=`user`.olduid INNER JOIN traning ON traning.idTraning=user_has_traning.traning_id", (e, r, f) => {
            if (!e) {


                const length = r.length;
                let x = 0;

                reCallOk = () => {
                    let element = r[x];
                    var uid = element.idUser;
                    var type = element.type_id;
                    var plase = element.plase + ' - ' + element.date;
                    console.log(uid + ' - ' + type + ' - ' + plase);

                    if (type == 1) {
                        mycon.execute("UPDATE `user` SET `trening_1`='" + plase + "' WHERE `idUser`=" + uid, (ee, rr, ff) => {
                            console.log(rr);
                        })
                    }

                    if (type == 2) {
                        mycon.execute("UPDATE `user` SET a`trening_2`='" + plase + "' WHERE `idUser`=" + uid, (ee, rr, ff) => {
                            console.log(rr);
                        })
                    }

                    setTimeout(() => {
                        if (length > x) {
                            reCallOk();
                        }
                        x++;
                    }, 100)
                }

                reCallOk();




            }
        })
    } catch (error) {
        console.log(error);
    }
}