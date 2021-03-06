// controler/todo.js

const Dogs = require('../models/afbr');
const db = require('../config/db')



exports.getAllDogs = (req, res) => {


    let sql = 'SELECT * FROM dog ORDER BY name';
    let query = db.query(sql, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
    })
};


exports.getAllDogsByUser = (req, res) => {
    console.log('req.params.id, ', req.params.id)
    id = Number(req.params.id)
    let sql = "SELECT * FROM dog WHERE user = ? AND hasBeenPaidFor='yes' ORDER BY name";
    let query = db.query(sql, id, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        // console.log(result)
    })
};
exports.postAddDogImage = (req, res) => {
    console.log('request body', req.body)
    console.log('request body', req.body)
    let new_field = ''
    let field = Object.keys(req.body)
    console.log('form fields', field.toString())
    let value = Object.values(req.body)
    console.log('form valuse', value)
    for (let i = 0; i < value.length; i++) {
        new_field += "\""
        new_field += value[i]
        new_field += "\""
        if (i < value.length - 1) {
            new_field += ','
        }


    }


    console.log('newfield', new_field)
    let sql = `INSERT INTO dog (${field}) VALUES (${new_field})`;
    let query = db.query(sql, value, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
    })




}

exports.postCreateDog = (req, res) => {
    console.log('request.body.dog', req.body.dog)
    console.log('request body.user ..', req.body.user)
    let new_field = ''
    var users_id = ''
    let field = Object.keys(req.body.dog)
    console.log('fprm field', field.toString())
    let value = Object.values(req.body.dog)
    console.log('form value', value)
    for (let i = 0; i < value.length; i++) {
        new_field += "'"
        new_field += value[i]
        new_field += "'"
        if (i < value.length - 1) {
            new_field += ','
        }


    }
    console.log('newfield', new_field)
    let sql = `INSERT INTO dog (${field}) VALUES (${new_field})`;
    let query = db.query(sql, value, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log(query.sql)

    })

    //get user id from uid

    uid = req.body.user.uid
    console.log(uid)
    let sql2 = 'SELECT * FROM users WHERE uid = ?';
    let query2 = db.query(sql2, uid, (err, result, fields) => {


        if (err) {
            throw err;
        }
        console.log(query2.sql)
        console.log(result)
        users_id = result[0].id
        console.log('users_id---------', users_id)

        let sql3 = `UPDATE dog  SET user=? WHERE name='${req.body.dog.name}' `;
        console.log('users id again,', users_id)

        let query3 = db.query(sql3, users_id, (err, result, fields) => {
            if (err) {
                throw err;
            }

            console.log('succeess eiditetd')
            console.log(query3.sql)
            console.log(users_id)
        })
    })

    if (req.body.setHasBeenPaidFor){
        
    }



};

exports.getOneDog = (req, res) => {
    console.log(req.params.id)
    let id = req.params.id
    let sql = 'SELECT * FROM dog WHERE id = ?';

    let query = db.query(sql, id, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log(result)
        console.log('logging from exports.get oned dog ', query.sql)
    })
}

exports.getOneDogByName = (req, res) => {
    console.log(req.params.name)
    let name = req.params.name
    let sql = 'SELECT * FROM dog WHERE name = ?';

    let query = db.query(sql, name, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log(result)
        console.log('logging from exports.get oned dog ', query.sql)
    })
}

exports.return_dog_id = (req, res) => {
    console.log('req.params.name, ', req.params.dog_name)
    let dog_name = req.params.dog_name
    let sql = 'SELECT id FROM dog WHERE name = ?';
    let query = db.query(sql, dog_name, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
    })
}

