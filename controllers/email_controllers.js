// controler/todo.js

const Dogs = require('../models/afbr');
const db = require('../config/db')
var nodemailer = require('nodemailer')





exports.postSendRegisterEmail = (req, res) => {
    console.log(req.body)
    var mailOptions = {
        from: 'yotuo2003@gmail.com',
        
        to: req.body.email,
        subject: 'Message from the African Bully Registry',
        html: '<h1>Welcome to the African Bully Registry <br>' + 
             `</h1> Thank you ${req.body.username} for registering with us` + 
             `<img src='https://res.cloudinary.com/daurieb51/image/upload/v1643934254/bqkxer8jrpi4zmnitk1a.jpg'>`
    };
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'yotuo2003@gmail.com', // enter your email address
            pass: 'incorrect12345$$'  // enter your visible/encripted password
        }
    });
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email was sent successfully: ' + info.response);
      }
    });
    
};

exports.postSendRegisterDogEmail = (req, res) => {
    console.log(req.body)
    var mailOptions = {
        from: 'yotuo2003@gmail.com',
        to: req.body.user.email,
        subject: 'Message from the African Bully Registry',
        html: `<h1>${req.body.user.displayName}, your new dog ${req.body.dog.name} <br>` 
            + ' has been successfully registered with us' + 
             `</h1> Thank you ${req.body.user.displayName} for registering with us`
    };
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'yotuo2003@gmail.com', // enter your email address
            pass: 'incorrect12345$$'  // enter your visible/encripted password
        }
    });
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email was sent successfully: ' + info.response);
      }
    });
    
};

exports.return_dog_id = (req, res) =>{
    console.log('req.params.name, ',req.params.dog_name)
    let dog_name = req.params.dog_name
    let sql = 'SELECT id FROM dog WHERE name = ?';
    let query = db.query(sql, dog_name, (err, result, fields) => {
        if (err){
            throw err;
        }
        res.send(result)
    })
}

exports.getPedigree = (req, res) => {
    console.log('pedigree of ',req.params.id)
    //  
    
    let sql = 'SELECT * FROM dog WHERE id = ?';
    let pedigree = {}
    let sire = 404
    let dam = 404

    let ss = 404
    let sd = 404
    
    let sss =404
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
        if (dog_id== null){
            dog_id=404
        }
        let query = db.query(sql,dog_id, (err, result, fields) => {
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
            if (sire === null){
                sire = 404
                if (dam === null){
                   dam = 404
                }
            }
            
            console.log('current from',dog_id,ids)
            return callback(null,ids)

            })
         
    }


    getdetails = (dog_id, label, callback) => {
        if (dog_id== null){
            dog_id=404
        }
        
        let query = db.query(sql,dog_id, (err, result, fields) => {
            if (err) {
                throw err
            }

            // pedigree[label] = result[0]
            
            pedigree[label] = result[0]
            // console.log('data sire',data.sire)
            
            // sire = pedigree[label].sire 
            // dam = pedigree[label].dam          
            
            // console.log(pedigree)
            if (sire === null){
                sire = 404
                if (dam === null){
                   dam = 404
                }
            }
            
            // console.log(pedigree)
            return callback(null,pedigree)

            })


    }


   
    // gendetails(8, 'sire', (err, response) => console.log(response))
    // console.log('c,',c)

    getsire_and_dam = () => {
        getids(req.params.id, (err, response) => {
            sire = response[0]
            dam = response[1]
            console.log('..sire =' ,sire)
            console.log('..dam =' ,dam)
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
            console.log('........siresire =' ,ss)
            console.log('........siredam =' ,sd)
            getsss_and_ssd()
            
            getdetails(ss, 'siresire', (err, response) => console.log('.'))
            getdetails(sd, 'siredam', (err, response) => console.log('.'))
        })
    }

    getds_and_dd = () => {
        getids(dam, (err, response) => {
            ds = response[0]
            dd = response[1]
            console.log('........damsire =' ,ds)
            console.log('........damdam =' ,dd)
            getdss_and_dsd()
            getdetails(ds, 'damsire', (err, response) => console.log('.'))
            getdetails(dd, 'damdam', (err, response) => console.log('.'))
            
        })
    }

    getsss_and_ssd = () => {
        getids(ss, (err, response) => {
            sss = response[0]
            ssd = response[1]
            console.log('............siresiresire =' ,sss)
            console.log('............siresiredam =' ,ssd)
            getsds_and_sdd()
            getdetails(sss, 'siresiresire', (err, response) => console.log('.'))
            getdetails(ssd, 'siresiredam', (err, response) => console.log('.'))
        })
    }

    getsds_and_sdd = () => {
        getids(sd, (err, response) => {
            sds = response[0]
            sdd = response[1]
            console.log('............siredamsire =' ,sds)
            console.log('............siredamdam =' ,sdd)
            getdetails(sds, 'siredamsire', (err, response) => console.log('.'))
            getdetails(sdd, 'siredamdam', (err, response) => console.log('.'))
        })
    }

    getdss_and_dsd = () => {
        getids(ds, (err, response) => {
            dss = response[0]
            dsd = response[1]
            console.log('............damsiresire =' ,dss)
            console.log('............damsiredam =' ,dsd)
            getdds_and_ddd()
            getdetails(dss, 'damsiresire', (err, response) => console.log('.'))
            getdetails(dsd, 'damsiredam', (err, response) => console.log('.'))
        })
    }

    getdds_and_ddd = () => {
        getids(dd, (err, response) => {
            dds = response[0]
            ddd = response[1]
            console.log('............damdamsire =' ,dds)
            console.log('............damdamdam =' ,ddd)
            getdetails(dds, 'damdamsire', (err, response) => console.log('.'))
            getdetails(ddd, 'damdamdam', (err, response) => res.send(pedigree))
        })
    }

    getsire_and_dam()
}



