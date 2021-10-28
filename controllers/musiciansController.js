const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Musician = mongoose.model('Musician');


    router.get('/', (req, res, ) => {
        res.render('musicians/addOrEdit', {
            viewTitle: "Insert Musician"
        });

    });
    router.get('/list', (req, res, ) => {
        
        Musician.find((err, docs) => {
            if (!err) {
                res.render('musicians/list',{
                    list: docs

                });
            }
            else {
                console.log('error in retriving musician list:' + err);
            }
            
        }).lean();

    });

    // router.post('/', (req, res, ) => {
    //     console.log(req.body);
    // });
router.post('/', async (req, res,) => {
    if (req.body._id == '')
        insertRecords(req, res)
    else
        updateRecord(req, res);
        
        
    });
    function insertRecords(req, res) {
    var musician = new Musician();
    musician.fullName = req.body.fullName;
    musician.email = req.body.email;
    musician.mobile = req.body.mobile;
    musician.city = req.body.city;
        //register
        //musician.save(musician, req.body.password,(err, doc) => {
    musician.save((err, doc) => {
            if (!err)
                res.redirect('musicians/list');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render('musicians/addOrEdit', {
                        viewTitle: "Insert Musician",
                        musician: req.body
                    });
                }   
                else
                console.log('Error during record Insertion:' + err);
            }
           
        });
        
}
        
function updateRecord(req, res) {
    Musician.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('musicians/list');
        }
        else {
            if (err.name == 'validationError') {
                handleValidationError(err, req.body);
                res.render('musicians/addOrEdit', {
                    viewTitle: 'Update Employee',
                    musician: req.body


                });
                
            }
            else
                console.log('Error during record update:' + err);
        }
        
    });

} 

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
        
                break;
        
            case 'email':
                body['emailError'] = err.errors[field].message;
        
                break;
                case 'mobile':
                    body['mobileError'] = err.errors[field].message;
            
                break;
                case 'city':
                    body['cityError'] = err.errors[field].message;
            
                    break;
            default:
                break;
        }
    }
    
}
router.get('/:id', (req, res,) => {
    Musician.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('musicians/addOrEdit', {
                viewTitle: 'Update Musician',
                musician: doc
            });
        }
    }).lean();
    
});
router.get('/delete/:id', (req, res) => {
    Musician.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/musicians/list');
        }
        else
            console.log('Error in musician delete:' + err);
            
        
    })
    
})
module.exports = router;


 