exports.getPedigree = (req, res) => {
    console.log('pedigree of ', req.params.id)
        //  

    let sql = 'SELECT * FROM dog WHERE id = ?';
    let pedigree = {}
    let sire = 404
    let dam = 404

    let ss = 404
    let sd = 404

    let sss = 404
    let ssd = 404
    let sds = 404
    let sdd = 404

    let ds = 404
    let dd = 404

    let dss = 404
    let dsd = 404
    let dds = 404
    let ddd = 404



    getids = (dog_id, callback) => {
        if (dog_id == null) {
            dog_id = 404
        }
        let query = db.query(sql, dog_id, (err, result, fields) => {
            if (err) {
                throw err
            }

            // pedigree[label] = result[0]
            let data = []
            data = result[0]
                // console.log('data sire',data.sire)
            sire_id = data.sire
            dam_id = data.dam
            ids = [sire_id, dam_id]
                // sire = pedigree[label].sire 
                // dam = pedigree[label].dam          

            // console.log(pedigree)
            if (sire === null) {
                sire = 404
                if (dam === null) {
                    dam = 404
                }
            }

            console.log('current from', dog_id, ids)
            return callback(null, ids)

        })

    }


    getdetails = (dog_id, label, callback) => {
        if (dog_id == null) {
            dog_id = 404
        }

        let query = db.query(sql, dog_id, (err, result, fields) => {
            if (err) {
                throw err
            }

            // pedigree[label] = result[0]

            pedigree[label] = result[0]
                // console.log('data sire',data.sire)

            // sire = pedigree[label].sire 
            // dam = pedigree[label].dam          

            // console.log(pedigree)
            if (sire === null) {
                sire = 404
                if (dam === null) {
                    dam = 404
                }
            }

            // console.log(pedigree)
            return callback(null, pedigree)

        })


    }



    // gendetails(8, 'sire', (err, response) => console.log(response))
    // console.log('c,',c)

    getsire_and_dam = () => {
        getids(req.params.id, (err, response) => {
            sire = response[0]
            dam = response[1]
            console.log('..sire =', sire)
            console.log('..dam =', dam)
            getss_and_sd()
            getds_and_dd()
            getdetails(req.params.id, 'maindog', (err, response) => console.log('.'))
            getdetails(sire, 'sire', (err, response) => console.log('.'))
            getdetails(dam, 'dam', (err, response) => console.log('.'))
        })

    }

    getss_and_sd = () => {
        getids(sire, (err, response) => {
            ss = response[0]
            sd = response[1]
            console.log('........siresire =', ss)
            console.log('........siredam =', sd)
            getsss_and_ssd()

            getdetails(ss, 'siresire', (err, response) => console.log('.'))
            getdetails(sd, 'siredam', (err, response) => console.log('.'))
        })
    }

    getds_and_dd = () => {
        getids(dam, (err, response) => {
            ds = response[0]
            dd = response[1]
            console.log('........damsire =', ds)
            console.log('........damdam =', dd)
            getdss_and_dsd()
            getdetails(ds, 'damsire', (err, response) => console.log('.'))
            getdetails(dd, 'damdam', (err, response) => console.log('.'))

        })
    }

    getsss_and_ssd = () => {
        getids(ss, (err, response) => {
            sss = response[0]
            ssd = response[1]
            console.log('............siresiresire =', sss)
            console.log('............siresiredam =', ssd)
            getsds_and_sdd()
            getdetails(sss, 'siresiresire', (err, response) => console.log('.'))
            getdetails(ssd, 'siresiredam', (err, response) => console.log('.'))
        })
    }

    getsds_and_sdd = () => {
        getids(sd, (err, response) => {
            sds = response[0]
            sdd = response[1]
            console.log('............siredamsire =', sds)
            console.log('............siredamdam =', sdd)
            getdetails(sds, 'siredamsire', (err, response) => console.log('.'))
            getdetails(sdd, 'siredamdam', (err, response) => console.log('.'))
        })
    }

    getdss_and_dsd = () => {
        getids(ds, (err, response) => {
            dss = response[0]
            dsd = response[1]
            console.log('............damsiresire =', dss)
            console.log('............damsiredam =', dsd)
            getdds_and_ddd()
            getdetails(dss, 'damsiresire', (err, response) => console.log('.'))
            getdetails(dsd, 'damsiredam', (err, response) => console.log('.'))
        })
    }

    getdds_and_ddd = () => {
        getids(dd, (err, response) => {
            dds = response[0]
            ddd = response[1]
            console.log('............damdamsire =', dds)
            console.log('............damdamdam =', ddd)
            getdetails(dds, 'damdamsire', (err, response) => console.log('.'))
            getdetails(ddd, 'damdamdam', (err, response) => res.send(pedigree))
        })
    }

    getsire_and_dam()
}



exports.putUpdateDog = (req, res) => {
    console.log('here', req.body)
    console.log('request body', req.body)
    console.log('request to put', req.body, 'in', req.params.id)
    let new_field = ''
    let field = Object.keys(req.body)
    console.log('field', field.toString())
    let value = Object.values(req.body)
    console.log('value', value)
    for (let i = 0; i < value.length; i++) {
        new_field += "'"
        new_field += value[i]
        new_field += "'"
        if (i < value.length - 1) {
            new_field += ','
        }


    }


    console.log('newfield', new_field)
    let sql = `UPDATE dog  SET ? WHERE id=${req.params.id}`;
    let query = db.query(sql, req.body, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log('succeess eiditetd')
        console.log(query.sql)
    })
};

exports.deleteDog = (req, res) => {



    let sql = `DELETE FROM dog WHERE id=${req.params.id}`;
    let query = db.query(sql, req.body, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log(query.sql)
        console.log('sucessful delete')
    })
};

exports.getAllSires = (req, res) => {


    let sql = "SELECT id,name FROM dog WHERE sex='male' ORDER BY name";
    let query = db.query(sql, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log('search results for all sires')
    })
};

exports.getAllDams = (req, res) => {


    let sql = "SELECT id, name FROM dog WHERE sex='female'  ORDER BY name";
    let query = db.query(sql, (err, result, fields) => {
        if (err) {
            throw err;
        }
        res.send(result)
        console.log('search results for all females dams')
    })
};

exports.getSearch = (req, res) => {
    search_input = req.params.search_input
    let sql = `SELECT id, name FROM dog WHERE (name LIKE "%${search_input}%" OR afbr_no="${search_input}") AND hasBeenPaidFor='yes' ORDER BY name; `;
    let query = db.query(sql, (err, result, fields) => {
        if (err) {
            throw err;
        }
        console.log(query.sql)
        res.send(result)
        console.log('search results for', result[0])
    })
};

exports.setHasBeenPaidFor = (req, res) => {
    let dog_name = req.body.dog.name
    var id;


    let sql2 = `UPDATE dog  SET hasBeenPaidFor='yes' WHERE name='${dog_name}'`;
    let query2 = db.query(sql2, dog_name, (err, result2, fields) => {
        if (err) {
            throw err;
        }
        res.send(result2)
        console.log('succeessfull paid for dog')
        console.log(query2.sql)
        console.log(result2)
    })
}