exports.putUpdateDog = (req, res) => {
    console.log('here',req.body)
    console.log('request body', req.body)
    console.log('request to put',req.body, 'in', req.params.id)
    let new_field = ''
    let field = Object.keys(req.body)
    console.log('field',field.toString())
    let value = Object.values(req.body)
    console.log('value',value)
    for (let i = 0; i < value.length; i ++){
        new_field += "'"
        new_field += value[i]
        new_field += "'"
        if ( i < value.length - 1){
            new_field += ','
        }           
        
        
    }
    

    console.log('newfield', new_field)
    let sql = `UPDATE dog  SET ? WHERE id=${req.params.id}`;
    let query = db.query(sql,req.body, (err, result, fields) => {
        if (err){
            throw err;
        }
        res.send(result)
        console.log('succeess eiditetd')
        console.log(query.sql)
    })
};

exports.deleteDog = (req, res) => {
    

 
    let sql = `DELETE FROM dog WHERE id=${req.params.id}`;
    let query = db.query(sql,req.body, (err, result, fields) => {
        if (err){
            throw err;
        }
        res.send(result)
        console.log('sucessful delete')
    })
};

exports.getAllSires = (req, res) => {

    
    let sql = "SELECT id,name FROM dog WHERE sex='male'";
    let query = db.query(sql, (err, result, fields) => {
        if (err){
            throw err;
        }
        res.send(result)
        console.log('search results for all sires')
    })
};

exports.getAllDams = (req, res) => {

    
    let sql = "SELECT id, name FROM dog WHERE sex='female'";
    let query = db.query(sql, (err, result, fields) => {
        if (err){
            throw err;
        }
        res.send(result)
        console.log('search results for all females dams')
    })
};

exports.getSearch = (req, res) => {

    search_input =req.params.search_input
    let sql = `SELECT id, name FROM dog WHERE name='${search_input}' OR name='${search_input}'`;
    let query = db.query(sql, (err, result, fields) => {
        if (err){
            throw err;
        }
        res.send(result)
        console.log('search results for', req.params.id)
    })
};
