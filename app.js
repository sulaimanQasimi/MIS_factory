 var bodyParser = require('body-parser'),
AdmZip = require('adm-zip'),
pm2 = require('pm2'),
moment = require('moment'), 
express = require("express"),
 moment = require('jalali-moment'),
 fileUpload = require('express-fileupload'),
  roundTo = require('round-to'),
mysql = require('mysql2'),
transaction = require('node-mysql-transaction'),
xoauth2 = require('xoauth2'),
urlencodedParser = require('urlencoded-parser'),
nodemailer = require("nodemailer"),
smtpTransport = require('nodemailer-smtp-transport'),
btoa=require("btoa"),
unique = require('array-unique'),
await = require('async-await'),
atob=require("atob"),
app = express(),
path = require('path'),
fs = require('fs'), 
views = require('views');
//var formidable = require('formidable');
var formidable = require("formidable");
var AWS = require('aws-sdk');
var multer  = require('multer');
//var mysqlDump = require('mysqldump');
var mysqlBackup = require('mysql-backup');
var fs = require('fs');
var FCM = require('fcm').FCM;
var cors = require('cors');
var multiparty = require('multiparty');
var session = require('express-session');
var logout = require('express-passport-logout');
var index = require('./app');

var async = require('async');
var ejs = require('ejs'); 
app.set('view engine', 'ejs'); 
var  server = require('http').createServer(app);
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static(path.join(__dirname, '/Images')));
//app.use('./views', express.static('Images'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({
limit: '50mb'
})); 

app.use(bodyParser.urlencoded({
limit: '50mb',
extended: true
}));

app.use(cors());
app.use(bodyParser.json())
app.use(fileUpload())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

// Import database connection
var con = require('./config/database');

// Import route files
var billRoutes = require('./routes/billRoutes');

// Use bill routes
app.use('/', billRoutes);
    
/* 
    mysqlDump({
        host: 'localhost',
        user: 'root',
        password: 'S11solai',
        database: 'factory_mis',
        tables:['users'], // only these tables
        where: {'users': 'id < 1000'}, // Only test players with id < 1000
        ifNotExist:true, // Create table if not exist
    }.then(dump => {
        fs.writeFileSync('factory_mis.sql', dump); // Create data.sql file with dump result
    }) */


//start transaction
// var trCon = transaction({
//   // mysql driver set 
//   con: [mysql.createConnection,{
//    // mysql connection config
//     user: 'root',
//     password: 'S11solai',
//     host: 'localhost',
//     dateStrings:true,
//     database: 'factory_mis',
//     charset: 'utf8',
    
//   }],
  
//   dynamicConnection: 32,
//   timeout:600,
  
// });

// var chain = trCon.chain();

// chain.
// on('commit', function(){
//   console.log('number commit');
// }).
// on('rollback', function(err){
//   console.log(err);
// });
//finish transaction
//Web modules 


                    app.get("/index", function(req,res){

                       /*  con.query("select company_name,logo from company_info ",function(err,rows_02)
                        { */
                        res.render("index");
                        /* }); */
                    });

                    app.post('/logout_system', function(req,res)
                    {
                        var sess = req.session ;
                        res.redirect('/index');
                         sess.destroy();
                    });

                    app.post('/system_backup', function(req,res)
                    {
                        con.query("select backup_url from company_info ",function(err, rows_02)
                        {

                       var url_folder = rows_02[0].backup_url;
                      // console.log(url_folder);
                        var  date_ob = new Date();
                        var now_date = " - " +date_ob.getFullYear() + "-" +(parseInt(date_ob.getMonth()+1)) + "-" +date_ob.getDate() ;
                        console.log(date_ob);
                        var backup_name = 'factory_mis'+ now_date;
                        var mysqldump = require('mysqldump');
                        
                        mysqldump({
                            connection: {
                                host: 'localhost',
                                user: 'root',
                                password: 'S11solai',
                                database: 'factory_mis',
                            },
                            
                            dumpToFile:url_folder + '/' + backup_name+'.sql',
                            
                            

                        });
                        backup_func(url_folder,'/'+backup_name+'.sql'),
                        res.send(" معلومات موفقانه بک آپ گرفته شد ");
                      //  dumpToFile:'F:\dump.sql'
                            /* const cron = require('node-cron')
                            const moment = require('moment')
                            const fs = require('fs')
                            const spawn = require('child_process').spawn

                            // You can adjust the backup frequency as you like, this case will run once a day
                            cron.schedule('0 0 * * *', () => {
                            // Use moment.js or any other way to dynamically generate file name
                            const fileName = `${process.env.factory_mis}_${moment().format('YYYY_MM_DD')}.sql`
                            const wstream = fs.createWriteStream(`/public/${fileName}`)
                            console.log('---------------------');
                            console.log('Running Database Backup Cron Job')
                            const mysqldump = spawn('mysqldump', [ '-u', process.env.root,'-p', process.env.factory_mis ])

                            mysqldump
                                .stdout
                                .pipe(wstream)
                                .on('finish', () => {
                                console.log('DB Backup Completed!')
                                })
                                .on('error', (err) => {
                                console.log(err)
                                });
                            }); */

                       /*  var exec = require('child_process').exec;
                            var commandStr = 'java -jar something.jar';

                            exec(commandStr, function(error, stdout, stderr) {
                            if(error || stderr) console.log(error || stderr);
                            else console.log(stdout);
                            }); */

                           // var exec = require('child_process').exec(' mysqldump -u root -p factory_mis > fileName.sql');

                        // var fs = require('fs');
                        // var which = require('which');
                        //     var spawn = require('child_process').spawn;
                        //     var wstream = fs.createWriteStream('dumpfilename.sql');

                        //     var mysqldump = spawn('mysqldump', [
                        //         '-u',
                        //         'root',
                        //         'factory_mis'
                        //     ]);

                        //         mysqldump
                        //         .stdout
                        //         .pipe(wstream)
                        //         .on('finish', function () {
                        //             console.log('Completed')
                        //         })
                        //         .on('error', function (err) {
                        //             console.log(err)
                        //         });
                       
                        //         /* mysqlBackup({
                        //             host: 'localhost',
                        //             user: 'root',
                        //             password: '',
                        //             database: 'factory_mis',
                        //         }).then(dump => {
                        //             console.log(dump);
                        //         }) */

                              /*   var exec = require('child_process').exec;
                                var child = exec(' mysqldump -u root -p[] [factory_mis] > factory_mis.sql'); */
                    });

                });
                    app.post('/check_login', function(req,res)
                    {
                        var sess = req.session ;
                        var us =  req.query.username;
                        var ps =  req.query.password;
        
                        con.query("select * from users where username='"+us+"' and password ='"+ps+"' ", function(err,rows_02)
                            {
                                if(rows_02.length > 0)
                                {
                                    sess.uid = rows_02[0].id;
                                    if(sess.uid)
                                    {
                                        
                                        res.send("success");
                                    }else{
                                        
                                            
                                        }
                                   /*  res.send("success"); */
                                }
                                else{
                                    res.send("fail");
                                }
                               
                            });
                    });
                   // 
                app.get("/home", function(req,res){
                    var sess = req.session ;
                    

                    /* let year = date_ob.getFullYear();
                    console.log(year); */
                        if(sess.uid)
                        {
                            con.query("set GLOBAL event_scheduler = ON ",function(err,rows_03)
                            {
                             console.log("set GLOBAL event_scheduler = ON");
                             con.query("select * from users where id = '"+sess.uid+"' ",function(err,rows_01)
                             {
                                con.query("select company_name,logo from company_info ",function(err,rows_02)
                                  {
                                    /* con.query("select * from stack_raw_materials_list ",function(err,rows_04)
                                    { */
                                        /* if(rows_04.length >0)
                                        { */

                                        
                                            
                                                con.query("select * from users  ",function(err,rows_03)
                                                {
                                        
                                                res.render("home",{data_02:rows_02,data_03:rows_03,user_name:rows_01[0].full_name,profile:rows_01[0].profile,us_id:rows_01[0].id,authority:rows_01[0].authority}); 
                                                });
                                       /*  }else{
                                            res.send("مواد خام در گدام موجود نیست !");
                                        } */
                                           
                                    });
                              
                              });
                              });

                        }else{
                            res.render("index");
                        }
                });

                app.post('/add_users', function(req,res)
                {
                 if (!(req.files && req.files.image))
                 {
                         var user_name =  req.body.userrname2;
                         var full_name =  req.body.full_name;
                         var typeofAdmin =  req.body.typeofAdmin; 
                         var password2 =  req.body.password2; 
 
                             var  update_query1 = "INSERT INTO `users`(`username`, `full_name`, `authority`, `password`,`profile`) VALUES ('"+user_name+"','"+full_name+"','"+typeofAdmin+"','"+password2+"','default.png')";
                             con.query(update_query1,function(err,rows_03)
                             {
                                 if(err)
                                 {
                                     throw err
                                 }else{
                                     res.json({
                                     status:'1',
                                    
                                 });
                                }
                               
                             });
                         }else{

                            
                            var user_name =  req.body.userrname2;
                            var full_name =  req.body.full_name;
                            var typeofAdmin =  req.body.typeofAdmin; 
                            var password2 =  req.body.password2; 
                             var file = req.files.image;
                             var  file_name = file.name;
                             
                             var  update_query = "INSERT INTO `users`(`username`, `full_name`, `authority`, `password`, `profile`) VALUES ('"+user_name+"','"+full_name+"','"+typeofAdmin+"','"+password2+"','"+file_name+"')";
                             con.query(update_query,function(err,rows_02)
                             {
                                 console.log(update_query);
                                 if(err)
                                 {
                                     throw err
                                 }else{
                                     res.json({
                                     status:'1',
                                     data:rows_02
                                 });
                                 file.mv("Images/"+file_name,function(err)
                                         {
                                         
                                         });
                                 }
         
                             }); 
                         }
                 });



                app.get("/update_sales.ejs", function(req,res){

                  con.query("select * from company_info ", function(err,rows_02)
                  {
                    // Query bill_items by joining with bill_details
                    con.query("SELECT bill_items.*, bill_details.bill_id FROM bill_items INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id WHERE bill_details.bill_id = '"+req.query.customer_id+"' ", function(err,rows_05)
                    {
                        if(err) {
                            console.error("Error loading bill items:", err);
                            rows_05 = [];
                        }
                        
                        // Check if rows_05 exists and is an array
                        if(!rows_05 || !Array.isArray(rows_05)) {
                            rows_05 = [];
                        }
                        con.query("select * from stack_to_market ", function(err,rows_03)
                      {
                           con.query("SELECT froshat_details.email,froshat_details.bill_no,froshat_details.contact,froshat_details.total_amount,froshat_details.paid_amount, customer_account.name FROM froshat_details INNER JOIN customer_account ON froshat_details.cus_id = customer_account.id WHERE froshat_details.id = '"+req.query.customer_id+"' ", function(err,rows_04)
                          {
                              
                                res.render("update_sales",{data_02:rows_02,data_03:rows_03,data_04:rows_04,data_05:rows_05});
           
                          });
                      });
                    });
                  });
                });


        app.get("/dashboard.ejs", function(req,res){

            con.beginTransaction(function(err) {
                if (err) { throw err; }
                con.query("SELECT round(COALESCE(SUM(price * quantity/ex_rate),0),3)AS total FROM expenses", function (error, results, fields) {
                  if (error) {
                    return con.rollback(function() {
                      throw error;
                    });
                  }
                 

                  con.query("SELECT round(SUM(total_amount/ex_rate),3)AS sell_total FROM froshat_details", function (error, results1, fields) {
                    if (error) {
                      return con.rollback(function(){
                        throw error;
                      });
                    }

                  con.query("SELECT round(SUM((quantity* price)/ex_rate),3)AS sell_total4 FROM stack_raw_materials", function (error, rows_purchase, fields) {
                    if (error) {
                      return con.rollback(function(){
                        throw error;
                      });
                    }

                  con.query("SELECT round(SUM(amount/ex_rate),3)AS company_loan FROM incoming_loan", function (error, results2, fields) {
                    if (error) {
                      return con.rollback(function() {
                        throw error;
                      });
                    }

                  con.query("SELECT round(SUM(amount/ex_rate),3)AS company_loan FROM outgoing_loan", function (error, results3, fields) {
                    if (error) {
                      return con.rollback(function() {
                        throw error;
                      });
                    }


                    con.commit(function(err) {
                        if (err) {
                          return con.rollback(function() {
                            throw err;
                          });
                        }
                    res.render("dashboard",{expenses:results[0].total,purchase:rows_purchase[0].sell_total4,sell_amount:results1[0].sell_total,incoming_loan:results2[0].company_loan,outging_loan:results3[0].company_loan}); 

                            });
                            });
                        });
                        });
                    });
                    });
                });
                });
            // pool.getConnection(function(err, connection) {
            //     connection.beginTransaction(function(err) {
            //         if (err) {                  //Transaction Error (Rollback and release connection)
            //             connection.rollback(function() {
            //                 connection.release();
            //                 //Failure
            //             });
            //         } else
            //        {
            //             connection.query("SELECT SUM(price * quantity)AS total FROM expenses", function(err, results) {
            //                 if (err) {          //Query Error (Rollback and release connection)
            //                     connection.rollback(function() {
            //                         connection.release();
            //                         //Failure
            //                     });
            //                 } else 
            //                 {
            //                     connection.commit(function(err) {
            //                         if (err) {
            //                             connection.rollback(function() {
            //                                 connection.release();
            //                                 //Failure
            //                             });
            //                         } else 
            //                         {
            //                             connection.release();
            //                             ////
            //                             connection.query("SELECT SUM(total_amount)AS sell_total FROM froshat_details", function(err, results1) {
            //                                 if (err) {          //Query Error (Rollback and release connection)
            //                                     connection.rollback(function() {
            //                                         connection.release();
            //                                         //Failure
            //                                     });
            //                                 } else 
            //                                 {
            //                                     connection.commit(function(err) {
            //                                         if (err) {
            //                                             connection.rollback(function() {
            //                                                 connection.release();
            //                                                 //Failure
            //                                             });
            //                                         } else 
            //                                         {
            //                                            // connection.release();
            //                                             console.log(results[0].total);
            //                                             res.render("dashboard",{expenses:results[0].total,sell_amount:results1[0].sell_total}); 
            //                                         }
            //                                     });
            //                                 }
            //                             });
                                       
            //                         }
            //                     });
            //                 }
            //             });
            //         }    
            //     });
            // });
            //  });

          app.get("/about.ejs", function(req,res){

  
            res.render("about"); 
       
           });

          app.get("/customer_view.ejs", function(req,res){
            var my_id =  req.query.custid;
            
            con.query("SELECT * from customer_account", function(err,rows_03)
            {

                        con.query("SELECT customer_account.id as cust_id, customer_account.company_name, froshat_details.* FROM customer_account INNER JOIN froshat_details ON customer_account.id=froshat_details.cus_id WHERE  customer_account.id ='"+my_id+"'", function(err,rows_01)
                        {
                                    if(rows_01.length >0)
                                    {

                                        var arr = [];
                                        for(var i =0 ; i<rows_01.length;i++)
                                        {
                                        var sh = moment(rows_01[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                            arr += sh +",";
                                        }
                                        var str_array = arr.split(',');
                            
                    
                                     res.render("customer_view",{data_01:rows_01,data_03:rows_03,date_data:str_array}); 
                                    }else{
                                        res.send("<h1 style='color:green; text-align:center;'>فروشات صورت نگرفته است !</h1>");
                                    }
                        });
                        });
  
           
       
           });

          app.get("/raw_material_store_lists.ejs", function(req,res){
            

            /* con.query("SELECT * FROM stack_raw_materials_list ",function(err, rows_01)
            { */

                /* 
                SELECT item_name,item_type,SUM(quantity) as mahsol_qnt FROM `raw_material_each_mahsol` GROUP BY item_name,item_type
                
                */
            con.query("SELECT * from remrawmaterial  ",function(err, rows_01)
            {
  
            res.render("raw_material_store_lists",{data:rows_01}); 
                 });
       
           

            });

          app.get("/stock_materials.ejs", function(req,res){
            
//
            con.query("SELECT item_name, item_type ,quantity FROM stack_factory_registration_list  ",function(err, rows_01)
            {
  
            res.render("stock_materials",{data:rows_01}); 
                 });
       
           

            });
          app.get("/received_bills.ejs", function(req,res){
            
//
  
            res.render("received_bills"); 
                
       
           

            });
           /* update froshat */
          /*  app.post('/update_froshat_details', function(req,res)
           {

            var items = [];//
            var buy_type = [];//
            var quantity = [];
            var price = [];
            var stak_to_market_id = [];
             var customer_name = req.body.customer_name;

             var update_id = req.body.fetch_id;

             var customer_contact = req.body.customer_contact;
             var customer_email = req.body.customer_email;
             var items = req.body.item_name;
            
             var buy_type = req.body.item_type;
             var quantity = req.body.quantity;
             var stak_to_market_id = req.body.stak_to_market;

              
             var price = req.body.item_price;
             //var total = req.body.total;
             var total_show = req.body.total_show;
             var bill_no = req.body.bill_no;
             var received_show = req.body.reciept_show;
             var remain_show = req.body.remain_show;
             
             var ex_rate = req.body.to_dollar;
             var currency = req.body.currency;
            
              
     con.beginTransaction(function(err) {
        if (err)
        {
          throw err;
        }else{
                con.query("update froshat_details set `customer_name`='"+customer_name+"', `email`='"+ customer_email +"',`contact`='"+customer_contact+"',`bill_no`='"+bill_no+"',`total_amount`='"+total_show+"',`paid_amount`='"+received_show+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"' where id = '"+update_id+"' ", function (error, results, fields) {
                  if (error) {
                    return con.rollback(function() {
                      throw error;
                    });
                  }
                  var lst_id = results.insertId;
                  for(var i=0;i<items.length;i++)
                    {
                        (function(i)
                        {
                            setTimeout(function()
                            {
                                con.query("update bill_details set item_name='"+items[i]+"',item_type='"+buy_type[i]+"',quantity='"+quantity[i]+"',price='"+price[i]+"' where bill_id ='"+lst_id+"' ", function (error, results1, fields) {
                                    if (error) {
                                    return con.rollback(function() {
                                        throw error;
                                        });
                                            }
                                               });
                       
                                            con.query("select * from stack_to_market where item_name = '"+items[i]+"' and item_type='"+buy_type[i]+"'", function (error, results2, fields) {
                                                if (error) {
                                                  return con.rollback(function() {
                                                    throw error;
                                                  });
                                                }

                                                con.query("select * from bill_details where bill_id = '"+lst_id+"' ", function (error, results3, fields) {
                                                    console.log("select * from bill_details where bill_id = '"+lst_id+"' ");
                                                    if (error) {
                                                      return con.rollback(function() {
                                                        throw error;
                                                      });
                                                    }
                                                  var old_bill_quantity = results3[0].quantity ;
                                                  console.log("old quan:"+old_bill_quantity);
                                            //    var new_quan = qun1 + quantity[i]; 
                                                   console.log("web quantity"+quantity[i]);
                                                    var db_quantity = results2[0].quantity;
                                                    console.log("db quantity:"+db_quantity);
                                                    update_quantity= db_quantity - quantity[i];

                                                        con.query("update stack_to_market set quantity = '"+update_quantity+"' where item_name = '"+items[i]+"' and item_type='"+buy_type[i]+"'", function (error, results3, fields) {
                                                            console.log("update stack_to_market set quantity = '"+update_quantity+"' where item_name = '"+items[i]+"' and item_type='"+buy_type[i]+"'");
                                                            if (error) {
                                                              return con.rollback(function() {
                                                                throw error;
                                                              });
                                                            }

                                                    });
                                                    });

                                     });       
                                },i)
                        })(i);
                     }//end of loop

                     con.commit(function(err) {
                        if (err) {
                          return con.rollback(function() {
                            throw err;
                          });
                        }
                
                // }
             });
           });
        }
        });
        }); */

        /* stack_bill format */
        app.post('/stack_2_details', function(req,res)
        {
            

         var items = [];
         var new_items = [];
         var buy_type = [];
         var new_type = [];
         var quantity = [];
         var new_quantity = [];
         var price = [];
         var new_price = [];
         var stak_to_market_id = [];
         var new_stack_to_market_id = [];

         var bill_no = req.body.bill_no2;
        // console.log(bill_no);
         // var bill_no2 = req.body.bill_no2;
          var stf_id = req.body.dis_type;
         /*  var customer_contact = req.body.customer_contact;
          var customer_email = req.body.customer_email; */
          var items = req.body.item;
         
          var buy_type = req.body.type;
          var quantity = req.body.quantity;
          var stak_to_market_id = req.body.stak_to_market;
             
          var price = req.body.price;
          var newstr = "someerr";

          new_items= items += ","+newstr;
          new_type= buy_type += ","+newstr;
          new_quantity= quantity += ","+newstr;
          new_price= price += ","+newstr;
          new_stack_to_market_id= stak_to_market_id += ","+newstr;

          var items_array = new_items.split(',');
          var buy_type_array = new_type.split(',');
          var quantity_array = new_quantity.split(',');
          var price_array = new_price.split(',');
          var stak_to_market_id_array = new_stack_to_market_id.split(',');
          var date_stack = req.body.date_stack;
          
          /* var total_show = req.body.total_show;
          var received_show = req.body.reciept_show;
          var remain_show = req.body.remain_show;
          
          var ex_rate = req.body.to_dollar;
          var currency = req.body.currency; */
         // var date = req.body.data_man;
          var m = moment.from(date_stack, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

  con.beginTransaction(function(err) {
     if (err)
     {
       throw err;
     }else{


         con.query("select bill_no from stack_to_market_details where bill_no = '"+bill_no+"'",function(err,rows_001)
         {
         if(rows_001.length >0)
         {
             res.send("معذرت! بل قبلا ثبت شده");
         }else{
        
             con.query("INSERT INTO stack_to_market_details(`stuff_id`, `bill_no`,`date`) VALUES ('"+stf_id+"','"+bill_no+"','"+m+"')", function (error, results, fields) {
               if (error) {
                 return con.rollback(function() {
                   throw error;
                 });
               }
               var lst_id = results.insertId;
               for(var i=0;i<items_array.length-1;i++)
                 {
                     (function(i)
                     {
                         setTimeout(function()
                         {
                             con.query("insert into stack_bill_detail(stack_to_m_detail_id,item_name,category,quantity,price) values('"+lst_id+"','"+items_array[i]+"','"+buy_type_array[i]+"','"+quantity_array[i]+"','"+price_array[i]+"')", function (error, results1, fields) {
                                 if (error) {
                                 return con.rollback(function() {
                                     throw error;
                                 });
                                 }
                             });
                    
                                         con.query("insert into stack_to_market(item_name,item_type,fixed_price,quantity,date) values('"+items_array[i]+"','"+buy_type_array[i]+"','"+price_array[i]+"','"+quantity_array[i]+"','"+m+"') ", function (error, results2, fields) {
                                             if (error) {
                                               return con.rollback(function() {
                                                 throw error;
                                               });
                                             }
                                             
                                             /* update stack_factory_registration_list */
                                             con.query("select * from stack_factory_registration_list where item_name= '"+items_array[i]+"' and item_type='"+buy_type_array[i]+"'", function(err , rows_004)
                                             {
                                                    var db_quantiy = rows_004[0].quantity;
                                                   console.log("web quantity"+quantity_array[i]);
                                                    
                                                    console.log("db quantity:"+db_quantiy);
                                                    update_quantity= db_quantiy - quantity_array[i];
                                                    //console.log(update_quantity);


                                             
                                             con.query("update  stack_factory_registration_list set quantity='"+update_quantity+"' where item_name='"+items_array[i]+"' and item_type='"+buy_type_array[i]+"' ", function (error, results2, fields) {
                                                if (error) {
                                                  return con.rollback(function() {
                                                    throw error;
                                                  });
                                                }

                                                /*insert stack_to_market_lists */
                                                con.query("select * from stack_to_market_lists where item_name='"+items_array[i]+"' and item_type='"+buy_type_array[i]+"'",function(err,rows_006)
                                                {
                                                    if(rows_006.length >0)
                                                    {
                                                        var db_quantity_01 = rows_006[0].quantity;
                                                        var web_quantity_01 = quantity_array[i];
                                                        var update_quna_01 = parseFloat(db_quantity_01)+ parseFloat(web_quantity_01);
                                                    con.query("update stack_to_market_lists set quantity='"+update_quna_01+"' where item_name='"+items_array[i]+"' and item_type='"+buy_type_array[i]+"'",function(err,rows_007)
                                                    {

                                                    });
                                                    }else{
                                                        con.query("insert into stack_to_market_lists (item_name,item_type,sell_price,quantity) values('"+items_array[i]+"','"+buy_type_array[i]+"','"+price_array[i]+"','"+quantity_array[i]+"')",function(err,rows_08)
                                                        {

                                                        });
                                                    }

                                                });
                                                
                                            });       
                                        });  
                                    });     
                                },i)
                            })(i);
                        }//end of loop
                        res.send("اطلاعات موفقانه ذخیره شد");

                  con.commit(function(err) {
                     if (err) {
                       return con.rollback(function() {
                         throw err;
                       });
                     }
             
             // }
          });
        });
     }
     });//end of bill_no query
     }//end of else 
    
     });
     });
        /* stack_bill format */

           app.post('/froshat_details', function(req,res)
           {
            // Validate required fields
            if(!req.body.bill_no2) {
                return res.status(400).send("نمبر بل خالی است!");
            }
            if(!req.body.dis_type) {
                return res.status(400).send("نام دکان را انتخاب کنید!");
            }
            if(!req.body.data_man) {
                return res.status(400).send("تاریخ را وارد کنید!");
            }
            if(!req.body.to_dollar || req.body.to_dollar === '') {
                return res.status(400).send("نرخ تبدیل را وارد کنید!");
            }
            if(!req.body.currency) {
                return res.status(400).send("واحد پولی را انتخاب کنید!");
            }
            if(!req.body.item || (Array.isArray(req.body.item) && req.body.item.length === 0)) {
                return res.status(400).send("حداقل یک جنس اضافه کنید!");
            }

            var items = [];
            var new_items = [];
            var buy_type = [];
            var new_type = [];
            var quantity = [];
            var new_quantity = [];
            var price = [];
            var new_price = [];
            var stak_to_market_id = [];
            var new_stack_to_market_id = [];

            var bill_no = parseInt(req.body.bill_no2) || 0;
            var customer_name = parseInt(req.body.dis_type) || 0;
            var customer_contact = req.body.customer_contact || '';
            var date1 = req.body.data_man;
            
            // Handle items - can be array or string
            var items_raw = req.body.item;
            var buy_type_raw = req.body.type;
            var quantity_raw = req.body.quantity;
            var stak_to_market_id_raw = req.body.stak_to_market;
            var price_raw = req.body.price;
            
            // Convert to arrays if they're strings
            if(typeof items_raw === 'string') {
                items = items_raw.split(',').filter(item => item && item.trim() !== '');
            } else if(Array.isArray(items_raw)) {
                items = items_raw.filter(item => item && item.trim() !== '');
            }
            
            if(typeof buy_type_raw === 'string') {
                buy_type = buy_type_raw.split(',').filter(item => item && item.trim() !== '');
            } else if(Array.isArray(buy_type_raw)) {
                buy_type = buy_type_raw.filter(item => item && item.trim() !== '');
            }
            
            if(typeof quantity_raw === 'string') {
                quantity = quantity_raw.split(',').filter(item => item && item.trim() !== '');
            } else if(Array.isArray(quantity_raw)) {
                quantity = quantity_raw.filter(item => item && item.trim() !== '');
            }
            
            if(typeof price_raw === 'string') {
                price = price_raw.split(',').filter(item => item && item.trim() !== '');
            } else if(Array.isArray(price_raw)) {
                price = price_raw.filter(item => item && item.trim() !== '');
            }
            
            if(typeof stak_to_market_id_raw === 'string') {
                stak_to_market_id = stak_to_market_id_raw.split(',').filter(item => item && item.trim() !== '');
            } else if(Array.isArray(stak_to_market_id_raw)) {
                stak_to_market_id = stak_to_market_id_raw.filter(item => item && item.trim() !== '');
            }
            
            if(items.length === 0) {
                return res.status(400).send("حداقل یک جنس اضافه کنید!");
            }
            
            var newstr = "someerr";
            var new_items = items.join(',') + "," + newstr;
            var new_type = buy_type.join(',') + "," + newstr;
            var new_quantity = quantity.join(',') + "," + newstr;
            var new_price = price.join(',') + "," + newstr;
            var new_stack_to_market_id = stak_to_market_id.join(',') + "," + newstr;

            var items_array = new_items.split(',').filter(item => item && item.trim() !== 'someerr');
            var buy_type_array = new_type.split(',').filter(item => item && item.trim() !== 'someerr');
            var quantity_array = new_quantity.split(',').filter(item => item && item.trim() !== 'someerr');
            var price_array = new_price.split(',').filter(item => item && item.trim() !== 'someerr');
            var stak_to_market_id_array = new_stack_to_market_id.split(',').filter(item => item && item.trim() !== 'someerr');
            
            var total_show = parseFloat(req.body.total_show) || 0;
            var received_show = parseFloat(req.body.reciept_show) || 0;
            var remain_show = parseFloat(req.body.remain_show) || 0;
             
            var ex_rate = parseFloat(req.body.to_dollar) || 1;
            var currency = req.body.currency;
            
            // Validate and convert date
            var m;
            try {
                m = moment.from(date1, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY-MM-DD');
            } catch(e) {
                return res.status(400).send("تاریخ نامعتبر است!");
            }

     con.beginTransaction(function(err) {
        if (err)
        {
          return res.status(500).send("خطا در شروع تراکنش: " + err.message);
        }else{


            con.query("select bill_no from froshat_details where bill_no = '"+bill_no+"'",function(err,rows_001)
            {
            if(err) {
                return con.rollback(function() {
                    res.status(500).send("خطا در بررسی نمبر بل: " + err.message);
                });
            }
            if(rows_001.length >0)
            {
                return con.rollback(function() {
                    res.send("معذرت! بل قبلا ثبت شده");
                });
            }else{
           
                con.query("INSERT INTO froshat_details(`cus_id`,`contact`,`bill_no`,`total_amount`,`paid_amount`,`currency`,`ex_rate`,`date`) VALUES ('"+customer_name+"','"+customer_contact+"','"+bill_no+"','"+total_show+"','"+received_show+"','"+currency+"','"+ex_rate+"','"+m+"')", function (error, results, fields) {
                  if (error) {
                    return con.rollback(function() {
                      res.status(500).send("خطا در ثبت اطلاعات: " + error.message);
                    });
                  }
                  var lst_id = results.insertId;

                   
                   con.query("insert into sales_payments(`sales_id`, `paid`, `currency`, `ex_rate`, `date`) values('"+lst_id+"','"+received_show+"','"+currency+"','"+ex_rate+"','"+m+"')",function(err,rows_009)
                   {
                    if(err) {
                        return con.rollback(function() {
                            res.status(500).send("خطا در ثبت پرداخت: " + err.message);
                        });
                    }
                   
                   /* here we should save in sales_payments */
                  for(var i=0;i<items_array.length;i++)
                    {
                        (function(i)
                        {
                            setTimeout(function()
                            {
                                // First insert into bill_details
                                con.query("insert into bill_details(bill_id,item_name,item_type,quantity,price) values('"+lst_id+"','"+items_array[i]+"','"+buy_type_array[i]+"','"+quantity_array[i]+"','"+price_array[i]+"')", function (error, results1, fields) {
                                    if (error) {
                                    return con.rollback(function() {
                                        res.status(500).send("خطا در ثبت جزئیات بل: " + error.message);
                                    });
                                    }
                                    
                                    // Get the bill_detail_id from the insert
                                    var bill_detail_id = results1.insertId;
                                    
                                    // Get stack_to_market_list_id if available
                                    var stack_to_market_list_id = (stak_to_market_id_array[i] && stak_to_market_id_array[i] !== 'undefined' && stak_to_market_id_array[i] !== '') ? stak_to_market_id_array[i] : null;
                                    
                                    // Then insert into bill_items
                                    var stack_to_market_list_id_value = stack_to_market_list_id ? "'"+stack_to_market_list_id+"'" : 'NULL';
                                    con.query("insert into bill_items(bill_detail_id,stack_to_market_list_id,item_name,item_type,quantity,price) values('"+bill_detail_id+"',"+stack_to_market_list_id_value+",'"+items_array[i]+"','"+buy_type_array[i]+"','"+quantity_array[i]+"','"+price_array[i]+"')", function (error2, results2, fields2) {
                                        if (error2) {
                                            return con.rollback(function() {
                                                res.status(500).send("خطا در ثبت آیتم های بل: " + error2.message);
                                            });
                                        }
                                    });
                                });
                       
                                            con.query("select * from stack_to_market_lists where id = '"+stak_to_market_id_array[i]+"'", function (error, results2, fields) {
                                                if (error) {
                                                  return con.rollback(function() {
                                                    res.status(500).send("خطا در بررسی موجودی: " + error.message);
                                                  });
                                                }
                                                if(!results2 || results2.length === 0) {
                                                    return con.rollback(function() {
                                                        res.status(400).send("جنس مورد نظر در موجودی یافت نشد!");
                                                    });
                                                }

                                                console.log("web quantity"+quantity_array[i]);
                                                    var db_quantity = results2[0].quantity;
                                                    console.log("db quantity:"+db_quantity);
                                                    update_quantity= db_quantity - quantity_array[i];

                                                        con.query("update stack_to_market_lists set quantity = '"+update_quantity+"' where id='"+stak_to_market_id_array[i]+"'", function (error, results3, fields) {
                                                            console.log("update stack_to_market_lists set quantity = '"+update_quantity+"' where id='"+stak_to_market_id_array[i]+"'");
                                                            if (error) {
                                                              return con.rollback(function() {
                                                                res.status(500).send("خطا در بروزرسانی موجودی: " + error.message);
                                                              });
                                                            }

                                                    });

                                     });       
                                },i)
                        })(i);
                     }//end of loop
                     
                     // Wait a bit for all async operations to complete, then commit
                     setTimeout(function() {
                         con.commit(function(err) {
                            if (err) {
                              return con.rollback(function() {
                                res.status(500).send("خطا در ثبت نهایی: " + err.message);
                              });
                            }
                            res.send("موفقانه ثبت شد!");
                         });
                     }, 1000); // Wait 1 second for all setTimeout operations to complete
                
                // }
             }); // end of sales_payments query
           }); // end of INSERT query
            }//end of else (line 984)
        });//end of bill_no query (line 972)
        }//end of else (line 969)
        }); // end of beginTransaction (line 965)
           }); // end of app.post (line 857)

        /* testing update froshat details */
        app.post('/update_froshat_details', function(req,res)
           {

            var items = [];
           
            var new_items = [];
            var buy_type = [];
            var new_type = [];
            var quantity = [];
            var new_quantity = [];
            var price = [];
            var new_price = [];
            
             var customer_name = req.body.customer_name;
             var customer_contact = req.body.customer_contact;
             var customer_email = req.body.customer_email;
             var custoemr_id = req.body.cus_id;
             var items = req.body.item_name;
             var items1 = req.body.item_name;
             var newstr = "someerr";

             var buy_type = req.body.item_type;
             var quantity = req.body.quantity;
             var price = req.body.item_price;

             new_items= items += ","+newstr;
             new_type= buy_type += ","+newstr;
             new_quantity= quantity += ","+newstr;
             new_price= price += ","+newstr;

             var items_array = new_items.split(',');
             var buy_type_array = new_type.split(',');
             var quantity_array = new_quantity.split(',');
             var price_array = new_price.split(',');
             var price_tot = req.body.item_total;
            //  var total = req.body.total;
             var total_show = req.body.total_show;
            // console.log(total_show);
            /*  var bill_no = req.body.bill_no;
             var received_show = req.body.reciept_show;
             var remain_show = req.body.remain_show;
             
             var ex_rate = req.body.to_dollar;
             var currency = req.body.currency; */
            // var date = req.body.data_man;
            //  var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

     con.beginTransaction(function(err) {
        if (err)
        {
          throw err;
        }else{
                con.query("select total_amount from froshat_details where id='"+custoemr_id+"' ", function (error, results, fields) {
                  if (error) {

                    return con.rollback(function() {
                      throw error;
                    });
                  }
                  var to_amo = results[0].total_amount ;
                  var upd_amount = to_amo - total_show;
                //  console.log(upd_amount);
                  con.query("update froshat_details set `customer_name`='"+customer_name+"', `email`='"+ customer_email +"',`contact`='"+customer_contact+"',`total_amount`='"+upd_amount+"' where id='"+custoemr_id+"' ", function (error, results, fields) {
                    if (error) {
  
                      return con.rollback(function() {
                        throw error;
                      });
                    }
                 
                  for(var i=0;i<items_array.length-1;i++)
                    {
                        
                        (function(i)
                        {
                            setTimeout(function()  
                            {
                                con.query("insert into return_bill(bill_id,item_name,item_type,quantity,price) values('"+custoemr_id+"','"+items_array[i]+"','"+buy_type_array[i]+"','"+quantity_array[i]+"','"+price_array[i]+"')", function (error, results1, fields) {

                                    console.log("insert into return_bill(bill_id,item_name,item_type,quantity,price) values('"+custoemr_id+"','"+items_array[i]+"','"+buy_type_array[i]+"','"+quantity_array[i]+"','"+price_array[i]+"')");
                                    if (error) {
                                    return con.rollback(function() {
                                        throw error;
                                          });
                                             }
                                              });
                       
                                            con.query("select * from return_bill where bill_id = '"+custoemr_id+"'", function (error, results2, fields) {
                                               
                                                if (error) {
                                                  return con.rollback(function() {
                                                    throw error;
                                                  });
                                                }
                                               
                                                con.query("select * from stack_to_market where item_name='"+items_array[i]+"' and item_type='"+buy_type_array[i]+"'", function (error, results6, fields) {
                                               
                                                    if (error) {
                                                      return con.rollback(function() {
                                                        throw error;
                                                      });
                                                    }
    

                                                console.log("st_tp_m quantity"+results6[0].quantity);
                                                    var db_quantity = results6[0].quantity;
                                                    update_quantity= parseInt(db_quantity) + parseInt(quantity_array[i]);
                                                    console.log(update_quantity);

                                                        con.query("update stack_to_market set quantity = '"+update_quantity+"' where item_name='"+items_array[i]+"' and item_type='"+buy_type_array[i]+"'", function (error, results3, fields) {
                                                            if (error) {
                                                              return con.rollback(function() {
                                                                throw error;
                                                              });
                                                            }

                                                         });
                                                 });
                                                

                                     });       
                                },i)
                        })(i);
                     }//end of loops
                    
                       con.commit(function(err) {
                                if (err) {
                                return con.rollback(function() {
                                    throw err;
                                });
                                }
                       });
                 });
              });
           }
        });
    });

    /* mahsol processing */
    app.post('/mahsole_processing', function(req,res)
    {
        
     var items = [];
     var new_items = [];

     var type = [];
     var new_type = [];

     var quantity = [];
     var new_quantity = [];
      var items = req.body.item;
      var type = req.body.type;
      var quantity = req.body.quantity;
      

      var mahsole_name = req.body.mahsole_name;
      var mahsole_type = req.body.mahsole_type;
      var serial_no = req.body.serial_no;
      

      var newstr = "someerr";

      
      new_items= items += ","+newstr;
      new_type= type += ","+newstr;
      new_quantity= quantity += ","+newstr;
      

      
      var items_array = new_items.split(',');
      var type_array = new_type.split(',');
      var quantity_array = new_quantity.split(',');

      con.query("select * from ready_materials_type where serial_no ='"+serial_no+"'",function(err,rows_05)
      {
          
        if( rows_05.length > 0)
        {
            res.send(" نمبر ثبت موجود است");
        }else{
      
      con.query("INSERT INTO `ready_materials_type`(`name`, `type`, `serial_no`) VALUES ('"+mahsole_name+"','"+mahsole_type+"','"+serial_no+"')",function(err,rows_0031)
      {

        var item_type_id = rows_0031.insertId;

      for(var i=0;i<items_array.length-1 ; i++)
      {

                     (function(i)
                        {
                            setTimeout(function()  
                            {
                        con.query("INSERT INTO `create_mahsol`( `ready_material_type_id`, `item_name`, `item_type`, `quantity`) VALUES ('"+item_type_id+"','"+items_array[i]+"','"+type_array[i]+"','"+quantity_array[i]+"')",function(err,rows_03)
                                    {
                                        if(err)
                                        {
                                            throw err
                                        }else{
                                            console.log("no problems");
                                        }

                                    
                                    });

                            },i)
                        })(i);

     }

     res.send("لیست مواد خام برای تولید محصول ذخیره شد");
    });
}
 });
 });

 /* baraword */
 app.post('/baraword_mashol', function(req,res)
    {
        
     var items = [];
     var new_items = [];

     var type = [];
     var new_type = [];

     var quantity = [];
     var new_quantity = [];
     var price = [];
     var new_price =[];

      var items = req.body.item;
      var type = req.body.type;
      var quantity = req.body.quantity;
      var price = req.body.price;
      

      var mahsole_name = req.body.mahsole_name;
      var mahsole_type = req.body.mahsole_type;
      var expenses = req.body.expenses;
      var total_show = req.body.total_show;
      var ex_rate_01 = req.body.ex_rate_01;
      

      var newstr = "someerr";

      
      new_items= items += ","+newstr;
      new_type= type += ","+newstr;
      new_quantity= quantity += ","+newstr;
      new_price= price += ","+newstr;
      

      
      var items_array = new_items.split(',');
      var type_array = new_type.split(',');
      var quantity_array = new_quantity.split(',');
      var price_array = new_price.split(',');

      con.query("select * from set_price where name='"+mahsole_name+"' and type='"+mahsole_type+"'",function(err,rows_05)
      {
          
        if( rows_05.length > 0)
        {
            res.send("  محصول موجود است");
        }else{
      
      con.query("INSERT INTO `set_price`(`name`, `type`,`ex_rate`,`total_price`) VALUES ('"+mahsole_name+"','"+mahsole_type+"','"+ex_rate_01+"','"+total_show+"')",function(err,rows_0031)
      {

          
          var item_type_id = rows_0031.insertId;
           var exp_name ="مصارف";
          con.query("INSERT INTO `mahsol_price`(`set_p_id`, `item_name`,`quantity`, `price`) VALUES ('"+item_type_id+"','"+exp_name+"','1','"+expenses+"')",function(err,rows_0031)
          {


      for(var i=0;i<items_array.length-1 ; i++)
      {

                     (function(i)
                        {
                            setTimeout(function()  
                            {
                        con.query("INSERT INTO `mahsol_price`( `set_p_id`, `item_name`, `item_type`, `quantity`, `price`) VALUES ('"+item_type_id+"','"+items_array[i]+"','"+type_array[i]+"','"+quantity_array[i]+"','"+price_array[i]+"')",function(err,rows_03)
                                    {
                                        if(err)
                                        {
                                            throw err
                                        }else{
                                            console.log("no problems");
                                        }

                                    
                                    });

                            },i)
                        })(i);

     }

     res.send("لیست مواد خام برای تولید محصول ذخیره شد");
    });
    });
}
 });
 });
 /* baraword */



 /* after producing mahsole */
 app.post('/after_producing', function(req,res)
 {
     
  var items = [];
  var new_items = [];

  var type = [];
  var new_type = [];

  var quantity = [];
  var new_quantity = [];
  

   
   var items = req.body.item;
   var type = req.body.type;
   var quantity = req.body.quantity;

   var mahsole_name = req.body.mahsole_name;
   var mahsole_type = req.body.mahsole_type;
   var serial_no = req.body.serial_no;

   var newstr = "someerr";

   new_stak_r_m_id= stak_r_m_id += ","+newstr;
   new_items= items += ","+newstr;
   new_type= type += ","+newstr;
   new_quantity= quantity += ","+newstr;
   new_price= price += ","+newstr;

   
   var items_array = new_items.split(',');
   var type_array = new_type.split(',');
   var quantity_array = new_quantity.split(',');
   con.query("INSERT INTO `ready_materials_type`(`name`, `type`, `serial_no`) VALUES ('"+mahsole_name+"','"+mahsole_type+"','"+serial_no+"')",function(err,rows_0031)
   {

     var item_type_id = rows_0031.insertId;

   for(var i=0;i<items_array.length-1 ; i++)
   {

                  (function(i)
                     {
                         setTimeout(function()  
                         {
                                 con.query("INSERT INTO `create_mahsol`( `ready_material_type_id`, `item_name`, `item_type`, `quantity`, `price`) VALUES ('"+item_type_id+"','"+items_array[i]+"','"+type_array[i]+"','"+quantity_array[i]+"')",function(err,rows_03)
                                 {
                                     

                                     con.query("select * from stack_raw_materials_lists where item_name ='"+items_array[i]+"' and item_type='"+type_array[i]+"'",function(err,rows_01)
                                     {
                                     var db_quantity = rows_01[0].quantity;
                                     var web_quantity = quantity_array[i];
                                     var update_quantity = db_quantity - web_quantity;
                                     
                                     con.query("update stack_raw_materials_lists set quantity='"+update_quantity+"' where item_name ='"+items_array[i]+"' and item_type='"+type_array[i]+"'",function(err,rows_04)
                                     {

                                     });

                                     });
                                 
                                 });

                         },i)
                     })(i);

  }

  res.send("success");
 });
});
 /* after producing mahsole */

 app.get("/view_creating_materials.ejs", function(req,res){

    con.query("select * from create_mahsol",function(err,rows_01)
    {

        res.render("view_creating_materials",{data_02:rows_01});
    });
 });
        
           //error_1(factory_item_id)
           app.get("/city_store_reg.ejs", function(req,res){

            con.query("SELECT COUNT(item_name)AS total FROM stack_factory_registration",function(err,rows_05)
                {
            con.query("SELECT * from stack_to_market ORDER BY fixed_price ASC ",function(err,rows_02)
            {
                if(rows_02.length >0)
                    {

                            var arr = [];
                            for(var i =0 ;i<rows_02.length;i++)
                            {
                            var sh = moment(rows_02[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                arr += sh +",";
                            }
                            var str_array = arr.split(',');
                            //console.log(str_array);
            
                        res.render("city_store_reg",{data_02:rows_02,date_data:str_array,all_items:rows_05[0].total}); 
                    }else{
                        res.send("<h1 style='color:green; text-align:center;'>گدام شهری خالی است !</h1>");
                    }
       
           });
           });
           });

           //ajax
        //    app.post('/signUp', (req, res) => {
        //         res.end("it worked!!");
        //         res.status(200).send({ status: 'ok' });
        //     });

           app.get("/city_store.ejs", function(req,res){
        
                        con.query("select * from stack_factory_registration ",function(err,rows_02)
                        {

                            con.query("SELECT MAX(id) as new_bill , bill_no FROM stack_to_market_details", function(err,rows_04)
                           {
                            if(err){
                                console.error("Error fetching stack_to_market_details:", err);
                                return res.status(500).send("Database error");
                            }

                        con.query("SELECT id,serial_number,item_name, item_type FROM stack_factory_registration_list", function(err,rows_03)
                        {
                            if(err){
                                console.error("Error fetching stack_factory_registration_list:", err);
                                return res.status(500).send("Database error");
                            }
                        
                          
                       con.query("SELECT * FROM stuff_registration", function(err,rows_05)
                      {
                        if(err){
                            console.error("Error fetching stuff_registration:", err);
                            return res.status(500).send("Database error");
                        }
                        con.query("select * from company_info ", function(err,rows_02)
                        {
                           if(err){
                               console.error("Error fetching company_info:", err);
                               return res.status(500).send("Database error");
                           }
                           // res.render("fro",{data_02:rows_02,data_03:rows_03,data_04:rows_04[0].new_bill,data_05:rows_05});
       
                            // Check if rows_04 exists and has at least one element
                            const newBillId = (rows_04 && rows_04.length > 0 && rows_04[0].new_bill) ? rows_04[0].new_bill : null;
                            res.render("city_store",{data_02:rows_02,data_03:rows_03,data_03:rows_03,data_04:newBillId,data_05:rows_05}); 
            
                        });
                        });
                        });
                        
                    });
                });
       
           });

        
        //    app.get("/city_store.ejs", function(req,res){
        //     console.log("hi async");
        //  //const sql = require('mssql');
        //  async () => {
        //      try {
        //          // make sure that any items are correctly URL encoded in the connection string
        //         // await sql.connect('mssql://username:password@localhost/database')
        //          var rows_02 = await con.query("select * from stack_factory_registration");
        //         ////////////////////// console.dir(result)
        //         console.log(rows_02);
        //         res.render("city_store",{data_02:rows_02}); 
        //      } catch (err) {
        //          console.log(err);
        //      }
        //  }

        //  // con.query("select * from stack_factory_registration ",function(err,rows_02)
        //  // {

         
        //  // });
    
        // });
           app.get("/company.ejs", function(req,res){

  
            res.render("company"); 
       
           });

           app.get("/company-reg.ejs", function(req,res){
            con.query("select * from company_info ",function(err,rows_02)
            {
                var arr = [];
                for(var i =0 ; i<rows_02.length;i++)
                {
                var sh = moment(rows_02[i].starting_activity, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                    arr += sh +",";
                }
                var str_array = arr.split(',');

                
            res.render("company-reg",{data_02:rows_02,date_data:str_array}); 
       
           });
           });

        //    app.get("/signUp", function(req,res){

        //     //res.render("teacher_pay_id"); 
        //     console.log('wow');
       
        //    });

           app.get("/cs-prof.ejs", function(req,res){

            con.query("SELECT customer_account.name,froshat_details.total_amount FROM customer_account INNER JOIN froshat_details ON customer_account.id = froshat_details.cus_id;",function(err,rows_02)
            {
            res.render("cs-prof",{data_02:rows_02});
       
           });
           });
           
           app.get("/cs-reg.ejs", function(req,res){

               con.query("SELECT *,(SELECT round(COALESCE(SUM(total_amount ),0),3)AS total FROM froshat_details WHERE cus_id=customer_account.id) AS total_amount ,(SELECT round(COALESCE(SUM(paid_amount),0),3)AS total_paid FROM froshat_details WHERE cus_id=customer_account.id) AS cus_paid FROM customer_account ",function(err,rows_01)
               {
                  
                        if(rows_01.length >0)
                        {
                                        con.query("SELECT COUNT(id) as total_customers from  `customer_account` ",function(err,rows_02)
                                        {
                                                /* var arr = [];
                                                for(var i =0 ; i<rows_01.length;i++)
                                                {
                                                   
                                                        var sh = moment(rows_01[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                                            arr += sh +",";
                                                            console.log(arr);
                                                      
                                                }
                                                var str_array = arr.split(','); */
                                        res.render("cs-reg",{data_01:rows_01,total_cus:rows_02[0].total_customers}); 
            
                                        });
                            }else{
                                res.send("<h1 style='color:green; text-align:center;'>!مشتری ثبت نشده است</h1>");
                            }
                });
           });

           app.get("/customers.ejs", function(req,res){

  
            res.render("customers"); 
       
           });

           app.get("/disposal.ejs", function(req,res){

            // var edit_id = req.query.eidt_id;
            // console.log(edit_id);
            con.query("select * from expense_category",function(err,rows_01)
            {
                // con.query("select * from expense_category",function(err,rows_01)
                // {
                   res.render("disposal",{data_01:rows_01});
            
                 //});

             });
       
           });

           app.get("/dis-reg.ejs", function(req,res){

                  con.query("SELECT round(SUM((price * quantity)/ex_rate),3) AS total FROM expenses",function(err,rows_04)
                    {

                        con.query("SELECT expenses.*, expense_category.name FROM expenses INNER JOIN expense_category ON expenses.category_id = expense_category.id",function(err,rows_03)
                        {
                            if(rows_03.length >0){
                                var arr = [];
                                for(var i =0 ; i<rows_03.length;i++)
                                {
                                var sh = moment(rows_03[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                    arr += sh +",";
                                }
                                var str_array = arr.split(',');
                                
                                   res.render("dis-reg",{data_03:rows_03,date_data:str_array,expenses:rows_04[0].total}); 
                            }else{
                                res.send("<h1 style='color:green; text-align:center;'>معضرت مصرف ثبت نشده !</h1>");
                            }
                        });
                    });
            });

           app.post('/get_all_types', function(req,res)
           {
               var my_id =  req.query.param;
 
                     con.query("SELECT * FROM material_type where id = '"+my_id+"'", function(err,rows_02)
                     {
                       console.log("SELECT * FROM material_type where id = '"+my_id+"'");
                         res.send(rows_02);
 
                     });
                 
 
            });

            app.post('/get_all_types_2', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("SELECT * FROM ready_materials_type where id = '"+my_id+"'", function(err,rows_02)
                      {
                        console.log("SELECT * FROM ready_materials_type where name = '"+my_id+"'");
                          res.send(rows_02);
  
                      });
                  
  
             });

            

            app.post('/get_all_types_02', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("SELECT * FROM stuff_registration where id = '"+my_id+"'", function(err,rows_02)
                      {
                        console.log("SELECT * FROM stuff_registration where id = '"+my_id+"'");
                          res.send(rows_02);
                         
                      });
             });

             app.post('/get_all_types_3', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("SELECT * FROM customer_account where id = '"+my_id+"'", function(err,rows_02)
                      {
                        console.log("SELECT * FROM customer_account where id = '"+my_id+"'");
                          res.send(rows_02);
                         
                      });
             });


             

           app.get("/emp_removal.ejs", function(req,res){
            con.query("select * from stuff_registration",function(err,rows_03)
            {
  
            res.render("emp_removal",{data_03:rows_03}); 
          });
        });

        
          app.post('/get_stuff_salary', function(req,res)
          {
              var my_id =  req.query.param;

                    con.query("SELECT *,(SELECT SUM(amount)AS total FROM taken_amount WHERE stuff_id=stuff_registration.id) AS totalcount FROM stuff_registration WHERE stuff_registration.id = '"+my_id+"'", function(err,rows_02)
                    {
                
                        res.send(rows_02);

                    });
                

           });

           app.post('/updated_froshats', function(req,res)
          {
              var sales_id =  req.body.sales_id;
              var comp_name =  req.body.comp_name;
              var currency =  req.body.currency1;
              var ex_rate =  req.body.ex_rate1;
              var date =  req.body.data_man1;
              var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                    con.query("UPDATE `froshat_details` SET cus_id='"+comp_name+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m_date+"' WHERE id= '"+sales_id+"'", function(err,rows_02)
                    {
                console.log("UPDATE `froshat_details` SET cus_id='"+comp_name+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m_date+"' WHERE id= '"+sales_id+"'");
                        res.send("موفقانه ذخیره شد");

                    });
                

           });
           ///////////////////starting <delete queries>////////////////////////

           
           app.post('/expense_delete', function(req,res)
           {
               var my_id =  req.query.param;
 
                     con.query("delete from expenses WHERE id = '"+my_id+"'", function(err,rows_02)
                     {
                         res.send(rows_02);
                     });
            });

            app.post('/cate_delete', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("delete from expense_category WHERE id = '"+my_id+"'", function(err,rows_02)
                      {
                          
                          res.send(rows_02);
                      });
             });

             app.post('/material_delete', function(req,res)
                    {
                        var my_id =  req.query.param;
            
                            con.query("delete from stack_raw_materials WHERE id = '"+my_id+"'", function(err,rows_02)
                            {
                                res.send(rows_02);
                            });
                                        
                        });


            app.post('/raw_reg_delete', function(req,res)
           {
                    var my_id =  req.query.param;//husain
 
                    con.query("select * from stack_factory_registration WHERE id = '"+my_id+"'", function(err,rows_01)
                   {
                         var del_quantity = rows_01[0].quantity;
                         var item_name = rows_01[0].item_name;
                         var item_type = rows_01[0].item_type;
                         con.query("select * from stack_factory_registration_list WHERE item_name = '"+item_name+"' and item_type='"+item_type+"'", function(err,rows_03)
                         {
                             var stack_list_quantity = rows_03[0].quantity;
                           
                             var update_quantity =  stack_list_quantity - del_quantity;
                             

                             con.query("update stack_factory_registration_list set quantity ='"+update_quantity+"' WHERE item_name = '"+item_name+"' and item_type='"+item_type+"'", function(err,rows_04)
                                {

                                    
                                    
                                            con.query("delete from stack_factory_registration WHERE id = '"+my_id+"'", function(err,rows_02)
                                            {
                                            con.query("delete from raw_material_each_mahsol WHERE stack_factory_id = '"+my_id+"'", function(err,rows_005)
                                            {
                                                res.send(rows_02);
                                            });
                                            });
                               });
                         });
                  });
                     
            });

            app.post('/city_store_delete', function(req,res)
           {
               var my_id =  req.query.param;
 
                     con.query("delete from stack_to_market WHERE id = '"+my_id+"'", function(err,rows_02)
                     {
                         res.send(rows_02);
                     });
            });

            app.post('/delete_emp_reg', function(req,res)
           {
               var my_id =  req.query.param;
 
                     con.query("delete from stuff_registration WHERE id = '"+my_id+"'", function(err,rows_02)
                     {
                         res.send(rows_02);
                     });
            });

            app.post('/delete_emp_removal', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from taken_amount WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                app.post('/delete_stuff_paid', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("select * from payable_amount WHERE id = '"+my_id+"'", function(err,rows_01)
                        {
                            var paid_amount =rows_01[0].taken_amount;
                            var stuff_id =rows_01[0].stuff_id;
                        con.query("select * from stuff_registration WHERE id = '"+stuff_id+"'", function(err,rows_02)
                        {
                        con.query("select * from taken_amount WHERE id = '"+stuff_id+"'", function(err,rows_03)
                        {
                            var salary = rows_02[0].salary;
                            var take_id = rows_02[0].id;
                            var update_taken_amount = salary - paid_amount;

                            con.query("update taken_amount set amount='"+update_taken_amount+"' WHERE id = '"+take_id+"'", function(err,rows_05)
                            {

                        con.query("delete from payable_amount WHERE id = '"+my_id+"'", function(err,rows_04)
                        {
                            res.send(rows_04);
                        });
                        });
                        });
                        });
                        });
                });

                app.post('/delete_income_loans', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from incoming_loan WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                app.post('/delete_outcome_loans', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from outgoing_loan WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                app.post('/delete_machine_tols', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from item_registration WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

          

                app.post('/delete_tols', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from item_registration WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                      app.post('/delete_customers', function(req,res)
                        {
                            var my_id =  req.query.param;
            
                                con.query("delete from customer_account WHERE id = '"+my_id+"'", function(err,rows_02)
                                {
                                    res.send(rows_02);
                                });
                        });


                app.post('/delete_partners', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from partner_registration WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                app.post('/delete_partner_taken', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from outgoing_loan WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                app.post('/delete_company_info', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from company_info WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });

                app.post('/add_payment_delete', function(req,res)
                {
                    var my_id =  req.query.param;
                    var loan_id =  req.query.loan_id;
    
                        con.query("delete from incoming_loan_list WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            if(err)
                                        {
                                            throw err;
                                        }else{

                                    con.query("select * from incoming_loan_list where incoming_loan_id ='"+loan_id+"'",function(err1,rows_04)
                                        {
                                            if(err1)
                                            {
                                                throw err1;
                                            }else{
                                                var table_data = "";
                                                    var no =1;
                                                    rows_04.forEach( (row) => {
                                                        table_data += "<tr id="+"delete_row_"+row.id+">";
                                                            table_data += "<td>"+ no+ "</td>";
                                                            table_data += "<td>"+ row.paid+ "</td>";
                                                            table_data += "<td>"+ row.currency+ "</td>";
                                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                                            table_data += "<td>"+ row.date+ "</td>";
                                                            table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" style='color:red;' href='#'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                                            table_data += "</tr>";
                                                            no++;
                                                        
                                                    });
                                                    res.send(table_data);
                                        }
                                     });
                                }
                        });
                });

                //delete outging
                app.post('/add_payment_delete_001', function(req,res)
                {
                    var my_id =  req.query.param;
                    var loan_id =  req.query.loan_id;
    
                        con.query("delete from outgoing_loan_list WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            if(err)
                                        {
                                            throw err;
                                        }else{

                                    res.send("معذرت ! پرداخت صورت نگرفته است ");
                                }
                        });
                });
                   
                app.post('/froshat_view_delete', function(req,res)
                {
                    var my_id =  req.query.param;
    
                   /*  con.query("select * from bill_details where bill_id = '"+my_id+"'", function(err,rows_05)
                    { */

                       /*  for(var i=0;i<rows_05.length; i++)
                        {
                            var item_name =  rows_05[i].item_name;
                            var item_type = rows_05[i].item_type;
                            var bill_qunatity = rows_05[i].quantity;

                            con.query("select * from stack_to_market item_name = '"+item_name+"' and item_type='"+item_type+"'", function(err,rows_04)
                            {
                                var stak_quna = rows_04[i].quantity;
                                var update_quna = bill_qunatity + stak_quna;
                                con.query("update stack_to_market set quantity='"+update_quna+"' where item_name = '"+item_name+"' and item_type='"+item_type+"'", function(err,rows_06)
                                {


                                });
                            });
                        } */

                        
                            /* con.query("delete from bill_details WHERE bill_id = '"+my_id+"'", function(err,rows_03)
                            { */
                           
                               

                                con.query("delete from froshat_details WHERE id = '"+my_id+"'", function(err,rows_02)
                                {
                                 
                                     if(err)
                                     {
                                        res.send("این شخص معامله دارد نمیتوانید حذف کنید! ");
                                       
                                     }else{
                                        res.send("موفقانه حذف شد !");
                                     }
                               
                                   /*  res.send(rows_02); */
                                });
                           /*  }); */
                        
                    /* }); */
                });

                app.post('/delete_parent_mahsol_formula', function(req,res)
                {
                    var my_id =  req.query.param;
    
                    
                            con.query("delete from create_mahsol WHERE ready_material_type_id= '"+my_id+"'", function(err,rows_02)
                            {
                              con.query("delete from ready_materials_type where id = '"+my_id+"'", function(err,rows_05)
                                {
                                 
                                     
                                        res.send("موفقانه حذف شد !");
                                    
                                });
                            });
                });


                app.post('/delete_price_mahsol_formula', function(req,res)
                {
                    var my_id =  req.query.param;
    
                    
                            con.query("delete from mahsol_price WHERE set_p_id= '"+my_id+"'", function(err,rows_02)
                            {
                              con.query("delete from set_price where id = '"+my_id+"'", function(err,rows_05)
                                {
                                 
                                     
                                        res.send("موفقانه حذف شد !");
                                    
                                });
                            });
                });

                app.post('/delete_users', function(req,res)
                {
                    var my_id =  req.query.param;
    
                        con.query("delete from users WHERE id = '"+my_id+"'", function(err,rows_02)
                        {
                            res.send(rows_02);
                        });
                });
            //||||||||||||||||ending </delete queries>||||||||||||||||||||||||//

            ////////////////////starting <update queries>//////////////////////|
            app.post('/update_expense', function(req,res)
            {
                var my_id =  req.query.param; 

                     var  query2 = "SELECT expenses.*, expense_category.name FROM expenses INNER JOIN expense_category ON expenses.category_id = expense_category.id  WHERE expenses.id = '"+my_id+"'";
                      con.query(query2,function(err,rows_02)
                      {
                        var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

                        var strify = JSON.stringify(rows_02);
                        var newStr = strify.substring(1, strify.length-1);
                  
                          //res.send({data:rows_02,data1:jso});
                          res.json({
                              data:sh,
                              data1:newStr
                          })
  
                      }); 
             });

             app.post('/update_expense_01', function(req,res)
             {
                      var edit_id =  req.body.expense_id; 
                      var quantity =  req.body.quantity; 
                      var price =  req.body.price; 
                      var description =  req.body.description; 
                      var currency =  req.body.currency; 
                      var ex_rate =  req.body.ex_rate; 
                      var date =  req.body.data_man;
                      var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                      var  update_query = "update expenses set quantity='"+quantity+"',price='"+price+"',description='"+description+"',ex_rate='"+ex_rate+"',currency='"+currency+"',date='"+m_date+"' WHERE id = '"+edit_id+"'";
                       con.query(update_query,function(err,rows_02)
                       {
                          console.log(update_query);
                           if(err)
                           {
                               throw err
                           }else{
                                res.json({
                                status:'1',
                                data:rows_02
                            });
                           }
   
                       }); 
              });

              app.post('/cate_edit', function(req,res)
              {
                  var my_id =  req.query.param; 
                 
  
                       var  query2 = "SELECT * from expense_category WHERE id = '"+my_id+"'";
                        con.query(query2,function(err,rows_02)
                        {
                            
                            res.send(rows_02);
                        }); 
               });

               app.post('/add_new_edit_cat', function(req,res)
              {
                  var my_id =  req.query.param; 
                  //console.log(my_id);
  
                       var  query2 = "SELECT * from material_type WHERE id = '"+my_id+"'";
                        con.query(query2,function(err,rows_02)
                        {
                            //console.log(rows_02);
                            res.send(rows_02);
                        }); 
               });

               app.post('/add_new_edit_type', function(req,res)
              {
                  var my_id =  req.query.param; 
                 
  
                       var  query2 = "SELECT * from ready_materials_type WHERE id = '"+my_id+"'";
                        con.query(query2,function(err,rows_02)
                        {
                            
                            res.send(rows_02);
                        }); 
               });

               app.post('/delete_add_new_material', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("delete from material_type WHERE id = '"+my_id+"'", function(err,rows_02)
                      {
                          res.send(rows_02);
                      });
             });

             app.post('/delete_add_new_material_type', function(req,res)
             {
                 var my_id =  req.query.param;
   
                       con.query("delete from ready_materials_type WHERE id = '"+my_id+"'", function(err,rows_02)
                       {
                           res.send(rows_02);
                       });
              });

               /* graph */
               app.post('/graph_data', function(req,res)
               {
                        var result = [];
                        var all_date = ['2020-03-20 07:00:53','2020-04-19 07:00:53','2020-04-20 07:00:53','2020-05-20 07:00:53','2020-05-21 07:00:53','2020-06-20 07:00:53','2020-06-21 07:00:53','2020-07-21 07:00:53','2020-07-22 07:00:53','2020-08-21 07:00:53','2020-08-22 07:00:53','2020-09-21 07:00:53','2020-09-22 07:00:53','2020-10-21 07:00:53','2020-10-22 07:00:53','2020-11-20 07:00:53','2020-11-21 07:00:53','2020-12-20 07:00:53','2020-12-21 07:00:53','2021-01-19 07:00:53','2021-01-20 07:00:53','2021-02-18 07:00:53','2021-02-19 07:00:53','2020-03-20 07:00:53'];

                        
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[0]+"' AND '"+all_date[1]+"' ",function(err,rows_01)
                                {
                         con.query("SELECT  round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[2]+"' AND '"+all_date[3]+"' ",function(err,rows_02)
                                {
                         con.query("SELECT  round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[4]+"' AND '"+all_date[5]+"' ",function(err,rows_03)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[6]+"' AND '"+all_date[7]+"' ",function(err,rows_04)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[8]+"' AND '"+all_date[9]+"' ",function(err,rows_05)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[10]+"' AND '"+all_date[11]+"' ",function(err,rows_06)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[12]+"' AND '"+all_date[13]+"' ",function(err,rows_07)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[14]+"' AND '"+all_date[15]+"' ",function(err,rows_08)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[16]+"' AND '"+all_date[17]+"' ",function(err,rows_09)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[18]+"' AND '"+all_date[19]+"' ",function(err,rows_10)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[20]+"' AND '"+all_date[21]+"' ",function(err,rows_11)
                                {
                         con.query("SELECT round(COALESCE(SUM(total_amount/ex_rate),0),3) as total_sell FROM `froshat_details` WHERE date BETWEEN '"+all_date[22]+"' AND '"+all_date[23]+"' ",function(err,rows_12)
                                {
                                    
                                   
                                    var date_only1 = rows_01[0].total_sell;
                                    var date_only2 = rows_02[0].total_sell;
                                    var date_only3 = rows_03[0].total_sell;
                                    var date_only4 = rows_04[0].total_sell;
                                    var date_only5 = rows_05[0].total_sell;
                                    var date_only6 = rows_06[0].total_sell;
                                    var date_only7 = rows_07[0].total_sell;
                                    var date_only8 = rows_08[0].total_sell;
                                    var date_only9 = rows_09[0].total_sell;
                                    var date_only10 = rows_10[0].total_sell;
                                    var date_only11 = rows_11[0].total_sell;
                                    var date_only12 = rows_12[0].total_sell;

                                     result += date_only1 + ","+date_only2 + ','+date_only3 + ','+date_only4 + ","+date_only5 + ','+date_only6+','+date_only7 + ","+date_only8 + ','+date_only9 + ','+date_only10 + ","+date_only11 + ','+date_only12;
                                    
                                     var str_array = result.split(',');
                                     
                                       
                                    res.send(str_array);
        
                                }); 
                                }); 
                                }); 
                                }); 
                                }); 
                                }); 

                            }); 
                        }); 
                        }); 
                        }); 
                        }); 
                        });
                      
                        
                });


                //var date_only = rows_02[0].date.slice(0, 10);
               app.post('/cat_val_edit', function(req,res)
              {
                  var id_val =  req.query.id_val; 
                  var name_val =  req.query.name_val;
                        con.query("update expense_category set name='"+name_val+"' WHERE id = '"+id_val+"'",function(err,rows_02)
                        {
                            if(err)
                            {
                                throw err;
                            }else{
                                con.query("select * from expense_category",function(err1,rows_04)
                                {
                                    if(err1)
                                    {
                                        throw err1;
                                    }else{
                                        var table_data = "";
                                        var no =1;
                                        rows_04.forEach( (row) => {
                                            table_data += "<tr id=parent_d_"+row.id+">";
                                                table_data += "<td>"+ no+ "</td>";
                                                table_data += "<td>"+ row.name+ "</td>";
                                                table_data += "<td><a onclick="+"cat_delet1("+row.id+")"+" href=# style='color:red;'>حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                                                table_data += "</tr>";
                                                no++;
                                            
                                        });
                                       res.send(table_data);
                                  }
                                });
                               
                            }
                        }); 
               });

               app.post('/update_materials', function(req,res)
            {
                var my_id =  req.query.param; 

                     var  query2 = "SELECT * from stack_raw_materials WHERE id = '"+my_id+"'";
                      con.query(query2,function(err,rows_02)
                      {
                        var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

                        var strify = JSON.stringify(rows_02);
                        var newStr = strify.substring(1, strify.length-1);
                  
                          //res.send({data:rows_02,data1:jso});
                          res.json({
                              data:sh,
                              data1:newStr
                          })
  
                      }); 
             });

             app.post('/update_raw_material_01', function(req,res)
             {
                 
                      var edit_id =  req.body.expense_id; 

                      var buy_type =  req.body.item_type; 
                     
                      var com_name =  req.body.company_name; 
                      var contact =  req.body.contact; 
                      var bill_no =  req.body.bill_no; 
                      var item_name =  req.body.item_name; 
                     
                      var inch =  req.body.inch; 
                      var buy_place =  req.body.buy_place; 
                      var description =  req.body.description; 
                      var price =  req.body.price; 
                      var web_quantity = parseFloat(req.body.quantity); 
                     
                      var benefit =  req.body.benefit; 
                      var recieved =  req.body.recieved; 
                     // var description =  req.body.description; 
                      var date =  req.body.data_man;
                      var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                      var  update_query = "UPDATE `stack_raw_materials` SET `buy_type`='"+buy_type+"',`company_name`='"+com_name+"',`contact`='"+contact+"',`bill_no`='"+bill_no+"',`item_name`='"+item_name+"',`item_type`='"+buy_type+"',`buy_place`='"+buy_place+"',`description`='"+description+"',`quantity`='"+web_quantity+"',`price`='"+price+"',`profit_per_one`='"+benefit+"',`paid_amount`='"+recieved+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                       con.query(update_query,function(err,rows_02)
                       {
                           if(err)
                           {
                               throw err
                           }else{
                                res.json({
                                status:'1',
                                data:rows_02
                            });
                           }
   
                      
                       }); 
                     
              });

              app.post('/update_rmf_regs', function(req,res)
              {
                  var my_id =  req.query.param; 
  
                       var  query2 = "SELECT * from stack_factory_registration WHERE id = '"+my_id+"'";
                        con.query(query2,function(err,rows_02)
                        {
                          var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  
                          var strify = JSON.stringify(rows_02);
                          var newStr = strify.substring(1, strify.length-1);
                    
                            //res.send({data:rows_02,data1:jso});
                            res.json({
                                data:sh,
                                data1:newStr
                            })
    
                        }); 
               });

               app.post('/update_rmf_material_01', function(req,res)
               {
                        var edit_id =  req.body.expense_id; 
                        var item_name =  req.body.item_name;
                        var item_type =  req.body.item_type; 
                        
                        var currency =  req.body.currency; 
                        var ex_rate =  req.body.ex_rate; 
                        var web_quantity =  req.body.quantity; 
                        var fixed_price =  req.body.fixed_price; 
                        var sell_price =  req.body.sell_price; 
                        var id_number =  req.body.id_number; 
                    
                        var date =  req.body.data_man;
                        var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');



                            con.query("select * from stack_factory_registration_list where `item_name`='"+item_name+"' and `item_type`='"+item_type+"'",function(err,rows_3)
                                    {
                                var stac_list_quantity = rows_3[0].quantity;

                                con.query("select * from stack_factory_registration where id='"+edit_id+"' ",function(err,rows_4)
                                    {
                                var stac_quantity = rows_4[0].quantity;
                                var update_quantity = 0;
                                var new_update = 0;

                                if(stac_quantity == web_quantity)
                                {
                                   var new_update=  web_quantity + update_quantity;
                                }
                                //web 5 , stack 4
                                if(  web_quantity > stac_quantity)
                                {
                                    var new_update1=  web_quantity - stac_quantity;
                                    var new_update = new_update1 + stac_list_quantity;
                                   
                                }

                                if(web_quantity < stac_quantity)
                                {
                                    var new_update1 = stac_quantity - web_quantity;
                                    var new_update = stac_list_quantity - new_update1;
                                    console.log(new_update1);
                                    console.log(new_update);
                                }
  
                                con.query("update stack_factory_registration_list set quantity ='"+new_update+"' where `item_name`='"+item_name+"' and `item_type`='"+item_type+"'",function(err,rows_5)
                                {
                            
                             if(err)
                             {
                                 throw err
                             }else{
                               
                                    con.query("UPDATE `stack_factory_registration` SET `item_name`='"+item_name+"',`item_type`='"+item_type+"',`quantity`='"+web_quantity+"',`fixed_price`='"+fixed_price+"',`sell_price`='"+sell_price+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`serial_number`='"+id_number+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'",function(err,rows_02)
                                    {
                                      res.json({
                                          status:'1',
                                          data:rows_02
                                      })
                                   });
                             }
     
                         }); 
                         }); 
                         }); 
                });

                app.post('/update_city_store_regs', function(req,res)
                {
                    var my_id =  req.query.param;
    
                         var  query2 = "SELECT * from stack_to_market WHERE id = '"+my_id+"'";
                          con.query(query2,function(err,rows_02)
                          {
                            var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    
                            var strify = JSON.stringify(rows_02);
                            var newStr = strify.substring(1, strify.length-1);

                              res.json({
                                  data:sh,
                                  data1:newStr
                              })
      
                          }); 
                 });
                 app.post('/update_city_store_01', function(req,res)
                 {
                          var edit_id =  req.body.expense_id; 
                          var item_name =  req.body.item_name;
                          var item_type =  req.body.item_type;
                          var quantity =  req.body.quantity; 
                          var fixed_price =  req.body.fixed_price; 
                          var sell_price =  req.body.sell_price; 
                          var date =  req.body.data_man;
                          var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    
                          var  update_query = "UPDATE `stack_to_market` SET `item_name`='"+item_name+"',`item_type`='"+item_type+"',`fixed_price`='"+fixed_price+"',`sell_price`='"+sell_price+"',`quantity`='"+quantity+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                           con.query(update_query,function(err,rows_02)
                           {
                              console.log(update_query);
                               if(err)
                               {
                                   throw err
                               }else{
                                    res.json({
                                    status:'1',
                                    data:rows_02
                                });
                               }
       
                           }); 
                  });
                  app.post('/update_emp_regs', function(req,res)
                  {
                      var my_id =  req.query.param;
      
                           var  query2 = "SELECT * from stuff_registration WHERE id = '"+my_id+"'";
                            con.query(query2,function(err,rows_02)
                            {
                              var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      
                              var strify = JSON.stringify(rows_02);
                              var newStr = strify.substring(1, strify.length-1);
  
                                res.json({
                                    data:sh,
                                    data1:newStr
                                })
        
                            }); 
                   });

                   app.post('/update_emp_reg_01', function(req,res)
                   {
                    if (!(req.files && req.files.image))
                    {
                            var edit_id =  req.body.expense_id; 
                            var emp_name =  req.body.emp_name;
                            var last_name =  req.body.last_name;
                            var contact =  req.body.contact; 
                            var email =  req.body.email; 
                            var tazkira =  req.body.tazkira; 
                            var address =  req.body.address; 
                            var working_location =  req.body.working_location; 
                            var job_type =  req.body.job_type; 
                            var salary =  req.body.salary; 
                            var id_number =  req.body.id_number; 
                            
                            //console.log(file_name);
                            //var image =  req.body.image; 
                            var date =  req.body.data_man;
                            var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                            // if(file_name != 0)
                            /* if (!(req.files && req.files.image)) */
                            /* if (!(req.files))
                            { */
                                var  update_query1 = "UPDATE `stuff_registration` SET `name`='"+emp_name+"',`last_name`='"+last_name+"',`contact`='"+contact+"',`email`='"+email+"',`tazkira`='"+tazkira+"',`address`='"+address+"',`job_place`='"+working_location+"',`job_type`='"+job_type+"',`id_number`='"+id_number+"',`salary`='"+salary+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                                con.query(update_query1,function(err,rows_03)
                                {
                                    if(err)
                                    {
                                        throw err
                                    }else{
                                        res.json({
                                        status:'1',
                                       // data:rows_02
                                    });
                                   }
                                  
                                });
                            }else{
                                var edit_id =  req.body.expense_id; 
                                var emp_name =  req.body.emp_name;
                                var last_name =  req.body.last_name;
                                var contact =  req.body.contact; 
                                var email =  req.body.email; 
                                var tazkira =  req.body.tazkira; 
                                var address =  req.body.address; 
                                var working_location =  req.body.working_location; 
                                var job_type =  req.body.job_type; 
                                var salary =  req.body.salary; 
                                var id_number =  req.body.id_number; 
                                var file = req.files.image;
                                var  file_name = file.name;
                                var date =  req.body.data_man;
                                var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                                var  update_query = "UPDATE `stuff_registration` SET `name`='"+emp_name+"',`last_name`='"+last_name+"',`contact`='"+contact+"',`email`='"+email+"',`tazkira`='"+tazkira+"',`address`='"+address+"',`job_place`='"+working_location+"',`job_type`='"+job_type+"',`id_number`='"+id_number+"',`salary`='"+salary+"',`image`='"+file_name+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                                con.query(update_query,function(err,rows_02)
                                {
                                    console.log(update_query);
                                    if(err)
                                    {
                                        throw err
                                    }else{
                                        res.json({
                                        status:'1',
                                        data:rows_02
                                    });
                                    file.mv("Images/"+file_name,function(err)
                                            {
                                            
                                            });
                                    }
            
                                }); 
                            }
                    });

                    app.post('/update_emp_taken', function(req,res)
                    {
                        var my_id =  req.query.param;
        
                             var  query2 = "SELECT taken_amount.id as tken_id,taken_amount.amount,taken_amount.currency,taken_amount.ex_rate,taken_amount.date , stuff_registration.* from taken_amount INNER JOIN stuff_registration ON taken_amount.stuff_id = stuff_registration.id WHERE taken_amount.id = '"+my_id+"'";
                              con.query(query2,function(err,rows_02)
                              {
                                var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
        
                                var strify = JSON.stringify(rows_02);
                                var newStr = strify.substring(1, strify.length-1);
    
                                  res.json({
                                      data:sh,
                                      data1:newStr
                                  })
          
                              }); 
                     });
                     //this has problems because in taken amount we can only edit taken amount of different dates may we have same ids in each rows
                     app.post('/update_employees_taken', function(req,res)
                 {
                          var edit_id =  req.body.expense_id; 
                        //   var name =  req.body.name;
                        //   var last_name =  req.body.last_name;
                        //   var contact =  req.body.contact; 
                        //   var email =  req.body.email; 
                        //   var id_number =  req.body.id_number; 

                          var taken_amount =  req.body.taken_amount; 
                          var date = req.body.data_man;
                          
                          var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    
                          var  update_query = "UPDATE `taken_amount` SET `amount`='"+taken_amount+"', date='"+m_date+"'  WHERE id = '"+edit_id+"'";
                           con.query(update_query,function(err,rows_02)
                           {
                              console.log(update_query);
                               if(err)
                               {
                                   throw err
                               }else{
                                    res.json({
                                    status:'1',
                                    data:rows_02
                                });
                               }
       
                           }); 
                  });

                  app.post('/update_payable_sal', function(req,res)
                  {
                      var my_id =  req.query.param;
      
                           var  query2 = "SELECT * from payable_amount WHERE id = '"+my_id+"'";
                            con.query(query2,function(err,rows_02)
                            {
                              var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      
                              var strify = JSON.stringify(rows_02);
                              var newStr = strify.substring(1, strify.length-1);
  
                                res.json({
                                    data:sh,
                                    data1:newStr
                                })
        
                            }); 
                   });

                   app.post('/update_emp_salry', function(req,res)
                   {
                            var edit_id =  req.body.expense_id; 
                            var payable_amount =  req.body.payable_amount;
                            var tax =  req.body.tax;
                            var overtime =  req.body.overtime; 
                            var payable =  req.body.payable; 
                            var currency =  req.body.currency; 
  
                            var ex_rate =  req.body.ex_rate; 
                            var date = req.body.data_man;
                            
                            var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
      
                            var  update_query = "UPDATE `payable_amount` SET `taken_amount`='"+payable_amount+"',`tax`='"+tax+"',`overtime`='"+overtime+"',`payable`='"+payable+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                             con.query(update_query,function(err,rows_02)
                             {
                                console.log(update_query);
                                 if(err)
                                 {
                                     throw err
                                 }else{
                                      res.json({
                                      status:'1',
                                      data:rows_02
                                  });
                                 }
         
                             }); 
                    });

                    app.post('/update_income_loan', function(req,res)
                        {
                            var my_id =  req.query.param;
            
                                var  query2 = "SELECT * from incoming_loan WHERE id = '"+my_id+"'";
                                    con.query(query2,function(err,rows_02)
                                    {
                                    var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
            
                                    var strify = JSON.stringify(rows_02);
                                    var newStr = strify.substring(1, strify.length-1);
        
                                        res.json({
                                            data:sh,
                                            data1:newStr
                                        })
                
                                    }); 
                        });

                   app.post('/update_inloan_reg', function(req,res)
                   {
                            var edit_id =  req.body.expense_id; 
                            var borrower =  req.body.borrower;
                            var lender =  req.body.lender;
                            var loan_amount =  req.body.loan_amount; 
                            var installment_no =  req.body.installment_no; 
                            var lender_contact =  req.body.lender_contact; 
                            var address =  req.body.address; 
                            var benefit =  req.body.benefit; 
                            var loan_currency =  req.body.loan_currency; 
  
                            var loan_ex_rate =  req.body.loan_ex_rate; 
                            var date = req.body.data_man;
                            
                            var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
      
                            var  update_query = "UPDATE `incoming_loan` SET `borrower`='"+borrower+"',`lender`='"+lender+"',`amount`='"+loan_amount+"',`installment_no`='"+installment_no+"',`lender_contact`='"+lender_contact+"',`address`='"+address+"',`currency`='"+loan_currency+"',`ex_rate`='"+loan_ex_rate+"',`benefit`='"+benefit+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                             con.query(update_query,function(err,rows_02)
                             {
                                console.log(update_query);
                                 if(err)
                                 {
                                     throw err
                                 }else{
                                      res.json({
                                      status:'1',
                                      data:rows_02
                                  });
                                 }
         
                             }); 
                    });

                    
                    app.post('/update_out_loan', function(req,res)
                  {
                      var my_id =  req.query.param;
      
                           var  query2 = "SELECT stuff_registration.id as stf_id,stuff_registration.name,outgoing_loan.id,outgoing_loan.company_name,outgoing_loan.amount,outgoing_loan.installment_no,outgoing_loan.currency,outgoing_loan.ex_rate,outgoing_loan.tazkira,outgoing_loan.date FROM stuff_registration INNER JOIN outgoing_loan ON stuff_registration.id = outgoing_loan.stuff_id WHERE outgoing_loan.id = '"+my_id+"'";
                            con.query(query2,function(err,rows_02)
                            {
                              var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      
                              var strify = JSON.stringify(rows_02);
                              var newStr = strify.substring(1, strify.length-1);
  
                                res.json({
                                    data:sh,
                                    data1:newStr
                                })
        
                            }); 
                   });

                   app.post('/update_o_nloan_reg', function(req,res)
                   {
                            var edit_id =  req.body.expense_id; 
                           // var stuff_name =  req.body.stuff_name;
                            var company_name =  req.body.company_name;
                            var out_amount =  req.body.out_amount; 
                            var installment_no =  req.body.installment_no; 
                            var loan_currency =  req.body.loan_currency; 
                            var loan_ex_rate =  req.body.loan_ex_rate;
                            var tazkira =  req.body.tazkira; 
                            var date = req.body.data_man;
                            
                            var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
      
                            var  update_query = "UPDATE `outgoing_loan` SET `company_name`='"+company_name+"',`amount`='"+out_amount+"',`installment_no`='"+installment_no+"',`currency`='"+loan_currency+"',`ex_rate`='"+loan_ex_rate+"',`tazkira`='"+tazkira+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                             con.query(update_query,function(err,rows_02)
                             {
                                console.log(update_query);
                                 if(err)
                                 {
                                     throw err
                                 }else{
                                      res.json({
                                      status:'1',
                                      data:rows_02
                                  });
                                 }
         
                             }); 
                    });

                    app.post('/update_maching_year', function(req,res)
                    {
                        var my_id =  req.query.param;
        
                             var  query2 = "SELECT * FROM  item_registration where  id = '"+my_id+"'";
                              con.query(query2,function(err,rows_02)
                              {
                                var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
        
                                var strify = JSON.stringify(rows_02);
                                var newStr = strify.substring(1, strify.length-1);
    
                                  res.json({
                                      data:sh,
                                      data1:newStr
                                  })
          
                              }); 
                     });

                     app.post('/update_machine_tools', function(req,res)
                    {
                        var my_id =  req.query.param;
                             
                             var  query2 = "SELECT * FROM  item_registration where machine_life IS NULL and id = '"+my_id+"'";
                              con.query(query2,function(err,rows_02)
                              {
                                  console.log(query2);
                                var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
        
                                var strify = JSON.stringify(rows_02);
                                var newStr = strify.substring(1, strify.length-1);
    
                                  res.json({
                                      data:sh,
                                      data1:newStr
                                  })
          
                              }); 
                     });

                     app.post('/udpate_machine_tools_02', function(req,res)
                     {
                         console.log("edited tools")
                              var edit_id =  req.body.expense_id; 
                              var name =  req.body.name;
                              var company_name =  req.body.company_name;
                              var description =  req.body.description; 
                              var quantity =  req.body.quantity; 
                              var purchase_price =  req.body.purchase_price; 
                              var expire_date =  req.body.expire_date;
                              var currency =  req.body.currency; 
                              var ex_rate =  req.body.ex_rate; 
                             
                              var date = req.body.data_man;
                              
                              var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
        
                              var  update_query = "UPDATE `item_registration` SET`name`='"+name+"',`company_name`='"+company_name+"',`description`='"+description+"',`quantity`='"+quantity+"',`purchase_price`='"+purchase_price+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                               con.query(update_query,function(err,rows_02)
                               {
                                  console.log(update_query);
                                   if(err)
                                   {
                                       throw err
                                   }else{
                                        res.json({
                                        status:'1',
                                        data:rows_02
                                    });
                                   }
           
                               }); 
                      });

                      app.post('/udpate_machine_tools_03', function(req,res)
                      {
                          
                               var edit_id =  req.body.expense_id; 
                               var name =  req.body.name;
                               var company_name =  req.body.company_name;
                               var description =  req.body.description; 
                               var quantity =  req.body.quantity; 
                               var purchase_price =  req.body.purchase_price; 
                               var expire_date =  req.body.expire_date;
                               var currency =  req.body.currency; 
                               var ex_rate =  req.body.ex_rate; 
                              
                               var date = req.body.data_man;
                               
                               var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
         
                               var  update_query = "UPDATE `item_registration` SET`name`='"+name+"',`company_name`='"+company_name+"',`description`='"+description+"',`quantity`='"+quantity+"',`purchase_price`='"+purchase_price+"',`machine_life`='"+expire_date+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                                con.query(update_query,function(err,rows_02)
                                {
                                   console.log(update_query);
                                    if(err)
                                    {
                                        throw err
                                    }else{
                                         res.json({
                                         status:'1',
                                         data:rows_02
                                     });
                                    }
            
                                }); 
                       });

                       app.post('/update_custmers', function(req,res)
                            {
                                var my_id =  req.query.param;
                                    
                                    var  query2 = "SELECT * FROM  customer_account where  id = '"+my_id+"'";
                                    con.query(query2,function(err,rows_02)
                                    {
                                        console.log(query2);
                                        var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                
                                        var strify = JSON.stringify(rows_02);
                                        var newStr = strify.substring(1, strify.length-1);
            
                                        res.json({
                                            data:sh,
                                            data1:newStr
                                        })
                
                                    }); 
                            });

                     app.post('/update_customer_02', function(req,res)
                     {
                         
                              var edit_id =  req.body.expense_id; 
                              var name =  req.body.name;
                              var last_name =  req.body.last_name;
                              var company_name =  req.body.company_name;
                              var contact =  req.body.contact; 
                              var address =  req.body.address; 
                              var email =  req.body.email; 
                             
                              var date = req.body.data_man;
                              
                              var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
        
                              var  update_query = "UPDATE `customer_account` SET `name`='"+name+"',`last_name`='"+last_name+"',`company_name`='"+company_name+"',`contact`='"+contact+"',`address`='"+address+"',`email`='"+email+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                               con.query(update_query,function(err,rows_02)
                               {
                                   console.log(update_query);
                                   if(err)
                                   {
                                       throw err
                                   }else{
                                        res.json({
                                        status:'1',
                                        data:rows_02
                                    });
                                   }
           
                               }); 
                      });

                      app.post('/update_partners_01', function(req,res)
                            {
                                var my_id =  req.query.param;
                                    
                                    var  query2 = "SELECT * FROM  partner_registration where  id = '"+my_id+"'";
                                    con.query(query2,function(err,rows_02)
                                    {
                                        console.log(query2);
                                        var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                
                                        var strify = JSON.stringify(rows_02);
                                        var newStr = strify.substring(1, strify.length-1);
            
                                        res.json({
                                            data:sh,
                                            data1:newStr
                                        })
                
                                    }); 
                            });

                            app.post('/update_partners_02', function(req,res)
                            {
                                
                                     var edit_id =  req.body.expense_id; 
                                     var full_name =  req.body.full_name;
                                     var location =  req.body.location;
                                     var contact =  req.body.contact; 
                                     var email =  req.body.email; 
                                     var address =  req.body.address; 
                                     var assets_amount =  req.body.assets_amount; 
                                     var address =  req.body.address; 
                                    
                                     var date = req.body.data_man;
                                     
                                     var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                                     if (!(req.files && req.files.image))
                                     {
                                        var  update_query1 = "UPDATE `partner_registration` SET `full_name`='"+full_name+"',`location`='"+location+"',`contact`='"+contact+"',`email`='"+email+"',`address`='"+address+"',`participant_percentage`='"+assets_amount+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                                        con.query(update_query1,function(err,rows_03)
                                            {
                                                console.log(update_query);
                                                if(err)
                                                {
                                                    throw err
                                                }else{
                                                    res.json({
                                                    status:'1',
                                                    //data:rows_03
                                                });
                                                }
                        
                                            }); 
                                     }else
                                     {
                                        var edit_id =  req.body.expense_id; 
                                        var full_name =  req.body.full_name;
                                        var location =  req.body.location;
                                        var contact =  req.body.contact; 
                                        var email =  req.body.email; 
                                        var address =  req.body.address; 
                                        var assets_amount =  req.body.assets_amount; 
                                        var address =  req.body.address; 
                                       
                                        var date = req.body.data_man;
                                        
                                        var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                                        var file = req.files.image;
                                        var  file_name = file.name;
                                        var  update_query = "UPDATE `partner_registration` SET `full_name`='"+full_name+"',`location`='"+location+"',`contact`='"+contact+"',`email`='"+email+"',`address`='"+address+"',`participant_percentage`='"+assets_amount+"',`document`='"+file_name+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                                        con.query(update_query,function(err,rows_02)
                                        {
                                            console.log(update_query);
                                            if(err)
                                            {
                                                throw err
                                            }else{
                                                res.json({
                                                status:'1',
                                                data:rows_02
                                            });
                                            }
                    
                                        }); 
                                    }
                             });

                             app.post('/update_hb_reg', function(req,res)
                             {
                                 var my_id =  req.query.param;
                                     
                                     var  query2 = "SELECT partner_taken_amount.id,partner_taken_amount.amount,partner_taken_amount.document,partner_taken_amount.date,partner_registration.id as parts_id,partner_registration.full_name,partner_registration.location,partner_registration.contact,partner_registration.email,partner_registration.address,partner_registration.participant_percentage FROM partner_taken_amount INNER JOIN partner_registration ON partner_taken_amount.partner_id = partner_registration.id where  partner_taken_amount.id = '"+my_id+"'";
                                     con.query(query2,function(err,rows_02)
                                     {
                                         console.log(query2);
                                         var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                 
                                         var strify = JSON.stringify(rows_02);
                                         var newStr = strify.substring(1, strify.length-1);
             
                                         res.json({
                                             data:sh,
                                             data1:newStr
                                         })
                 
                                     }); 
                             });

                             app.post('/update_hb_reg_02', function(req,res)
                             {
                                if (!(req.files && req.files.image))
                                {
                                      var edit_id =  req.body.expense_id; 
                                      var partner_id =  req.body.partner_id; 
                                      var taken_amounts =  req.body.taken_amounts;
                                      
                                     
                                      var date = req.body.data_man;
                                      
                                      var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                
                                            var  update_query = "UPDATE `partner_taken_amount` SET `partner_id`='"+partner_id+"',`amount`='"+taken_amounts+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'";
                                            con.query(update_query,function(err,rows_02)
                                            {
                                                
                                                if(err)
                                                {
                                                    throw err
                                                }
                                                else{
                                                    res.json("success");
                                                }
                                                }); 
                                         }else{
                                            var edit_id =  req.body.expense_id; 
                                            var partner_id =  req.body.partner_id; 
                                            var taken_amounts =  req.body.taken_amounts;
                                            var file = req.files.image;
                                            var  file_name = file.name;
                                            var date = req.body.data_man;
                                      
                                            var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                                            con.query("UPDATE `partner_taken_amount` SET `partner_id`='"+partner_id+"',`amount`='"+taken_amounts+"',`document`='"+file_name+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'",function(err,rows_04)
                                            {

                                                console.log("UPDATE `partner_taken_amount` SET `partner_id`='"+partner_id+"',`amount`='"+taken_amounts+"',`document`='"+file_name+"',`date`='"+m_date+"'  WHERE id = '"+edit_id+"'");

                                                file.mv("Images/"+file_name,function(err)
                                                {
                                                res.send("hello");
                                                });
                                            });
                                    }
                              });

                              app.post('/update_comapny_info', function(req,res)
                              {
                                  var my_id =  req.query.param;
                                      
                                      var  query2 = "select * from company_info where  id = '"+my_id+"'";
                                      con.query(query2,function(err,rows_02)
                                      {
                                          console.log(query2);
                                          var sh = moment(rows_02[0].starting_activity, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                  
                                          var strify = JSON.stringify(rows_02);
                                          var newStr = strify.substring(1, strify.length-1);
              
                                          res.json({
                                              data:sh,
                                              data1:newStr
                                          })
                  
                                      }); 
                              });

                              app.post('/update_com_info_02', function(req,res)
                              {
                                if (!(req.files && req.files.image))
                                {
                                       var edit_id =  req.body.expense_id; 
                                       var company_name =  req.body.company_name; 
                                       var description =  req.body.description;
                                       var location =  req.body.location;
                                       var contact =  req.body.contact;
                                       var email =  req.body.email;
                                       var website =  req.body.website;
                                       var date = req.body.data_man;
                                       
                                       var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                                       var currency = req.body.currency;
                                       var back_up = req.body.backup_add;
                                       console.log(back_up);
                 
                                       var  update_query = "UPDATE `company_info` SET `company_name`='"+company_name+"',`description`='"+description+"',`location`='"+location+"',`contact`='"+contact+"',`email`='"+email+"',`website`='"+website+"',`starting_activity`='"+m_date+ "',`backup_url`='"+mysql_real_escape_string(back_up)+"',`currency`='"+currency+"' WHERE id = '"+edit_id+"'";
                                        con.query(update_query,function(err,rows_02)
                                        {
                                           
                                            if(err)
                                            {
                                                throw err;
                                            }
                                            else{
                                                res.json('success');
                                            }
                                            
                                        }); 
                                            
                                            
                                         } else{

                                            
                                            var edit_id =  req.body.expense_id; 
                                            var company_name =  req.body.company_name; 
                                            var description =  req.body.description;
                                            var location =  req.body.location;
                                            var contact =  req.body.contact;
                                            var email =  req.body.email;
                                            var website =  req.body.website;
                                            var date = req.body.data_man;
                                            var file = req.files.image;
                                            var  file_name = file.name;
                                            var m_date = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                                    con.query("UPDATE `company_info` SET `company_name`='"+company_name+"',`description`='"+description+"',`location`='"+location+"',`contact`='"+contact+"',`email`='"+email+"',`website`='"+website+"',`logo`='"+file_name+"',`starting_activity`='"+m_date+ "' WHERE id = '"+edit_id+"'",function(err,rows_06) {
                                   
                                             file.mv("Images/"+file_name,function(err)
                                             {
                                                res.send("hello");
                                               });
                                           
                    
                                        }); 
                                    }
                                    
                               });

                               app.post('/update_froshat_view', function(req,res)
                              {
                                  var my_id =  req.query.param;
                                      
                                      var  query2 = "SELECT customer_account.company_name, froshat_details.*  from customer_account,froshat_details where customer_account.id=froshat_details.cus_id AND  froshat_details.id = '"+my_id+"'";
                                      con.query(query2,function(err,rows_02)
                                      {
                                         console.log(query2);
                                          var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                  
                                          var strify = JSON.stringify(rows_02);
                                          var newStr = strify.substring(1, strify.length-1);
              
                                          res.json({
                                              data:sh,
                                              data1:newStr
                                          })
                  
                                      }); 
                              });

                              app.post('/usrs_settings', function(req,res)
                              {
                                  var my_id =  req.query.param;
                                      
                                      var  query2 = "select * from users where  id = '"+my_id+"'";
                                      con.query(query2,function(err,rows_02)
                                      {
                                        /* var strify = JSON.stringify(rows_02);
                                        var newStr = strify.substring(1, strify.length-1); */
                                         
                                          res.send(rows_02);
                  
                                      }); 
                              });

                              app.post('/update_users_set', function(req,res)
                              {
                                  
                                       var edit_id =  req.body.update_id; 
                                       var name =  req.body.name;
                                       var last_name =  req.body.last_name;
                                       var username =  req.body.username;

                                       var password =  req.body.password; 

                                       var  update_query = "UPDATE `users` SET `username`='"+name+"',`full_name`='"+last_name+"',`password`='"+password+"' where id = '"+edit_id+"'";
                                        con.query(update_query,function(err,rows_02)
                                        {
                                           console.log(update_query);
                                            if(err)
                                            {
                                                throw err
                                            }else{
                                                 res.json({
                                                 status:'1',
                                                 data:rows_02
                                             });
                                            }
                    
                                        }); 
                               });

                    app.post('/update_half_users', function(req,res)
                        {
                            var my_id =  req.query.param;
            
                                var  query2 = "SELECT * from users WHERE id = '"+my_id+"'";
                                    con.query(query2,function(err,rows_02)
                                    {
                                    
        
                                       res.send(rows_02);
                
                                    }); 
                        });

            ////////////////////ending </update queries>//////////////////////

            /* starting <add payments> */

            app.post("/show_all_payment", function(req,res){
 
                var each_loaner = req.query.each_loaner_id;
                con.query("select * from incoming_loan_list where incoming_loan_id ='"+each_loaner+"'",function(err,rows_04){
                    var shamsi = [];
                    if(rows_04.length < 1){
                   
                        res.send("معذرت! پرداخت صورت نگرفته است. ");
    
                      }else{
                    for(var i =0;i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                    shamsi += sh + ",";
                    }
                    var str_array = shamsi.split(',');
                    if(err) 
                    {
                        throw err ;
                    }else{
                       
                            var table_data = "";
                            var no =0;
                            var no1 =1;
                            rows_04.forEach( (row) => {
                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                    table_data += "<td>"+ no1 + "</td>";
                                    table_data += "<td>"+ row.paid+ "</td>";
                                    table_data += "<td>"+ row.currency+ "</td>";
                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                    table_data += "</tr>";
                                    no++;
                                    no1++;
                                
                            });
                            res.send(table_data);
                       
                    }
                    }
                });
                      
            });

            app.post('/add_input_loan', function(req,res)
            {
                var incoming_loan_id =  req.query.incoming_loan_id; 
                var amount =  req.query.amount;
                var currency =  req.query.currency;
                var ex_rate =  req.query.ex_rate;
                var date =  req.query.date;

                var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                con.query("INSERT INTO `incoming_loan_list`(`incoming_loan_id`, `paid`, `currency`, `ex_rate`, `date`) VALUES ('"+incoming_loan_id+"','"+amount+"','"+currency+"','"+ex_rate+"','"+m+"')", function(err,rows_02)
                    {
                         if(err)
                               {
                                   throw err
                               }else{
                                    con.query("select * from incoming_loan_list where incoming_loan_id ='"+incoming_loan_id+"'",function(err1,rows_04)
                                    {
                                        var shamsi = [];
                                        for(var i =0;i<rows_04.length;i++)
                                        {
                                        var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                        shamsi += sh + ",";
                                        }
                                        var str_array = shamsi.split(',');
                                        if(err1)
                                        {
                                            throw err1;
                                        }else
                                        {
                                            var table_data = "";
                                            var no =0;
                                            var no1 =1;
                                            rows_04.forEach( (row) => {
                                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                                    table_data += "<td>"+ no1 + "</td>";
                                                    table_data += "<td>"+ row.paid+ "</td>";
                                                    table_data += "<td>"+ row.currency+ "</td>";
                                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                                    table_data += "</tr>";
                                                    no++;
                                                    no1++;
                                
                                            });
                                            res.send(table_data);
                                                    }
                                    });
                               }
                       // res.send(rows_02);

                    });



            });

            /* testing append */
            app.post('/searching_bill_no', function(req,res)
           {
              
               var from_date =  req.query.from_date; 
               var to_date =  req.query.to_date;
               
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                
               //console.log(my_id);

                   con.query("SELECT customer_account.company_name, froshat_details.* FROM customer_account INNER JOIN froshat_details ON customer_account.id=froshat_details.cus_id WHERE froshat_details.date BETWEEN '"+f_d+"' AND '"+t_d+"'", function(err,rows_02)
                   {
                       if(err) {
                           console.error("Error in query:", err);
                           return res.status(500).send("خطا در بارگذاری اطلاعات: " + err.message);
                       }
                       
                       // Check if rows_02 exists and is an array
                       if(!rows_02 || !Array.isArray(rows_02)) {
                           rows_02 = [];
                       }
                       
                    var table_data = "";
                    var no =1;
                    rows_02.forEach( (row) => {
                        
                            // past here 
                           
                              
                            table_data +=  '<tr>';
                            table_data +=  '<th colspan="11" style=" padding: 0px;">';
                                  
                            table_data +=   '<div class="card mb-2" style=" padding: 0px;">';
                                      
                                     
                            table_data +=      '<div class="card-header " style="padding: 0px;" id="headingOne">';
                            table_data +=    ' <table class=" mb-0 mt-0 ml-0 mr-0" style="width: 100%;">';
                            table_data +=        '<tr class="head">';
                            table_data +=        '<td>'+no+'</td>';
                            table_data +=       ' <td style="width:120px;" >'+row.company_name+'</td>';
                            table_data +=       '<td style="width:100px;">'+row.contact+'</td>';
                            table_data +=       '<td style="width:143px;">'+row.date+'</td>';
                            table_data +=       '<td>'+row.paid_amount+'</td>';
                            table_data +=       '<td>'+parseFloat(row.total_amount - row.paid_amount)+'</td>';
                            table_data +=       '<td>'+row.total_amount+'</td>';
                            table_data +=       '<td style="width:40px;">#'+row.bill_no+'</td>';
                            table_data +=       '<td>'+row.currency+'</td>';
                            table_data +=        '<td>'+row.ex_rate+'</td>';
                            table_data +=        '<td class="print">';
                            table_data +=         '<button data-toggle="tooltip" title="حذف" onclick="delete1( '+row.id+')" class="edt del"><img width="15px" src="assets/img/last-project/delete.svg" alt=""></button>'
                
                            table_data +=          '<button title="ویرایش" data-toggle="tooltip" onclick="update_froshat( '+row.id+' )"  class="edt edit-tbl" ><img width="15px" src="assets/img/last-project/edit.svg" alt=""></button>';
                
                            table_data +=           '<button data-toggle="tooltip" title="اضافه کردن" onclick="add_out_loan( '+row.id+')" class="edt add-tbl"><img width="15px" src="assets/img/last-project/add.svg  " alt=""></button>';
                            
                            table_data +=        '</td>';
                            table_data +=         '</tr>';
                            table_data +=      '</table>';
                            table_data +=    '<h2 class="mb-0">';
                            table_data +=            '<button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapseOne_'+row.id+' " style="float:left;"><img src="assets/img/expand_arrow_26px.png" onclick="change_icon(this.id)" id="'+row.id+'" alt=""></button>';									
                            table_data +=      '</h2>';
                            table_data +=  '</div>';
                                       
                                      
                            table_data +=     '<div id="collapseOne_'+row.id+'" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">';
                            table_data +=   ' <div class="card-body">';
                            table_data +=   '<table class="table table-bordered">';
                                              
                            table_data +=                              '<thead>';
                            table_data +=                         '<tr>';
                            table_data +=           '<th colspan="7">جزءیات بل فروش</th>';
                            table_data +=               ' </tr>';
                            table_data +=         '<tr style="background-color: lightgray; color: black;">';
                            table_data +=             '<th>شماره</th>';
                            table_data +=           '<th>نام جنس</th>';
                            table_data +=     '<th>نوعیت جنس</th>';
                            table_data +=                   '<th>مقدار</th>';
                            table_data +=                '<th>قیمت</th>';
                            table_data +=          '<th>مجموعه</th>';
                            table_data +=        '<th>عملیات</th>';
                            table_data +=            '</tr>';
                            table_data += '</thead>';
                            table_data +=     '<tbody id="bill_details_'+row.id+'">';
                            table_data +=  '</tbody>';
                            table_data +=  '</table>';

                            
                            table_data +=    '</th>';
                                
                            table_data +=' </tr>';
                            no++;
                      
                        
                    });
                    
                    res.send(table_data);
                });
           });
          //  table_data += "<td>"+ no1 + "</td>";
            
            

            app.post('/new_add_output_sales', function(req,res)
            {
                var forsh_id =  req.query.incoming_loan_id; 
                var amount =  req.query.amount;
                var currency =  req.query.currency;
                var ex_rate =  req.query.ex_rate;
                var date =  req.query.date;

                var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                con.query("INSERT INTO `sales_payments`(`sales_id`, `paid`, `currency`, `ex_rate`, `date`) VALUES ('"+forsh_id+"','"+amount+"','"+currency+"','"+ex_rate+"','"+m+"')", function(err,rows_02)
                    {
                        
                     con.query("select paid_amount from froshat_details where id = '"+forsh_id+"'",function(err,rows_03)
                     {
                          var fro_amount = rows_03[0].paid_amount;
                          var update_amount =   parseFloat(fro_amount )+ parseFloat(amount);
                          console.log(update_amount);
                       con.query("update froshat_details set paid_amount = '"+update_amount+"' where id='"+forsh_id+"' ",function(err,rows_06)
                       {
                         if(err)
                               {
                                   throw err
                               }else{///////////////////


                                    con.query("SELECT customer_account.company_name, froshat_details.* FROM customer_account INNER JOIN froshat_details ON customer_account.id=froshat_details.cus_id WHERE  froshat_details.id ='"+forsh_id+"'",function(err1,rows_004)
                                    {
                                       
                                       /* var payment_completed ;
                                        var pyed =  rows_004[0].paid_amount ;
                                       var totls =  rows_004[0].total_amount;
                                        if(pyed == totls)
                                        {
                                            payment_completed ="پرداخت شد ";
                                         }else if(pyed != totls){
                                            payment_completed ="نشد"; 
                                         }else{ */

                                    con.query("select * from sales_payments where sales_id ='"+forsh_id+"'",function(err1,rows_04)
                                    {
                                                var shamsi = [];
                                                for(var i =0;i<rows_04.length;i++)
                                                {
                                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                                shamsi += sh + ",";
                                                }
                                              var str_array = shamsi.split(',');
                                                            if(err1)
                                                            {
                                                                throw err1;
                                                            }else
                                                            {
                                                                var table_data = "";
                                                                var no =0;
                                                                var no1 =1;
                                                                    rows_04.forEach( (row) => {
                                                                        table_data += "<tr id="+"delete_row_"+row.id+">";
                                                                            table_data += "<td>"+ no1 + "</td>";
                                                                            table_data += "<td>"+ row.paid+ "</td>";
                                                                            table_data += "<td>"+ row.currency+ "</td>";
                                                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                                                            table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف </a>   </td>";
                                                                            table_data += "</tr>";
                                                                            no++;
                                                                            no1++;
                                                        
                                                                            });
                                                               // res.send(table_data);
                                                               res.json({
                                                                froshat:rows_004,
                                                                payments:table_data
                                                            })
                                                        
                                                            }
                                    });
                               // }//end of completed
                                    });
                               }
                       // res.send(rows_02);
                    });  
                    });

                });

            });

            app.post('/add_output_sales', function(req,res)
            {
                var forsh_id =  req.query.incoming_loan_id; 
                var amount =  req.query.amount;
                var currency =  req.query.currency;
                var ex_rate =  req.query.ex_rate;
                var date =  req.query.date;

                var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                con.query("INSERT INTO `sales_payments`(`sales_id`, `paid`, `currency`, `ex_rate`, `date`) VALUES ('"+forsh_id+"','"+amount+"','"+currency+"','"+ex_rate+"','"+m+"')", function(err,rows_02)
                    {
                        
                     con.query("select paid_amount from froshat_details where id = '"+forsh_id+"'",function(err,rows_03)
                     {
                          var fro_amount = rows_03[0].paid_amount;
                          var update_amount =   parseFloat(fro_amount )+ parseFloat(amount);
                          console.log(update_amount);
                       con.query("update froshat_details set paid_amount = '"+update_amount+"' where id='"+forsh_id+"' ",function(err,rows_06)
                       {
                         if(err)
                               {
                                   throw err
                               }else{
                                    con.query("select * from sales_payments where sales_id ='"+forsh_id+"'",function(err1,rows_04)
                                    {
                                        var shamsi = [];
                                        for(var i =0;i<rows_04.length;i++)
                                        {
                                        var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                        shamsi += sh + ",";
                                        }
                                        var str_array = shamsi.split(',');
                                        if(err1)
                                        {
                                            throw err1;
                                        }else
                                        {
                                            var table_data = "";
                                            var no =0;
                                            var no1 =1;
                                            rows_04.forEach( (row) => {
                                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                                    table_data += "<td>"+ no1 + "</td>";
                                                    table_data += "<td>"+ row.paid+ "</td>";
                                                    table_data += "<td>"+ row.currency+ "</td>";
                                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف </a>   </td>";
                                                    table_data += "</tr>";
                                                    no++;
                                                    no1++;
                                
                                            });
                                            res.send(table_data);
                                                    }
                                    });
                               }
                       // res.send(rows_02);
                    });  
                    });

                });

            });
            //outgoing
            app.post("/show_all_payment_001", function(req,res){
 
                var each_loaner = req.query.each_loaner_id;
                con.query("select * from outgoing_loan_list where outgoing_loan_id ='"+each_loaner+"'",function(err,rows_04){
                   
                    var shamsi = [];

                if(rows_04.length < 1){
                   
                    res.send("معذرت ! پرداخت صورت نگرفته است ");

                  }else{

                    for(var i =0;i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                    shamsi += sh + ",";
                    }
                    var str_array = shamsi.split(',');
                    if(err) 
                    {
                        throw err ;
                    }else{
                       
                            var table_data = "";
                            var no =0;
                            var no1 =1;
                            rows_04.forEach( (row) => {
                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                    table_data += "<td>"+ no1 + "</td>";
                                    table_data += "<td>"+ row.paid+ "</td>";
                                    table_data += "<td>"+ row.currency+ "</td>";
                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                    table_data += "</tr>";
                                    no++;
                                    no1++;
                                
                            });
                            res.send(table_data);
                       
                    }
                }
                });        
            });

            app.post('/add_output_loan', function(req,res)
            {
                var outgoing_loan_id =  req.query.incoming_loan_id; 
                var amount =  req.query.amount;
                var currency =  req.query.currency;
                var ex_rate =  req.query.ex_rate;
                var date =  req.query.date;

                var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                con.query("INSERT INTO `outgoing_loan_list`(`outgoing_loan_id`, `paid`, `currency`, `ex_rate`, `date`) VALUES ('"+outgoing_loan_id+"','"+amount+"','"+currency+"','"+ex_rate+"','"+m+"')", function(err,rows_02)
                    {
                         if(err)
                               {
                                   throw err
                               }else{
                                    con.query("select * from outgoing_loan_list where outgoing_loan_id ='"+outgoing_loan_id+"'",function(err1,rows_04)
                                    {
                                        var shamsi = [];
                                        for(var i =0;i<rows_04.length;i++)
                                        {
                                        var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                        shamsi += sh + ",";
                                        }
                                        var str_array = shamsi.split(',');
                                        if(err1)
                                        {
                                            throw err1;
                                        }else
                                        {
                                            var table_data = "";
                                            var no =0;
                                            var no1 =1;
                                            rows_04.forEach( (row) => {
                                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                                    table_data += "<td>"+ no1 + "</td>";
                                                    table_data += "<td>"+ row.paid+ "</td>";
                                                    table_data += "<td>"+ row.currency+ "</td>";
                                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                                    table_data += "</tr>";
                                                    no++;
                                                    no1++;
                                
                                            });
                                            res.send(table_data);
                                                    }
                                    });
                               }
                    });
            });

            //ougoing add
            app.post('/oloan_payment_edit_001', function(req,res)
            {
                var my_id =  req.query.param;

                     var  query2 = "SELECT * from outgoing_loan_list WHERE id = '"+my_id+"'";
                      con.query(query2,function(err,rows_02)
                      {
                          var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      
                              var strify = JSON.stringify(rows_02);
                              var newStr = strify.substring(1, strify.length-1);
  
                                res.json({
                                    data:sh,
                                    data1:newStr
                                })
                         // res.send(rows_02);
                      }); 
             });

             //outgoing
             app.post('/update_show_edit_001', function(req,res)
             {
                 var id_val =  req.query.id_val; 
                 var amount =  req.query.amount;
                 var currency =  req.query.currency;
                 var ex_rate =  req.query.ex_rate;
                 var date_man =  req.query.date_man;
                 var m = moment.from(date_man, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                 var loan_id =  req.query.loan_id;
                       con.query("UPDATE `outgoing_loan_list` SET `outgoing_loan_id`='"+loan_id+"',`paid`='"+amount+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m+"' WHERE id = '"+id_val+"'",function(err,rows_02)
                       {
                           
                           if(err)
                           {
                               throw err;
                           }else{
                             con.query("select * from outgoing_loan_list where outgoing_loan_id ='"+loan_id+"'",function(err1,rows_04)
                             {
                                 var shamsi = [];
                                 for(var i =0;i<rows_04.length;i++)
                                 {
                                 var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                 shamsi += sh + ",";
                                 }
                                 var str_array = shamsi.split(',');
                                 if(err1)
                                 {
                                     throw err1;
                                 }else
                                 {
                                     var table_data = "";
                                     var no =0;
                                     var no1 =1;
                                     rows_04.forEach( (row) => {
                                         table_data += "<tr id="+"delete_row_"+row.id+">";
                                             table_data += "<td>"+ no1 + "</td>";
                                             table_data += "<td>"+ row.paid+ "</td>";
                                             table_data += "<td>"+ row.currency+ "</td>";
                                             table_data += "<td>"+ row.ex_rate+ "</td>";
                                             table_data += "<td>"+ str_array[no]+ "</td>";
                                             table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                             table_data += "</tr>";
                                             no++;
                                             no1++;
                         
                                     });
                                     res.send(table_data);
                                             }
                             });
                              
                           }
                       }); 
              });

              /* add payments for sales details */
              app.post("/show_all_payment_002", function(req,res){
 
                var each_loaner = req.query.each_loaner_id;
                
                con.query("select * from sales_payments where sales_id ='"+each_loaner+"'",function(err,rows_04){
                   
                    var shamsi = [];

                if(rows_04.length < 1){
                   
                    res.send("معذرت! پرداخت صورت نگرفته است. ");

                  }else{

                    for(var i =0;i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                    shamsi += sh + ",";
                    }
                    var str_array = shamsi.split(',');
                    if(err) 
                    {
                        throw err ;
                    }else{
                       
                            var table_data = "";
                            var no =0;
                            var no1 =1;
                            rows_04.forEach( (row) => {
                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                    table_data += "<td>"+ no1 + "</td>";
                                    table_data += "<td>"+ row.paid+ "</td>";
                                    table_data += "<td>"+ row.currency+ "</td>";
                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'> حذف </a>   </td>";
                                    table_data += "</tr>";
                                    no++;
                                    no1++;
                                
                            });
                            res.send(table_data);
                       
                    }
                }
                });        
            });

            /* customer payments */
            app.post("/show_all_payment_003", function(req,res){
 
                var each_loaner = req.query.each_loaner_id;
                console.log(each_loaner);
                con.query("select * from sales_payments where sales_id ='"+each_loaner+"'",function(err,rows_04){
                   
                    var shamsi = [];

                if(rows_04.length < 1){
                   
                    res.send("معذرت! پرداخت صورت نگرفته است. ");

                  }else{

                    for(var i =0;i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                    shamsi += sh + ",";
                    }
                    var str_array = shamsi.split(',');
                    if(err) 
                    {
                        throw err ;
                    }else{
                       
                            var table_data = "";
                            var no =0;
                            var no1 =1;
                            rows_04.forEach( (row) => {
                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                    table_data += "<td>"+ no1 + "</td>";
                                    table_data += "<td>"+ row.paid+ "</td>";
                                    table_data += "<td>"+ row.currency+ "</td>";
                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                    table_data += "</tr>";
                                    no++;
                                    no1++;
                                
                            });
                            res.send(table_data);
                       
                    }
                }
                });        
            });

            app.post('/update_bills_01', function(req,res)
            {
    
                var bil_id =  req.query.bil_id; 
                var fro_id =  req.query.fro_id;
                var item_name =  req.query.item_name;
                var item_type =  req.query.item_type;
                var quantity =  req.query.quantity;
                var price =  req.query.price;
                var web_total = quantity * price;
                var update_qun ;
                var sta_update_quan;

// db = 3 , web =4

                       con.query("select * from stack_to_market_lists where item_name ='"+item_name+"' and item_type='"+item_type+"' ",function(err,rows_08)
                        {
                            var stk_qunt = rows_08[0].quantity;
                       // Query bill_items instead of bill_details
                       con.query("SELECT bill_items.*, bill_details.bill_id FROM bill_items INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id WHERE bill_items.id ='"+bil_id+"' ",function(err,rows_07)
                        {
                            if(err || !rows_07 || rows_07.length === 0) {
                                return res.status(500).send("آیتم مورد نظر یافت نشد!");
                            }
                            
                            var db_quantity = rows_07[0].quantity;

                            if( db_quantity == quantity)
                            {
                                update_qun = 0;
                                var sta_update_quan = stk_qunt +update_qun ;
                            }
                            if(db_quantity > quantity)//this case is ok
                            {
                                update_qun = db_quantity - quantity;
                                var sta_update_quan = stk_qunt + update_qun ;
                            }
                            if(db_quantity < quantity)
                            {
                                update_qun =   quantity - db_quantity;
                                var sta_update_quan = stk_qunt -update_qun ;
                            }

                            /* update_qun =  quantity - db_quantity;//stack_to_market_lists,stack_bill_detail,bill_details
                            var sta_update_quan = stk_qunt +update_qun;*/

                        con.query("update stack_to_market_lists set quantity = '"+sta_update_quan+"' where item_name ='"+item_name+"' and item_type='"+item_type+"' ",function(err,rows_02)
                        {

                // Update bill_items instead of bill_details
                con.query("UPDATE `bill_items` SET `quantity`='"+quantity+"',`price`='"+price+"' where id = '"+bil_id+"' ", function(err,rows_02)
                    {
                        if(err) {
                            return res.status(500).send("خطا در بروزرسانی آیتم: " + err.message);
                        }
                        

                        

                        // Calculate total from bill_items
                        con.query("SELECT SUM(bill_items.price * bill_items.quantity) as fro_total FROM bill_items INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id WHERE bill_details.bill_id ='"+fro_id+"'",function(err1,rows_04)
                        {
                            if(err1) {
                                return res.status(500).send("خطا در محاسبه مجموع: " + err1.message);
                            }
                            
                            var fro_total = rows_04[0].fro_total || 0;
                            
                            con.query("update froshat_details set total_amount = '"+fro_total+"' where id ='"+fro_id+"'",function(err1,rows_03)
                            {
                                if(err1) {
                                    return res.status(500).send("خطا در بروزرسانی مجموع: " + err1.message);
                                }
                                 res.send("hello success");
                            });
                        });
                            
                     });
                    });
                });
            });
            });

            app.post('/update_stack_bills_01', function(req,res)
            {
    
                var bil_id =  req.query.bil_id; 
                var fro_id =  req.query.fro_id;
                var item_name =  req.query.item_name;
                var item_type =  req.query.item_type;
                var quantity =  req.query.quantity;
               
                var update_qun ;
                var sta_update_quan;
                var sta_update_quan_01;

                       //hogo//stack_factory_registration_list,stack_to_market_lists,stack_bill_detail
                       con.query("select * from stack_factory_registration_list where item_name ='"+item_name+"' and item_type='"+item_type+"' ",function(err,rows_08)
                        {
                            var stk_qunt = rows_08[0].quantity;
                       con.query("select * from stack_bill_detail where id ='"+bil_id+"' ",function(err,rows_07)
                        {
                            var db_quantity = rows_07[0].quantity;

                            con.query("select * from stack_to_market_lists where item_name ='"+item_name+"' and item_type='"+item_type+"' ",function(err,rows_09)
                            {
                                var stk_qunt_list = rows_09[0].quantity;

                            if(db_quantity == quantity)
                            {
                                update_qun = 0;
                                update_qun_01 = 0;
                                var sta_update_quan = stk_qunt + update_qun;
                                var sta_update_quan_01 = stk_qunt_list + update_qun_01;
                            }
                            if(db_quantity > quantity  )//this case is ok,stk_qunt_list =2 , web =3
                            {
                                update_qun = db_quantity - quantity;
                                var sta_update_quan = stk_qunt + update_qun;

                               // update_qun_01 = stk_qunt_list - quantity;
                                var sta_update_quan_01 = stk_qunt_list - update_qun;
                                

                            }
                            if(db_quantity < quantity)
                            {
                                update_qun =   quantity - db_quantity;
                                var sta_update_quan = stk_qunt - update_qun ;

                               // update_qun_01 = quantity -stk_qunt_list ;
                                var sta_update_quan_01 = stk_qunt_list + update_qun;
                                

                            }

                            /* update_qun =  quantity - db_quantity;//stack_to_market_lists,stack_bill_detail,bill_details
                            var sta_update_quan = stk_qunt +update_qun;*/

                        con.query("update stack_factory_registration_list set quantity = '"+sta_update_quan+"' where item_name ='"+item_name+"' and item_type='"+item_type+"' ",function(err,rows_02)
                        {

                con.query("UPDATE `stack_bill_detail` SET `quantity`='"+quantity+"' where id = '"+bil_id+"' ", function(err,rows_02)
                    {
                        
                        con.query("update  stack_to_market_lists set quantity ='"+sta_update_quan_01+"'  where item_name ='"+item_name+"' and item_type='"+item_type+"' ",function(err,rows_010)
                        {
                        

                              /* con.query("SELECT SUM(price * quantity) as fro_total FROM bill_details WHERE bill_id ='"+fro_id+"'",function(err1,rows_04)
                        {
                                    var fro_total = rows_04[0].fro_total;
                                    
                                    con.query("update froshat_details set total_amount = '"+fro_total+"' where id ='"+fro_id+"'",function(err1,rows_03)
                                    {
                                    
                                    });
                                }); */
                                
                                res.send("hello success");
                     });
                     });
                     });
                    });
                });
            });
            });


            app.post('/update_formula_01', function(req,res)
            {
    
                var creat_mah_id =  req.query.bil_id; 
               
                var item_name =  req.query.item_name;
                var item_type =  req.query.item_type;
                var quantity =  req.query.quantity;
               


                con.query("UPDATE `create_mahsol` SET `quantity`='"+quantity+"',item_name='"+item_name+"' , item_type='"+item_type+"' where id = '"+creat_mah_id+"' ", function(err,rows_02)
                    {
                        
           
                                
                                res.send("موفقانه ذخیره شد");
                    
            });
            });

            app.post('/sales_payment_edit_001', function(req,res)
            {
                var my_id =  req.query.param;

                     var  query2 = "SELECT * from sales_payments WHERE id = '"+my_id+"'";
                      con.query(query2,function(err,rows_02)
                      {
                          var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      
                              var strify = JSON.stringify(rows_02);
                              var newStr = strify.substring(1, strify.length-1);
  
                                res.json({
                                    data:sh,
                                    data1:newStr
                                })
                         // res.send(rows_02);
                      }); 
             });

            // Moved to routes/billRoutes.js
            /* app.post('/update_bill_details', function(req,res)
            {
                var my_id =  req.query.param;

                     // Query bill_items joined with bill_details to get bill_id
                     var  query2 = "SELECT bill_items.*, bill_details.bill_id FROM bill_items INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id WHERE bill_items.id = '"+my_id+"'";
                      con.query(query2,function(err,rows_02)
                      {
                          if(err) {
                              return res.status(500).send("خطا در بارگذاری آیتم: " + err.message);
                          }
                          
                          if(!rows_02 || rows_02.length === 0) {
                              return res.status(404).send("آیتم مورد نظر یافت نشد!");
                          }
                          
                         res.send(rows_02);
                      }); 
             }); */

             app.post('/update_formula', function(req,res)
             {
                 var my_id =  req.query.param;
 
                      var  query2 = "SELECT * from create_mahsol WHERE id = '"+my_id+"'";
                       con.query(query2,function(err,rows_02)
                       {    
                          res.send(rows_02);
                       }); 
              });

             app.post('/update_stack_bill_details', function(req,res)
            {
                var my_id =  req.query.param;

                     var  query2 = "SELECT * from stack_bill_detail WHERE id = '"+my_id+"'";
                      con.query(query2,function(err,rows_02)
                      {    
                         res.send(rows_02);
                      }); 
             });

             app.post('/update_show_edit_002', function(req,res)
             {
                 var id_val =  req.query.id_val; 
                 var amount =  req.query.amount;
                 var currency =  req.query.currency;
                 var ex_rate =  req.query.ex_rate;
                 var date_man =  req.query.date_man;
                 var m = moment.from(date_man, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                 var loan_id =  req.query.loan_id;
                       con.query("UPDATE `sales_payments` SET `sales_id`='"+loan_id+"',`paid`='"+amount+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m+"' WHERE id = '"+id_val+"'",function(err,rows_02)
                       {

                        con.query("select paid from sales_payments where id = '"+id_val+"'",function(err,rows_03)
                        {
                            
                        con.query("select paid_amount from froshat_details where id = '"+loan_id+"'",function(err,rows_05)
                        {
                           
                             var payment_amount = rows_03[0].paid;
                             console.log(payment_amount);
                             
                             var fro_paid  = rows_05[0].paid_amount;
                             var update_amount =   parseFloat(payment_amount )+ parseFloat(fro_paid);
                             
                          con.query("update froshat_details set paid_amount = '"+update_amount+"' where id='"+loan_id+"' ",function(err,rows_06)
                          {


                           
                           if(err)
                           {
                               throw err;
                           }else{
                             con.query("select * from sales_payments where sales_id ='"+loan_id+"'",function(err1,rows_04)
                             {
                                 var shamsi = [];
                                 for(var i =0;i<rows_04.length;i++)
                                 {
                                 var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                 shamsi += sh + ",";
                                 }
                                 var str_array = shamsi.split(',');
                                 if(err1)
                                 {
                                     throw err1;
                                 }else
                                 {
                                     var table_data = "";
                                     var no =0;
                                     var no1 =1;
                                     rows_04.forEach( (row) => {
                                         table_data += "<tr id="+"delete_row_"+row.id+">";
                                             table_data += "<td>"+ no1 + "</td>";
                                             table_data += "<td>"+ row.paid+ "</td>";
                                             table_data += "<td>"+ row.currency+ "</td>";
                                             table_data += "<td>"+ row.ex_rate+ "</td>";
                                             table_data += "<td>"+ str_array[no]+ "</td>";
                                             table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                             table_data += "</tr>";
                                             no++;
                                             no1++;
                         
                                     });
                                     res.send(table_data);
                                             }
                             });
                              
                           }
                       }); 
                       }); 
                       }); 
                       }); 
              });

              app.post('/add_payment_delete_002', function(req,res)
              {
                  var my_id =  req.query.param;
                  var forsh_id =  req.query.loan_id;
                  

                  con.query("select paid_amount from froshat_details where id = '"+forsh_id+"'",function(err,rows_03)
                  {
                  con.query("select paid from sales_payments where id = '"+my_id+"'",function(err,rows_04)
                  {


                       var fro_amount = rows_03[0].paid_amount;
                       var payment_paid = rows_04[0].paid;
                       var update_amount =   parseFloat(fro_amount - payment_paid);
                       console.log(update_amount);
                    con.query("update froshat_details set paid_amount = '"+update_amount+"' where id='"+forsh_id+"' ",function(err,rows_06)
                    {
  
                      con.query("delete from sales_payments WHERE id = '"+my_id+"'", function(err,rows_02)
                      {
                          if(err)
                                      {
                                          throw err;
                                      }else{

                                  res.send("helllo");
                              }
                       });
                     });
                 });
              });
              });

              app.post('/add_payment_delete_004', function(req,res)
              {
                  var bill_id =  req.query.bill_detail_id;//hogo1

                 // var fro_id =  req.query.bill_detail_id;

                  // First get the bill_item details, then get bill_detail to find bill_id
                  con.query("SELECT bill_items.*, bill_details.bill_id FROM bill_items INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id WHERE bill_items.id = '"+bill_id+"'",function(err4,rows_01)
                  {
                      if(err4 || !rows_01 || rows_01.length === 0) {
                          return res.status(500).send("آیتم مورد نظر یافت نشد!");
                      }
                      
                      var item_name = rows_01[0].item_name;
                      var item_type = rows_01[0].item_type;
                      var bill_qunatity = rows_01[0].quantity;
                      var bill_detail_id = rows_01[0].bill_detail_id;
                      var fro_id = rows_01[0].bill_id;

                  con.query("select * from stack_to_market where item_name = '"+item_name+"' and item_type='"+item_type+"'",function(err4,rows_08)
                  {
                      if(err4 || !rows_08 || rows_08.length === 0) {
                          return res.status(500).send("جنس در موجودی یافت نشد!");
                      }
                      
                   var stak_qun = rows_08[0].quantity;
                   var update_stck_quna = parseFloat(stak_qun )+parseFloat(bill_qunatity);

                   con.query("update stack_to_market set quantity='"+update_stck_quna+"' where item_name = '"+item_name+"' and item_type='"+item_type+"'",function(err4,rows_09)
                   {
                       console.log("update stack_to_market set quantity='"+update_stck_quna+"' where item_name = '"+item_name+"' and item_type='"+item_type+"'");

                  //var loan_id =  req.query.loan_id;
  
                      // Delete from bill_items
                      con.query("delete from bill_items WHERE id = '"+bill_id+"'", function(err,rows_02)
                      {
                          if(err) {
                              return res.status(500).send("خطا در حذف آیتم: " + err.message);
                          }
                          
                          console.log("delete from bill_items WHERE id = '"+bill_id+"'");
                          
                          // Check if bill_detail has any remaining items, if not, delete it too
                          con.query("SELECT COUNT(*) as item_count FROM bill_items WHERE bill_detail_id = '"+bill_detail_id+"'", function(err_check, rows_check) {
                              if(!err_check && rows_check && rows_check[0].item_count == 0) {
                                  // No more items, delete the bill_detail
                                  con.query("delete from bill_details WHERE id = '"+bill_detail_id+"'", function(err_del, rows_del) {
                                      console.log("Deleted empty bill_detail: " + bill_detail_id);
                                  });
                              }
                          });
                          
                        // Calculate total from bill_items
                        con.query("SELECT SUM(bill_items.price * bill_items.quantity) as fro_total FROM bill_items INNER JOIN bill_details ON bill_items.bill_detail_id = bill_details.id WHERE bill_details.bill_id ='"+fro_id+"'",function(err1,rows_03){
                                  if(err1) {
                                      return res.status(500).send("خطا در محاسبه مجموع: " + err1.message);
                                  }
                                  
                                  var fro_total = rows_03[0].fro_total || 0;
                            con.query("update froshat_details set total_amount = '"+fro_total+"' where id ='"+fro_id+"'",function(err2,rows_04)
                            {
                                if(err2)
                                {
                                    return res.status(500).send("خطا در بروزرسانی مجموع: " + err2.message);
                                }
                                else{
                                    res.send("hello");
                                }
                                });

                                });
                      });

                    });
                    });
                    });
              });

              app.post('/delete_mahsol_formula', function(req,res)
              {
                  var bill_id =  req.query.bill_detail_id;
                  con.query("delete from create_mahsol where id = '"+bill_id+"'",function(err,rows)
                  {
                   res.send("موفقانه حذف شد");
                  });

            });

              /* delete stack_bill */
              app.post('/delete_stack_bill', function(req,res)
              {
                  var bill_id =  req.query.bill_detail_id;

                 // stack_factory_registration_list,stack_to_market_lists,stack_bill_detail

                  con.query("select * from stack_bill_detail where id = '"+bill_id+"'",function(err4,rows_01)
                  {
                      var item_name = rows_01[0].item_name;
                      var item_type = rows_01[0].category;
                      var bill_qunatity = rows_01[0].quantity;

                  con.query("select * from stack_to_market_lists where item_name = '"+item_name+"' and item_type='"+item_type+"'",function(err4,rows_08)
                  {
                   var stak_qun = rows_08[0].quantity;
                   var update_stck_quna = parseFloat(stak_qun )-parseFloat(bill_qunatity);
                   //var update_stck_quna = parseFloat(stak_qun )+parseFloat(bill_qunatity);

                   con.query("update stack_to_market_lists set quantity='"+update_stck_quna+"' where item_name = '"+item_name+"' and item_type='"+item_type+"'",function(err4,rows_09)
                   {

                    con.query("select * from stack_factory_registration_list where item_name = '"+item_name+"' and item_type='"+item_type+"'",function(err4,rows_08)
                  {
                                            var stak_fac_qun = rows_08[0].quantity;
                                            var update_stck_fac_quna = parseFloat(stak_fac_qun )+ parseFloat(bill_qunatity);

                                          con.query("update stack_factory_registration_list set quantity='"+update_stck_fac_quna+"' where item_name = '"+item_name+"' and item_type='"+item_type+"'",function(err2,rows_04)
                                             {

                                                                            // var fro_id = rows_01[0].bill_id;
                                                                            //var loan_id =  req.query.loan_id;
  
                                                         con.query("delete from stack_bill_detail WHERE id = '"+bill_id+"'", function(err,rows_02)
                                                          {
                                                        
                        


                                                                                        if(err2)
                                                                                        {
                                                                                            throw err2;
                                                                                        }
                                                                                        else{

                                                                                            res.send("hello");
                                                                                        }
                                                             });

                                               });
                    
                                       });
                                    });
                          });
                      });
              });
              /* delete stack_bill */
              /* add payments for sales details */

            app.post('/update_show_edit1', function(req,res)
            {
                var id_val =  req.query.id_val; 
                var amount =  req.query.amount;
                var currency =  req.query.currency;
                var ex_rate =  req.query.ex_rate;
                var date_man =  req.query.date_man;
                var m = moment.from(date_man, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var loan_id =  req.query.loan_id;
                      con.query("UPDATE `incoming_loan_list` SET `incoming_loan_id`='"+loan_id+"',`paid`='"+amount+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m+"' WHERE id = '"+id_val+"'",function(err,rows_02)
                      {
                          console.log("UPDATE `incoming_loan_list` SET `incoming_loan_id`='"+loan_id+"',`paid`='"+amount+"',`currency`='"+currency+"',`ex_rate`='"+ex_rate+"',`date`='"+m+"' WHERE id = '"+id_val+"'");
                          if(err)
                          {
                              throw err;
                          }else{
                            con.query("select * from incoming_loan_list where incoming_loan_id ='"+loan_id+"'",function(err1,rows_04)
                            {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                                if(err1)
                                {
                                    throw err1;
                                }else
                                {
                                    var table_data = "";
                                    var no =0;
                                    var no1 =1;
                                    rows_04.forEach( (row) => {
                                        table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ no1 + "</td>";
                                            table_data += "<td>"+ row.paid+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a href='#' style='color:green;' onclick="+"payment_edit("+row.id+")"+">ویرایش</a></td>";
                                            table_data += "</tr>";
                                            no++;
                                            no1++;
                        
                                    });
                                    res.send(table_data);
                                            }
                            });
                             
                          }
                      }); 
             });


             /* mahsole display */
             app.post('/update_show_edit3', function(req,res)
            {
                var id_val =  req.query.id_val; 
                
                
                
                            con.query("select * from raw_material_each_mahsol where stack_factory_id ='"+id_val+"'",function(err1,rows_08)
                            {
                                
                                if(err1)
                                {
                                    throw err1;
                                }else
                                {
                                   /*  var name_mahsol = rows_04[0].item_name;
                                var type_mahsol = rows_04[0].item_type;
                                var qunatity_mahsol = rows_04[0].quantity; */
                                /* con.query("select * from ready_materials_type where name='"+name_mahsol+"' and type='"+type_mahsol+"'",function(err,rows_05)
                                { */

                               /*  var creat_mahso_id = rows_05[0].id;
                                con.query("select * from create_mahsol where ready_material_type_id='"+creat_mahso_id+"'",function(err,rows_08)
                                { */

                                    var table_data = "";
                                    var no1 =1;
                                    rows_08.forEach( (row) => {
                                        table_data += "<tr>";
                                            table_data += "<td>"+ no1 + "</td>";
                                            table_data += "<td>"+ row.item_name+ "</td>";
                                            table_data += "<td>"+ row.item_type+ "</td>";
                                            table_data += "<td>"+row.quantity + "</td>";
                                            /* table_data += "<td>"+ row.price + "</td>"; */
                                            
                                            table_data += "</tr>";
                                            
                                            no1++;
                        
                                    });
                                    res.send(table_data);
                             /*    });
                            }); */
                                }          
                            });
                             
                        
                     
             });
             /* mahsole display */
            app.post('/iloan_payment_edit1', function(req,res)
              {
                  var my_id =  req.query.param;
  
                       var  query2 = "SELECT * from incoming_loan_list WHERE id = '"+my_id+"'";
                        con.query(query2,function(err,rows_02)
                        {
                            var sh = moment(rows_02[0].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
        
                                var strify = JSON.stringify(rows_02);
                                var newStr = strify.substring(1, strify.length-1);
    
                                  res.json({
                                      data:sh,
                                      data1:newStr
                                  })
                           // res.send(rows_02);
                        }); 
               });
            /* ending </add payment> */
           app.post('/forsh_items', function(req,res)
                    {
                        var my_id =  req.query.param;
                                con.query("select * from stack_to_market_lists where sell_price = '"+my_id+"'", function(err,rows_02)
                                {
                                     console.log("select * from stack_to_market_lists where sell_price = '"+my_id+"'");
                                    res.send(rows_02);

                                });
                            
                    });

                    app.post('/stock_to_market_bill', function(req,res)
                    {
                        var my_id =  req.query.param;
                        console.log(my_id);
                    con.query("SELECT id,item_name, item_type ,quantity,serial_number  FROM stack_factory_registration_list where serial_number = '"+my_id+"' ", function(err,rows_02)
                                {

                        console.log("SELECT id,item_name, item_type ,quantity,serial_number  FROM stack_factory_registration_list where serial_number = '"+my_id+"'");
                                    res.send(rows_02);

                                });
                            
                    });


                    /* when we create formulea */
           app.post('/mahsol_items', function(req,res)
            { 
                /* here create view and make it group by item name and type  */
                var my_id =  req.query.param;
                        con.query("select * from stack_raw_materials where bill_no = '"+my_id+"' GROUP by bill_no ", function(err,rows_02)
                        {
                            
                            res.send(rows_02);
                        });
                    

            });

           app.post('/get_stuff', function(req,res)
           {
               var my_id =  req.query.param;
 
                     con.query("SELECT * FROM stuff_registration where id = '"+my_id+"'", function(err,rows_02)
                     {
                       console.log("SELECT * FROM stuff_registration where id = '"+my_id+"'");
                         res.send(rows_02);
 
                     });
            });

            app.post('/get_stuff_loan', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("SELECT * FROM stuff_registration where id = '"+my_id+"'", function(err,rows_02)
                      {
                        console.log("SELECT * FROM stuff_registration where id = '"+my_id+"'");
                          res.send(rows_02);
  
                      });
             });

             app.post('/partner_details', function(req,res)
            {
                var my_id =  req.query.param;
  
                      con.query("SELECT * FROM partner_registration where id = '"+my_id+"'", function(err,rows_02)
                      {
                        console.log("SELECT * FROM partner_registration where id = '"+my_id+"'");
                          res.send(rows_02);
  
                      });
                  
  
             });
           app.post('/stuff_taken_amount', function(req,res)
          {
            var stf_id = req.body.item_name;
            var amount = req.body.removl_aoumnt;
            
            var ex_rate = req.body.to_dollar;
           /*  var ex_rate = req.body.to_dollar; */
            var currency = req.body.currency;
            var date = req.body.data_man;
            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO taken_amount(`stuff_id`, `amount`,`currency`,`ex_rate`,`date`) VALUES ('"+stf_id+"','"+ amount +"','"+ currency+"','"+ex_rate+"','"+m+"')",function(err,rows){

              console.log("INSERT INTO taken_amount(`stuff_id`, `amount`,`currency`,`ex_rate`,`date`) VALUES ('"+stf_id+"','"+ amount +"','"+ currency+"','"+ex_rate+"','"+m+"')");

                if(err) 
                {
                    throw err ;
                }else{
                    res.json({
                        status:'1',
                        data:rows
                    });
                }
            });
          });

          app.post('/employ_salary_pay', function(req,res)
          {
            var stf_id = req.body.item_name;
           // var taken_amount =  req.body.removal;
           
            var tax = req.body.tax;
            var overtime = req.body.extra;
            var payable =  req.body.payable;
            var ex_rate =  req.body.to_dollar;
            var currency = req.body.currency;
            var date = req.body.date_man;

            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

               con.query("select * from payable_amount where stuff_id = '"+stf_id+"' and date='"+m+"'",function(err,rows_01)
               {
                   
                   if(rows_01.length > 0 )
                   {
                        if(rows_01[0].payable =="رسید") 
                        {
                            res.send("قبلا پرداخت شده است !");
                        }else{
                           
                                
                            }
                   }else{
                       
                                con.query("INSERT INTO payable_amount(`stuff_id`,`taken_amount`,`tax`,`overtime`,`payable`,`currency`,`ex_rate`,`date`) VALUES ('"+stf_id+"','"+ payable +"','"+ tax +"','"+ overtime +"','رسید','"+currency+"','"+ex_rate+"','"+m+"')",function(err,rows){

                                    if(err) 
                                    {
                                        throw err ;
                                    }else{
                                        con.query("update taken_amount set `amount`='0' where stuff_id = '"+stf_id+"'",function(err,rows1){
                                        console.log("update taken_amount set `amount`='0' where stuff_id = '"+stf_id+"'");
                                        res.send("ثبت شد");
                                    });
                                }
                                });
                         }
                  /* if(rows_01[0].payable =="رسید")
                  {
                    res.send("قبلا پرداخت شده است !");
                  }else{ */
                        
                      /*  } */
                });

          });

          app.post('/incoming_loan', function(req,res)
          {
            var borrower = req.body.giranda;
            var lender = req.body.dahanda;
            var amount = req.body.amount;
            
            var installment_no =  req.body.tedad;
            var lender_contact =  req.body.phone;
            var address =  req.body.address;

            var currency = req.body.currency;
            var ex_rate =  req.body.to_dollar;
            
            var benefit =  req.body.mafad;
            
            var date = req.body.date_man;

            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO incoming_loan(`borrower`,`lender`,`amount`,`installment_no`,`lender_contact`,`address`,`currency`,`ex_rate`,`benefit`,`date`) VALUES ('"+borrower+"','"+ lender +"','"+ amount +"','"+ installment_no +"','"+ lender_contact +"','"+ address +"','"+currency+"','"+ex_rate+"','"+benefit+"','"+m+"')",function(err,rows){
               console.log("INSERT INTO incoming_loan(`borrower`,`lender`,`amount`,`installment_no`,`lender_contact`,`address`,`currency`,`ex_rate`,`benefit`,`date`) VALUES ('"+borrower+"','"+ lender +"','"+ amount +"','"+ installment_no +"','"+ lender_contact +"','"+ address +"','"+currency+"','"+ex_rate+"','"+benefit+"','"+m+"')");

                        if(err) 
                        {
                            throw err ;
                        }else{
                            res.json({
                                status:'1',
                                data:rows
                            });
                        }
                  });
          });

          app.post('/outgoing_loan', function(req,res)
          {
            var stf_id = req.body.item_name;
            var co_name = req.body.co_name;
            var amount = req.body.amount;
            var installment_no = req.body.tedad;
            
            var tazkira =  req.body.tazkira_no;
            var date = req.body.date_man;
            var currency = req.body.currency;
            var ex_rate =  req.body.to_dollar;

            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO outgoing_loan(`stuff_id`,`company_name`,`amount`,`installment_no`,`currency`,`ex_rate`,`tazkira`,`date`) VALUES ('"+stf_id+"','"+co_name+"','"+ amount +"','"+ installment_no +"','"+currency+"','"+ex_rate+"','"+ tazkira +"','"+m+"')",function(err,rows){

              console.log("INSERT INTO outgoing_loan(`stuff_id`,`company_name`,`amount`,`installment_no`,`currency`,`ex_rate`,`tazkira`,`date`) VALUES ('"+stf_id+"','"+co_name+"','"+ amount +"','"+ installment_no +"','"+currency+"','"+ex_rate+"','"+ tazkira +"','"+m+"')");

                        if(err) 
                        {
                            throw err ;
                        }else{
                            res.json({
                                status:'1',
                                data:rows
                            });
                        }
                  });
          });

          app.post('/add_machinary', function(req,res)
          {
            var machin_life1 = req.body.life;
            var machin_life = machin_life1 * 360;


            
            var name = req.body.name;
            var co_name = req.body.co_name;
            var detail = req.body.detail;
            var quantity =  req.body.tedad;
            var price = req.body.buy_price;
            var currency = req.body.currency;
            var ex_rate =  req.body.to_dollar;
            var date =  req.body.date_man;

            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO item_registration(`name`,`company_name`,`description`,`quantity`,`purchase_price`,`machine_life`,`currency`,`ex_rate`,`date`) VALUES ('"+name+"','"+co_name+"','"+ detail +"','"+ quantity +"','"+price+"','"+machin_life+"','"+ currency +"','"+ex_rate+"','"+m+"')",function(err,rows){
              
              var item_reg_id = rows.insertId;
                        if(err) 
                        {
                            throw err ;
                        }else{
                            res.json({
                                status:'1',
                                data:rows
                            });
                           
                           
                            
                        }
                  });
          });
          
          app.post('/add_tools', function(req,res)
          {
            var name = req.body.name;
            var co_name = req.body.co_name;
            var detail = req.body.detail;
            var quantity =  req.body.tedad;
            var price = req.body.buy_price;
            var currency = req.body.currency;
            var ex_rate =  req.body.to_dollar;
            var date =  req.body.date_man;

            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO item_registration(`name`,`company_name`,`description`,`quantity`,`purchase_price`,`currency`,`ex_rate`,`date`) VALUES ('"+name+"','"+co_name+"','"+ detail +"','"+ quantity +"','"+price+"','"+ currency +"','"+ex_rate+"','"+m+"')",function(err,rows){

                        if(err) 
                        {
                            throw err ;
                        }else{
                            res.json({
                                status:'1',
                                data:rows
                            });
                            
                        }
                  });
          });

          app.post('/add_customer', function(req,res)
          {
            var name = req.body.name;
            var last_name = req.body.last_name;
            var contact = req.body.phone;
            
            var email =  req.body.email;
            var com_name = req.body.co_name;
            var address = req.body.address;
            //var ex_rate =  req.body.to_dollar;
            var date =  req.body.date_man;
            console.log(date);
            /* if(date <0)
            {
              date = 1400/01/10;
            } */

            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO customer_account(`name`,`last_name`,`company_name`,`contact`,`address`,`email`,`date`) VALUES ('"+name+"','"+last_name+"','"+com_name  +"','"+contact+"','"+ address +"','"+ email +"','"+m+"')",function(err,rows){

              console.log("INSERT INTO customer_account(`name`,`last_name`,`company_name`,`contact`,`address`,`email`,`date`) VALUES ('"+name+"','"+last_name+"','"+com_name  +"','"+contact+"','"+ address +"','"+ email +"','"+m+"')");

                        if(err) 
                        {
                            throw err ;
                        }else{
                            res.json({
                                status:'1',
                                data:rows
                            });
                        }
                  });
          });

          //"SELECT *,(SELECT SUM(amount)AS total FROM taken_amount WHERE stuff_id=stuff_registration.id) AS totalcount FROM stuff_registration"
           app.get("/emp_removal_reg.ejs", function(req,res){

            con.query("select round(sum(amount/ex_rate),3) as total_taken from taken_amount", function(err,rows_01)
            {
               var sqlquery ="SELECT taken_amount.id as tken_id,taken_amount.amount,taken_amount.currency,taken_amount.ex_rate,taken_amount.date as tkn_date , stuff_registration.* from taken_amount INNER JOIN stuff_registration ON taken_amount.stuff_id = stuff_registration.id";

            con.query(sqlquery,function(err,rows_04)
            {
                if(rows_04.length>0)
                {
                    var arr = [];
                    for(var i =0 ; i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].tkn_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                        arr += sh +",";
                    }
                    var str_array = arr.split(',');
                    res.render("emp_removal_reg",{data_04:rows_04,data_date:str_array,all_taken_amounts:rows_01[0].total_taken}); 
                }else{
                    res.send("<h1 style='color:green; text-align:center;'>کارمند موجود نیست !</h1>");
                }
       
           });
           });
           });

           app.get("/emp_salary_pay.ejs", function(req,res){

                con.query("select * from stuff_registration",function(err,rows_04)
                {
                // res.render("emp_salary_pay",{data_04:rows_04}); 
                var today = new Date();
                var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
                console.log(lastDayOfMonth);
                res.render("emp_salary_pay",{data_04:rows_04}); 
        
                });
           });

           app.get("/emp_SP_reg.ejs", function(req,res){

            con.query("select round(sum(taken_amount/ex_rate),3) as total_paid from payable_amount", function(err,rows_01)
            {
          
            con.query("SELECT stuff_registration.id,stuff_registration.name,stuff_registration.last_name,stuff_registration.salary,payable_amount.* FROM payable_amount INNER JOIN stuff_registration ON payable_amount.stuff_id=stuff_registration.id", function(err,rows_02)
            {
                if(rows_02.length >0)
                {
                    var arr = [];
                    for(var i =0 ; i<rows_02.length;i++)
                    {
                    var sh = moment(rows_02[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                        arr += sh +",";
                    }
                    var str_array = arr.split(',');
                  res.render("emp_SP_reg",{data_02:rows_02,data_date:str_array,all_stff_sal:rows_01[0].total_paid}); 
                }else{
                    res.send("<h1 style='color:green; text-align:center;'>کارمند موجود نیست !</h1>");
                }
       
           });
           });
           });

           app.post('/getUserName', function(req,res)
           {
            var my_id =  req.query.param;

            con.query("select * from stack_factory_registration where item_name= '"+my_id+"'", function(err,rows_02)
            {

             console.log("select * from stack_factory_registration where item_name = '"+my_id+"'");
        
            // res.json({
                
            //     data_02:rows_02
            // });
            res.send(rows_02);

                });
           });

           app.get("/emp-reg.ejs", function(req,res){

            con.query("select sum(salary) as total_salary from stuff_registration ", function(err,rows_01)
            {
            con.query("select * from stuff_registration ", function(err,rows_02)
            {
                if(rows_02.length >0)
                {
                    var arr = [];
                    for(var i =0 ; i<rows_02.length;i++)
                    {
                    var sh = moment(rows_02[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                        arr += sh +",";
                    }
                    var str_array = arr.split(',');
                    
  
                     res.render("emp-reg",{data_02:rows_02,data_date:str_array,all_salary:rows_01[0].total_salary}); 
                }else{
                    res.send("<h1 style='color:green; text-align:center;'>کارمند موجود نیست !</h1>");
                }
       
           });
           });
           });

           app.get("/emps.ejs", function(req,res){

  
            res.render("emps"); 
       
           });

           app.get("/fro.ejs", function(req,res){

                con.query("select * from company_info ", function(err,rows_02)
                {
                    if(err) {
                        console.log(err);
                        return res.send("Error loading company info");
                    }
                    /* select * from stack_to_market group by item_name , item_type */
                    con.query("select * from stack_to_market_lists  ", function(err,rows_03)
                  {
                      if(err) {
                          console.log(err);
                          return res.send("Error loading stack to market lists");
                      }
                       con.query("SELECT MAX(id) as new_bill FROM froshat_details", function(err,rows_04)
                      {
                          if(err) {
                              console.log(err);
                              return res.send("Error loading froshat details");
                          }
                          
                       con.query("SELECT * FROM customer_account", function(err,rows_05)
                      {
                          if(err) {
                              console.log(err);
                              return res.send("Error loading customer account");
                          }
                            // Handle case when rows_04 is empty or undefined
                            var new_bill = (rows_04 && rows_04.length > 0 && rows_04[0].new_bill) ? rows_04[0].new_bill : 0;
                            res.render("fro",{data_02:rows_02,data_03:rows_03,data_04:new_bill,data_05:rows_05});
       
                      });
                    });
                  });
               });
           });

           app.get("/processing_materials.ejs", function(req,res){

                con.query("select * from company_info", function(err,rows_02)
                {
                   /*  con.query("select * from stack_raw_materials_list ", function(err,rows_03)
                  { */
                    con.query("SELECT item_name,item_type,bill_no,SUM(quantity) as totqunatity FROM `stack_raw_materials` GROUP BY item_name , item_type ,bill_no ", function(err,rows_03)
                  {
                      
                       con.query("select * from ready_materials_type", function(err,rows_04)
                      {
                       con.query("SELECT * FROM customer_account", function(err,rows_05)
                      {
                            res.render("processing_materials",{data_02:rows_02,data_03:rows_03,data_04:rows_04,data_05:rows_05});
       
                      });
                    });
                  });
               });
           });


           app.get("/baraword.ejs", function(req,res){

                con.query("select * from company_info ", function(err,rows_02)
                {
                    con.query("select item_name ,item_type,bill_no from stack_raw_materials group by item_name , item_type,bill_no  ", function(err,rows_03)
                  {
                       con.query("select * from ready_materials_type", function(err,rows_04)
                      {
                       con.query("SELECT * FROM customer_account", function(err,rows_05)
                      {
                            res.render("baraword",{data_02:rows_02,data_03:rows_03,data_04:rows_04,data_05:rows_05});
       
                      });
                    });
                  });
               });
           });

           
           app.get("/froshat_view.ejs", function(req,res){

            con.query("SELECT * from customer_account", function(err,rows_03)
            {

                        con.query("SELECT customer_account.id as cust_id, customer_account.company_name, froshat_details.* FROM customer_account INNER JOIN froshat_details ON customer_account.id=froshat_details.cus_id WHERE froshat_details.total_amount != froshat_details.paid_amount", function(err,rows_01)
                        {
                                    if(rows_01.length >0)
                                    {

                                        var arr = [];
                                        for(var i =0 ; i<rows_01.length;i++)
                                        {
                                        var sh = moment(rows_01[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                            arr += sh +",";
                                        }
                                        var str_array = arr.split(',');
                            
                    
                                     res.render("froshat_view",{data_01:rows_01,data_03:rows_03,date_data:str_array}); 
                                    }else{
                                        res.send("<h1 style='color:green; text-align:center;'>فروشات صورت نگرفته است !</h1>");
                                    }
                        });
                        });
                
                   
            });


            app.get("/stack_view.ejs", function(req,res){

                con.query("SELECT stack_to_market_details.id, stack_to_market_details.bill_no,stack_to_market_details.date as stakc_date,stuff_registration.name,stuff_registration.contact,stuff_registration.email FROM stack_to_market_details INNER JOIN stuff_registration ON stack_to_market_details.stuff_id=stuff_registration.id", function(err,rows_01)
                {
                            if(rows_01.length >0)
                            {

                                var arr = [];
                            for(var i =0 ; i<rows_01.length;i++)
                            {
                            var sh = moment(rows_01[i].stakc_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                arr += sh +",";
                            }
                            var str_array = arr.split(',');
                    
            
                             res.render("stack_view",{data_01:rows_01,data_date:str_array}); 
                            }else{
                                res.send("<h1 style='color:green; text-align:center;'>فروشات صورت نگرفته است !</h1>");
                            }
                     });
           });

           app.get("/view_creating_mahsol.ejs", function(req,res){

                    con.query("SELECT * FROM `ready_materials_type`", function(err,rows_01)
                    {
                        if(rows_01.length >0)
                        {
                
        
                            res.render("view_creating_mahsol",{data_01:rows_01}); 
                            }else{
                                res.send("<h1 style='color:green; text-align:center;'> محصول موجود نیست !</h1>");
                            }
                    });
            });


            app.get("/view_creating_price.ejs", function(req,res){

                con.query("SELECT * FROM `set_price`", function(err,rows_01)
                {
                    if(rows_01.length >0)
                    {
            
    
                        res.render("view_creating_price",{data_01:rows_01}); 
                        }else{
                            res.send("<h1 style='color:green; text-align:center;'> محصول موجود نیست !</h1>");
                        }
                });
        });


            app.get("/city_exsistance.ejs", function(req,res){

                con.query("SELECT * FROM `stack_to_market_lists`order BY sell_price ASC", function(err,rows_01)
                {
                            if(rows_01.length >0)
                            {

                               
                    
            
                             res.render("city_exsistance",{data_01:rows_01}); 
                            }
                     });
        
           
             });
                    
                

// Bill routes - moved to routes/billRoutes.js
app.use('/', billRoutes);

           app.post('/searching_bill_no_01', function(req,res)
           {
                   var my_id =  req.query.param;
                   console.log(my_id);

                   con.query("SELECT customer_account.company_name, froshat_details.* FROM customer_account INNER JOIN froshat_details ON customer_account.id=froshat_details.cus_id WHERE  bill_no ='"+my_id+"' ", function(err,rows_02)
                   {
                    if(rows_02.length > 0)
                    {
                        /* sending second params data */
                        con.query("select * from froshat_details where bill_no = '"+my_id+"'",function(err, rows0002)
                        {

                        
                        var each_loaner = rows0002[0].id;
                       
                
                con.query("select * from sales_payments where sales_id ='"+each_loaner+"'",function(err,rows_04){
                   
                    var shamsi = [];

                if(rows_04.length < 1){
                   
                  //  res.send("معذرت! پرداخت صورت نگرفته است. ");
                    res.json({
                        froshat:rows_02,
                        payments:"معذرت! پرداخت صورت نگرفته است. "
                    });

                  }else{

                    for(var i =0;i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                    shamsi += sh + ",";
                    }
                    var str_array = shamsi.split(',');
                    if(err) 
                    {
                        throw err ;
                    }else{
                       
                            var table_data = "";
                            var no =0;
                            var no1 =1;
                            rows_04.forEach( (row) => {
                                table_data += "<tr id="+"delete_row_"+row.id+">";
                                    table_data += "<td>"+ no1 + "</td>";
                                    table_data += "<td>"+ row.paid+ "</td>";
                                    table_data += "<td>"+ row.currency+ "</td>";
                                    table_data += "<td>"+ row.ex_rate+ "</td>";
                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                    table_data += "<td><a onclick="+"payment_delet("+row.id+")"+" href='#' style='color:red;'> حذف </a>   </td>";
                                    table_data += "</tr>";
                                    no++;
                                    no1++;
                                
                            });
                            
                           // res.send(table_data);
                         // res.send({rows_02,table_data});
                        //    res.send({froshat:rows_02,payments:table_data});
                           res.json({
                            froshat:rows_02,
                            payments:table_data
                        })
                       
                    }
                }
                });   
            }); 
                        /* sending second params data */
                        
                    }else{
                        res.send("<h1 style='color:green; text-align:center;'>پرداخت صورت نگرفته است !</h1>");
                        console.log("it will come here ");

                    }
                      
                   });
           });

           app.post('/sending_stock_details', function(req,res)
           {
               var my_id =  req.query.param;

                   con.query("select * from stack_bill_detail WHERE stack_to_m_detail_id = '"+my_id+"'", function(err,rows_02)
                   {
                    var table_data = "";
                    var no =1;
                    rows_02.forEach( (row) => {
                        table_data += "<tr>";
                            table_data += "<td>"+ no+ "</td>";
                            table_data += "<td>"+ row.item_name+ "</td>";
                            table_data += "<td>"+ row.category+ "</td>";
                            table_data += "<td>"+ row.quantity+ "</td>";
                            
                            table_data += "<td><a onclick="+"cat_delet1("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" data-toggle='modal' data-target='#basicModal' href=# style='color:green;'>ویرایش</a></td>";
                            table_data += "</tr>";
                            no++;
                        
                    });
                    res.send(table_data);
                   });
           });

           app.post('/sending_raw_material_details', function(req,res)
           {
               var my_id =  req.query.param;

                   con.query("SELECT * FROM `create_mahsol` where ready_material_type_id = '"+my_id+"'", function(err,rows_02)
                   {
                    var table_data = "";
                    var no =1;
                    rows_02.forEach( (row) => {
                        table_data += "<tr>";
                            table_data += "<td>"+ no+ "</td>";
                            table_data += "<td>"+ row.item_name+ "</td>";
                            table_data += "<td>"+ row.item_type+ "</td>";
                            table_data += "<td>"+ row.quantity+ "</td>";
                            
                            table_data += "<td><a onclick="+"cat_delet1("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" data-toggle='modal' data-target='#basicModal' href=# style='color:green;'>ویرایش</a></td>";
                            table_data += "</tr>";
                            no++;
                        
                    });
                    res.send(table_data);
                   });
           });


           app.post('/sending_all_price_details', function(req,res)
           {
               var my_id =  req.query.param;

                   con.query("SELECT * FROM `mahsol_price` where set_p_id = '"+my_id+"'", function(err,rows_02)
                   {
                    var table_data = "";
                    var no =1;
                    rows_02.forEach( (row) => {
                        table_data += "<tr>";
                            table_data += "<td>"+ no+ "</td>";
                            table_data += "<td>"+ row.item_name+ "</td>";
                            table_data += "<td>"+ row.item_type+ "</td>";
                            table_data += "<td>"+ row.quantity+ "</td>";
                            table_data += "<td>"+ row.price+ "</td>";
                            table_data += "<td>"+ parseFloat( row.price * row.quantity)+ "</td>";
                            
                            /* table_data += "<td><a onclick="+"cat_delet1("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" data-toggle='modal' data-target='#basicModal' href=# style='color:green;'>ویرایش</a></td>"; */
                            table_data += "</tr>";
                            no++;
                        
                    });
                    res.send(table_data);
                   });
           });
           
           app.get("/hb-reg.ejs", function(req,res){
            con.query("SELECT SUM(amount) as tken_amount from partner_taken_amount ",function(err,rows_03){

            con.query("SELECT partner_taken_amount.id,partner_taken_amount.amount,partner_taken_amount.document,partner_taken_amount.date,partner_registration.full_name,partner_registration.location,partner_registration.contact,partner_registration.email,partner_registration.address,partner_registration.participant_percentage FROM partner_taken_amount INNER JOIN partner_registration ON partner_taken_amount.partner_id = partner_registration.id ", function(err,rows_02)
            {
                if(rows_02.length > 0)
                {

                
                        var arr = [];
                            for(var i =0 ; i<rows_02.length;i++)
                            {
                            var sh = moment(rows_02[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                arr += sh +",";
                            }
                            var str_array = arr.split(',');
        
                        res.render("hb-reg",{data_02:rows_02,date_data:str_array,total_rwos:rows_03[0].tken_amount}); 
                }else{
                    res.send("<h1 style='color:green; text-align:center;'>برداشت صورت نگرفته است !</h1>");
                }
       
           });
           });
           });

           app.get("/holder_billance.ejs", function(req,res){
            con.query("select COALESCE(sum(total_amount), 0)as income from froshat_details ", function(err,rows_01)
            {
               
               if (rows_01[0].income.length<0)
               
                {
                    var incom = 0;
                }else{
                
                    con.query("SELECT *,(SELECT COALESCE(SUM(amount), 0)AS total FROM partner_taken_amount WHERE partner_id=partner_registration.id) AS totalcount FROM partner_registration ", function(err,rows_02)
                        {

                            if(rows_02.length >0)
                            {

                            con.query("select sum(participant_percentage) as all_assets from partner_registration ",function(err,rows_03){

                            partners_asset  = rows_03[0].all_assets;
                            var incom = rows_01[0].income;//2300
                            var arr_taken = [];
                            for(var i=0 ; i<rows_02.length;i++)
                            {
                                var tkn = rows_02[i].totalcount;
                                arr_taken += tkn +",";
                            }
                            var partner_taken = arr_taken.split(',');
                           console.log(partner_taken);
                     
                           var percen = rows_02[0].participant_percentage;
                           console.log(percen);
                           var cal_each_percentage = [];
                           for(var j=0 ; j<rows_02.length;j++)
                           {
                            var each_asset = parseFloat(rows_02[j].participant_percentage * 100) /partners_asset;
                            cal_each_percentage += each_asset +",";
                           }
                           var cal_each_income_arr = cal_each_percentage.split(',');
                           console.log(cal_each_income_arr);//each percentage 

                           var cal_each_partner_income =[];
                           for(var k=0 ; k<cal_each_income_arr.length;k++)
                           {
                                var each_income =parseFloat( cal_each_income_arr[k])  * parseFloat( incom) / 100;
                                   cal_each_partner_income += roundTo(each_income,2) +",";
                           }
                           var cal_each_partner_income_arr = cal_each_partner_income.split(',');
                           console.log(cal_each_partner_income_arr);

                            res.render("holder_billance",{partner_details:rows_02,each_partner_taken:partner_taken,each_part_income:cal_each_partner_income_arr}); 
       
                      });
                    }
                    else{
                        res.send("<h2>! معذرت سرمایه موجود نیست</h2>");
                    }
                  });
                }//end of first if
               });
            });

           app.get("/holders_bardasht.ejs", function(req,res){
                    con.query("select * from partner_registration ", function(err,rows_02)
                    {
                        /* if(rows_02.length >0)
                            { */
                
                            res.render("holders_bardasht",{data_02:rows_02});
                            /* }else{
                                res.send("شریک ثبت نشده است !");
                            } */
            
                    });
           });

           app.get("/holders_rep.ejs", function(req,res){

  
            res.render("holders_rep"); 
       
           });
          //COALESCE(SUM(amount), 0)0791172676
           app.get("/iloan_reg.ejs", function(req,res){

            con.query("SELECT sum((amount+benefit))AS total FROM incoming_loan WHERE currency='دالر'",function(err,rows_05)
                {
            con.query("SELECT sum((amount+benefit))AS total FROM incoming_loan WHERE currency='افغانی'",function(err,rows_06)
                {
                    
                   
            con.query("SELECT *,(SELECT COALESCE(SUM(paid), 0)AS total FROM incoming_loan_list WHERE incoming_loan_id =incoming_loan.id) AS totalcount FROM incoming_loan ", function(err,rows_02)
            {
                if(rows_02.length >0)
                {

               
                    var arr = [];
                    for(var i =0 ; i<rows_02.length;i++)
                    {
                    var sh = moment(rows_02[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                        arr += sh +",";
                    }
                    var str_array = arr.split(',');
  
                    res.render("iloan_reg",{data_02:rows_02,data_date:str_array,all_in_dollor:rows_05[0].total,all_in_afghani:rows_06[0].total}); 
                }else{
                    res.send("<h1 style='color:green; text-align:center;'>قرضه برای شرکت موجود نیست !</h1>");
                }
       
           });
           });
           });
           });
           app.get("/index.ejs", function(req,res){

  
            res.render("index"); 
       
           });
           app.get("/input_loan.ejs", function(req,res){

  
            res.render("input_loan"); 
       
           });

           app.get("/machinery_tools.ejs", function(req,res){

  
            res.render("machinery_tools"); 
       
           });
           
           app.get("/mt_reg.ejs", function(req,res){
            con.query("SELECT sum(purchase_price)AS price FROM item_registration where machine_life IS NOT NULL",function(err,rows_05)
            {
            con.query("SELECT * FROM  item_registration where machine_life IS NOT NULL", function(err,rows_03)
            {
                if(rows_03.length >0 )
                {
                    
               
                        var arr = [];
                        for(var i =0 ; i<rows_03.length;i++)
                        {
                        var sh = moment(rows_03[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                            arr += sh +",";
                        }
                        var str_array = arr.split(',');


                        var arr_years =[];
                        var arr_days =[];
                        for(var j =0 ; j<rows_03.length;j++)
                        {

                            var machi_life = rows_03[j].machine_life;
                            var month =(((machi_life /30)/12).toFixed(2)).toString();
                            var str_arr = month.split('.');
                            var year = str_arr[0];
                            arr_years +=","+ year ;
                            
                            var days = (parseFloat(str_arr[1])/100);
                            var real_days = (days * 360).toFixed();
                            arr_days += ","+ real_days ;

                            var new_arr_years = arr_years.substring(1);
                            var some_err_years = new_arr_years.split(",");

                            var new_arr_days = arr_days.substring(1);
                            var some_err = new_arr_days.split(",");
                        }
                        
        
                        res.render("mt_reg",{data_03:rows_03,date_data:str_array,price:rows_05[0].price,all_years:some_err_years,all_days:some_err}); 
                    }else{
                        res.send("<h1 style='color:green; text-align:center;'>جنس در گدام موجود نیست !</h1>");
                    }
       
           });
           });
           });
           app.get("/oloan_reg.ejs", function(req,res){

            con.query("SELECT round(sum(amount/ex_rate),3)AS total FROM outgoing_loan",function(err,rows_05)
                {
            con.query("SELECT outgoing_loan.stuff_id as stf_id, stuff_registration.name FROM outgoing_loan INNER JOIN stuff_registration ON outgoing_loan.stuff_id=stuff_registration.id",function(err,rows_04)
                {
                    if(rows_04.length >0)
                    {
                      //outgoing_loan,stuff_registration.name,outgoing_loan_list
                    
                    var arr_name = [];
                    for(var n =0 ; n<rows_04.length;n++)
                    {
                        var sh = rows_04[n].name; 
                        arr_name += sh +",";
                    }
                    var str_array2 = arr_name.split(',');
                   // console.log(str_array2);
                    
                    /* SELECT stuff_registration.id as stf_id,stuff_registration.name,outgoing_loan.id,outgoing_loan.company_name,outgoing_loan.amount,outgoing_loan.installment_no,outgoing_loan.currency,outgoing_loan.ex_rate,outgoing_loan.date FROM stuff_registration INNER JOIN outgoing_loan ON stuff_registration.id = outgoing_loan.stuff_id */
                    
            con.query("SELECT outgoing_loan.id,outgoing_loan.stuff_id as stf_id,outgoing_loan.company_name,outgoing_loan.amount,outgoing_loan.installment_no,outgoing_loan.currency,outgoing_loan.ex_rate,outgoing_loan.tazkira,outgoing_loan.date,(SELECT COALESCE(SUM(paid), 0)AS total FROM outgoing_loan_list WHERE outgoing_loan_id =outgoing_loan.id) AS totalcount FROM outgoing_loan ", function(err,rows_03)
            {
                var arr = [];
                    for(var i =0 ; i<rows_03.length;i++)
                    {
                    var sh = moment(rows_03[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                        arr += sh +",";
                    }
                    var str_array = arr.split(',');
  
            res.render("oloan_reg",{data_03:rows_03,date_data:str_array,out_loan:rows_05[0].total,out_loan_name:str_array2});
       
              });
            }else{
                res.send("<h1 style='color:green; text-align:center;'>قرضه برای کارمند موجود نیست !</h1>");
            }
           });
           });
           });
           app.get("/out_loan.ejs", function(req,res){
            con.query("select * from stuff_registration ", function(err,rows_03)
            {
  
            res.render("out_loan",{data_02:rows_03});
       
           });
           });

           //raw material
           app.post("/add_expense", function(req,res){
            
            console.log("asdsfsadf");
            var dis_type = req.body.dis_type;
            var amount = req.body.amount;
            var price = req.body.price;
            var currency = req.body.currency;
            var ex_rate = req.body.to_dollar;
            var detail = req.body.detail;
            var date = req.body.data_man;
            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            con.query("INSERT INTO expenses(`category_id`, `quantity`,`price`,`description`,`ex_rate`,`currency`,`date`) VALUES ('"+dis_type+"','"+ amount +"','"+price+"','"+detail+"','"+ex_rate+"','"+currency+"','"+m+"')",function(err,rows){

                if(err) 
                {
                    throw err ;
                }else{
                    res.json({
                        status:'1',
                        data:rows
                    });
                }
            });
                  
        });

        app.post("/add_expense1", function(req,res){
            
            var category_type = req.body.part;
             
            con.query("INSERT INTO expense_category(`name`) VALUES ('"+category_type+"')",function(err,rows){
                if(err) 
                {
                    throw err ;
                }else{
                    con.query("select * from expense_category",function(err,rows_04)
                    {
                        var table_data = "";
                        var no =1;
                        rows_04.forEach( (row) => {
                            table_data += "<tr id=parent_d_"+row.id+">";
                                 table_data += "<td>"+ no+ "</td>";
                                table_data += "<td>"+ row.name+ "</td>";
                                table_data += "<td><a onclick="+"cat_delet1("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href='#' style='color:green;'>ویرایش</a></td>";
                                table_data += "</tr>";
                                no++;
                               
                        });
                        res.send(table_data);
                    });
                   
                }
            });
                  
        });

        app.post("/show_all_data", function(req,res){

            con.query("select * from expense_category",function(err,rows_04){
                if(err) 
                {
                    throw err ;
                }else{
                   
                    var table_data = "";
                    var no =1;
                    rows_04.forEach( (row) => {
                        table_data += "<tr id=parent_d_"+row.id+">";
                             table_data += "<td>"+ no+ "</td>";
                            table_data += "<td>"+ row.name+ "</td>";
                            table_data += "<td><a onclick="+"cat_delet1("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                            table_data += "</tr>";
                            no++;
                           
                    });
                    res.send(table_data);
                   
                }
            });
                  
        });

           app.get("/raw_material_store.ejs", function(req,res){

                con.query("SELECT round(sum((price * quantity)),3)AS total FROM stack_raw_materials WHERE currency='دالر'",function(err,rows_05)
                {
            con.query("SELECT round(sum((price * quantity)),3)AS total FROM stack_raw_materials WHERE currency='افغانی'",function(err,rows_06)
                {
            con.query("select * from stack_raw_materials",function(err,rows_04)
            {
                      if(rows_04.length >0)
                       {
                
                            var arr = [];
                            for(var i =0 ; i<rows_04.length;i++)
                            {
                            var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                arr += sh +",";
                            }
                            var str_array = arr.split(',');
                            console.log(str_array);
        
                            res.render("raw_material_store",{data_04:rows_04,date_data:str_array,dollor_price:rows_05[0].total,afghani_price:rows_06[0].total}); 
                        }else{
                            res.send("<h1 style='color:green; text-align:center;'>مواد خام موجود نیست!</h1>");
                        }
       
           });
           });
           });
           });

           app.get("/raw_materials.ejs", function(req,res){

                con.query("select * from material_type",function(err,rows_04)
                {
                    con.query("SELECT MAX(id) as new_bill  FROM material_type", function(err,rows_03)
                    {
                       res.render("raw_materials",{data_04:rows_04,data_03:rows_03[0].new_bill});
        
                    });
                });
           });

           app.post("/stack_raw_regist", function(req,res){
            
            
            var buy_item = req.body.buy_type;
            var company_name = req.body.company_name;
            var contact = req.body.contact;
            
            //var bill_no = req.body.bill_no;
            var item_name = req.body.item_name;
            var item_type = req.body.item_type;
            var address = req.body.address;
            var details = req.body.details;
            var quantity = parseFloat(req.body.quantity) || 0;
            var amount = parseFloat(req.body.amount) || 0;//item_name - Convert to number
            
            
            // var date = req.body.date_man;
            var currency = req.body.currency;
            var to_dollar = parseFloat(req.body.to_dollar) || 1;
            var date = req.body.date_man;
            var serail_no = parseInt(req.body.pro_no) || 0;
            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
           
            
            con.query("INSERT INTO stack_raw_materials(`buy_type`,`company_name`,`contact`,`bill_no`,`item_name`,`item_type`,`buy_place`,`description`,`quantity`,`price`,`currency`,`ex_rate`,`date`) VALUES ('"+item_type+"','"+ company_name +"','"+contact+"','"+serail_no+"','"+buy_item+"','"+item_name+"','"+address+"','"+details+"','"+quantity+"','"+amount+"','"+currency+"','"+to_dollar+"','"+m+"')",function(err,rows){

                

              
                if(err) 
                {
                    throw err ;
                }else{
                            

                            res.send("success");
                   
                }
            });
                  
        });

        app.post("/add_new_types", function(req,res){
            
            
            var type = req.body.type;
            var serail_no = req.body.serial_no;

            con.query("select * from material_type where serial_number ='"+serail_no+"'",function(err,rows0002)
            {

            if(rows0002.length >0)
            {
               res.send("موجود است ");
            }else{

                        con.query("INSERT INTO `material_type`( `type`, `serial_number`) VALUES ('"+type+"','"+serail_no+"')",function(err,rows_02)
                        {
                            
                            if(err)
                            {
                                throw err;
                            }else{
                                con.query("select * from material_type",function(err1,rows_04)
                                {
                                    console.log("select * from material_type");
                                    if(err1)
                                    {
                                        throw err1;
                                    }else{
                                        var table_data = "";
                                        var no =1;
                                        rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                                table_data += "<td>"+ no+ "</td>";
                                                table_data += "<td>"+ row.type+ "</td>";
                                                table_data += "<td>"+ row.serial_number+ "</td>";
                                                table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                                                table_data += "</tr>";
                                                no++;
                                            
                                        });
                                       res.send(table_data);
                                  }
                                });
                               
                            }
                        }); 
                    }
                    });
        });

        app.post('/edit_add_type', function(req,res)
        {
                    var id_val =  req.query.id_val; 
                    var type =  req.query.type;
                    var ser_no =  req.query.ser_no;
                  con.query("update material_type set type='"+type+"',serial_number='"+ser_no+"' WHERE id = '"+id_val+"'",function(err,rows_02)
                  {
                      
                      if(err)
                      {
                          throw err;
                      }else{
                          con.query("select * from material_type",function(err1,rows_04)
                          {
                              if(err1)
                              {
                                  throw err1;
                              }else{
                                  var table_data = "";
                                  var no =1;
                                  rows_04.forEach( (row) => {
                                      table_data += "<tr id="+"delete_row_"+row.id+">";
                                          table_data += "<td>"+ no+ "</td>";
                                          table_data += "<td>"+ row.type+ "</td>";
                                          table_data += "<td>"+ row.serial_number+ "</td>";
                                          table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                                          table_data += "</tr>";
                                          no++;
                                      
                                  });
                                 res.send(table_data);
                            }
                          });
                         
                      }
                  }); 
         });

         app.post('/edit_add_type_02', function(req,res)
         {
                     var id_val =  req.query.id_val; 
                     var mahsol_name =  req.query.mahsol_name;
                     var type =  req.query.type;
                     var ser_no =  req.query.ser_no;
                   con.query("update ready_materials_type set name='"+mahsol_name+"', type='"+type+"',serial_no='"+ser_no+"' WHERE id = '"+id_val+"'",function(err,rows_02)
                   {
                       
                       if(err)
                       {
                           throw err;
                       }else{
                           con.query("select * from ready_materials_type",function(err1,rows_04)
                           {
                               if(err1)
                               {
                                   throw err1;
                               }else{
                                   var table_data = "";
                                   var no =1;
                                   rows_04.forEach( (row) => {
                                       table_data += "<tr id="+"delete_row_"+row.id+">";
                                           table_data += "<td>"+ no+ "</td>";
                                           table_data += "<td>"+ row.name+ "</td>";
                                           table_data += "<td>"+ row.type+ "</td>";
                                           table_data += "<td>"+ row.serial_no+ "</td>";
                                           table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                                           table_data += "</tr>";
                                           no++;
                                       
                                   });
                                  res.send(table_data);
                             }
                           });
                          
                       }
                   }); 
          });

        app.post("/show_all_data_01", function(req,res){

            con.query("select * from material_type",function(err,rows_04){
                if(err) 
                {
                    throw err ;
                }else{
                   
                    var table_data = "";
                    var no =1;
                    rows_04.forEach( (row) => {
                        table_data += "<tr id="+"delete_row_"+row.id+">";
                             table_data += "<td>"+ no+ "</td>";
                            table_data += "<td>"+ row.type+ "</td>";
                            table_data += "<td>"+ row.serial_number+ "</td>";
                            table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                            table_data += "</tr>";
                            no++;
                           
                    });
                    res.send(table_data);
                   
                }
            });
                  
        });

        app.post("/add_new_types_01", function(req,res){
            
            
            var mahsol_name = req.body.mahsol_name;
            var type = req.body.type;
            var serail_no = req.body.serial_no;

                        con.query("INSERT INTO `ready_materials_type`( `name`,`type`, `serial_no`) VALUES ('"+mahsol_name+"','"+type+"','"+serail_no+"')",function(err,rows_02)
                        {
                            
                            if(err)
                            {
                                throw err;
                            }else{
                                con.query("select * from ready_materials_type",function(err1,rows_04)
                                {
                                    console.log("select * from ready_materials_type");
                                    if(err1)
                                    {
                                        throw err1;
                                    }else{
                                        var table_data = "";
                                        var no =1;
                                        rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                                table_data += "<td>"+ no+ "</td>";
                                                table_data += "<td>"+ row.name+ "</td>";
                                                table_data += "<td>"+ row.type+ "</td>";
                                                table_data += "<td>"+ row.serial_no+ "</td>";
                                                table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                                                table_data += "</tr>";
                                                no++;
                                            
                                        });
                                       res.send(table_data);
                                  }
                                });
                               
                            }
                        }); 
                  
        });

        app.post("/show_all_data_02", function(req,res){

            con.query("select * from ready_materials_type",function(err,rows_04){
                if(err) 
                {
                    throw err ;
                }else{
                   
                    var table_data = "";
                    var no =1;
                    rows_04.forEach( (row) => {
                        table_data += "<tr id="+"delete_row_"+row.id+">";
                             table_data += "<td>"+ no+ "</td>";
                            table_data += "<td>"+ row.name+ "</td>";
                            table_data += "<td>"+ row.type+ "</td>";
                            table_data += "<td>"+ row.serial_no+ "</td>";
                            table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'> حذف /</a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'>ویرایش</a></td>";
                            table_data += "</tr>";
                            no++;
                           
                    });
                    res.send(table_data);
                   
                }
            });
                  
        });

           app.post("/stack_reg", function(req,res){
            
            
            var name = req.query.innervalue;
            var mahsole_id = req.body.dis_type;
            console.log(mahsole_id);
            console.log(name);
            
            var item_type = req.body.item_type;
            var amount = req.body.amount;
            var fixed_price = req.body.price;
            
            var sell_price = req.body.sell_price;
            var currency = req.body.currency;
            var to_dollar = req.body.to_dollar;
            var date = req.body.date_man;
            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
            var serail_no = req.body.pro_no;
           
           // stack_factory_registration_list
            con.query("INSERT INTO stack_factory_registration(`item_name`,`item_type`,`quantity`,`fixed_price`,`sell_price`,`currency`,`ex_rate`,`serial_number`,`date`) VALUES ('"+name+"','"+item_type+"','"+ amount +"','"+fixed_price+"','"+sell_price+"','"+currency+"','"+to_dollar+"','"+serail_no+"','"+m+"')",function(err,rows){

                /* all raw_material should be mines from each mahsol */
                /* lastrowss of stack_fa_reg , name , type, quantity */
                con.query("select * from create_mahsol where ready_material_type_id='"+mahsole_id+"'",function(err , rows_0002)
                {
                     var stack_fac_reg = rows.insertId;//
                     console.log(stack_fac_reg);
                    
                    for(var i=0;i<rows_0002.length ; i++)
                    {
                        
              
                                   (function(i)
                                      {
                                          setTimeout(function()
                                          {
                                            var mahsol_item_name =  rows_0002[i].item_name;
                                            var mahsol_item_type = rows_0002[i].item_type;
                                            var mahsol_item_quantity = rows_0002[i].quantity;

                                            var update_qunatity = parseFloat(amount * mahsol_item_quantity);
                                           
                                                     
                                                      

                                                          
                                                             
                                                            con.query("insert into raw_material_each_mahsol (stack_factory_id,item_name,item_type,quantity)values('"+stack_fac_reg+"','"+mahsol_item_name+"','"+mahsol_item_type+"','"+update_qunatity+"')",function(err,rows_006)
                                                            {

                                                            });

                                                 
              
                                          },i)
                                      })(i);
              
                   }
                    

                     con.query("select * from stack_factory_registration_list where item_name='"+name+"' and item_type='"+item_type+"'",function(err , rows_02)
                     {
                      if(rows_02.length >0)
                      {
                       var db_quantity = rows_02[0].quantity;
                       var web_quantity = amount;
                       var update_qunatity = parseFloat(db_quantity) + parseFloat(web_quantity);
                       con.query("update stack_factory_registration_list set quantity = '"+update_qunatity+"' where item_name='"+name+"' and item_type='"+item_type+"'",function(err,rows_03)
                       {
                              res.send("محصول در گدام موفقانه ثبت شد");
                       });
                      }else{

                        con.query("INSERT INTO stack_factory_registration_list(`item_name`,`item_type`,`quantity`,`fixed_price`,`sell_price`,`currency`,`ex_rate`,`serial_number`,`date`) VALUES ('"+name+"','"+item_type+"','"+ amount +"','"+fixed_price+"','"+sell_price+"','"+currency+"','"+to_dollar+"','"+serail_no+"','"+m+"')",function(err , rows_02)
                            {
                                res.send("محصول در گدام موفقانه ثبت شد");
                            });

                      }
                     });
               
            });
            });
                  
        });
        

        // app.post("/market_reg1", function(req,res){
            
        //    console.log("sdaf");
                  
        // });
        //error_2(factory_item_id)
        app.post("/market_reg", function(req,res){
            
          var name = req.body.item_name;
          var item_type = req.body.item_type;
          
          var quantity = req.body.amount;
          var fixed_price = req.body.price;
          var sell_price = req.body.sell_price;
         
          var date1 = req.body.date_man;
    
          var m = moment.from(date1, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');//conver farsi date to gregorian
          //var sh = moment(input, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');//تبدیل تاریخ میلادی به شمسی

          con.query("select * from stack_to_market where item_name = '"+name+"' and item_type='"+item_type+"' ",function(err,rows_07)
          {
              console.log("select * from stack_to_market where item_name = '"+name+"' and item_type='"+item_type+"' ");
              //console.log(rows_07.length >=1);
             
          if(rows_07.length >0)
          {
               

                con.query("select quantity from stack_to_market where item_name='"+name+"' and item_type='"+item_type+"'",function(err,rows_032)
                     {

                            var stack_qun = rows_032[0].quantity;
                            var update_qunat1 = parseFloat(stack_qun) +parseFloat(quantity); 
                            con.query("update stack_to_market set `quantity`='"+update_qunat1+"' where item_name='"+name+"' and item_type = '"+item_type +"'",function(err,rows){
                
                                if(err) 
                                {
                                    throw err ;
                                }else{

                                        con.query("select * from stack_factory_registration where item_name='"+name+"' and item_type='"+ item_type +"'", function(err,rows_02)
                                        {
                                                var db_quantity = rows_02[0].quantity;
                                                var update_qunt = db_quantity - quantity;

                                                con.query("update stack_factory_registration set quantity='"+update_qunt+"' where item_name='"+name+"' and item_type='"+ item_type +"'", function(err,rows_03)
                                                {
                                                
                                                        if(db_quantity < quantity)
                                                        {
                                                            res.send("این مقدار در گدام کارخانه موجود نیست");
                                                        }
                                                });
                                         });
                    
                    
                                    }
                                });
                            });
            }else{

                con.query("INSERT INTO stack_to_market(`item_name`,`item_type`,`fixed_price`,`sell_price`,`quantity`,`date`) VALUES ('"+name+"','"+item_type +"','"+fixed_price+"','"+sell_price+"','"+quantity+"','"+m+"')",function(err,rows){
               
                    if(err) 
                    {
                        throw err ;
                    }else{

                                con.query("select * from stack_factory_registration where item_name='"+name+"' and item_type='"+ item_type +"'", function(err,rows_02)
                                {
                                var db_quantity = rows_02[0].quantity;
                                var update_qunt = db_quantity - quantity;

                                            con.query("update stack_factory_registration set quantity='"+update_qunt+"' where item_name='"+name+"' and item_type='"+ item_type +"'", function(err,rows_03)
                                            {
                                            
                                                    if(db_quantity < quantity)
                                                    {
                                                        res.send("این مقدار در گدام کارخانه موجود نیست");
                                                    }
                                            });
                                });
                    
                    
                        }
                });
                     
            }//end of else
             
        });    
      });

      app.post("/up_image", function(req,res){

        if (!(req.files && req.files.upload))
        {
            var name2 = req.body.emp_name;
            var last_name = req.body.emp_fname;
            var contact = req.body.emp_phone;
            var email = req.body.emp_email;
            var tazkira = req.body.emp_tazkira;
            var emp_add = req.body.emp_add;
            var job_place = req.body.j_area;
            var job_type = req.body.emp_j_type;
            var salary = req.body.emp_salary;
            var stuff_id = req.body.emp_id_staff;
            var date = req.body.date_man;
            var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                
                con.query("INSERT INTO stuff_registration(`name`,`last_name`,`contact`,`email`,`tazkira`,`address`,`job_place`,`job_type`,`id_number`,`salary`,`image`,`date`) VALUES ('"+name2+"','"+ last_name +"','"+contact+"','"+email+"','"+tazkira+"','"+emp_add+"','"+job_place+"','"+job_type+"','"+stuff_id+"','"+salary+"','default.png','"+m+"')",function(err,rows){


                  if(err) 
                  {
                      throw err ;
                  }else{
                      res.json({
                          status:'1',
                          data:rows
                      });
                  }
                });
         }else{

                var name2 = req.body.emp_name;
                var last_name = req.body.emp_fname;
                var contact = req.body.emp_phone;
                var email = req.body.emp_email;
                var tazkira = req.body.emp_tazkira;
                var emp_add = req.body.emp_add;
                var job_place = req.body.j_area;
                var job_type = req.body.emp_j_type;
                var salary = req.body.emp_salary;
                var stuff_id = req.body.emp_id_staff;
                var date = req.body.date_man;
                var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var file = req.files.upload;
                var  file_name = file.name;
                con.query("INSERT INTO stuff_registration(`name`,`last_name`,`contact`,`email`,`tazkira`,`address`,`job_place`,`job_type`,`id_number`,`salary`,`image`,`date`) VALUES ('"+name2+"','"+ last_name +"','"+contact+"','"+email+"','"+tazkira+"','"+emp_add+"','"+job_place+"','"+job_type+"','"+stuff_id+"','"+salary+"','"+file_name+"','"+m+"')",function(err,rows_01){

                    if(err) 
                  {
                      throw err ;
                  }else{
                      /* res.json({
                          status:'1',
                          data:rows_01
                      }); */
                  

                    

                        file.mv("Images/"+file_name,function(err)
                        {
                            /*
                                    if(err)
                                    {
                                        //console.log(err);
                                        res.send(err)
                                    }
                                    else
                                    {
                                        res.send("wowo uploaded");
                                    } 
                            */
                           res.send("wowo uploaded");
                        });

                    }
                    });  
         }
                
              
         
        });

        app.post("/partner_percent", function(req,res){

            if (!(req.files && req.files.doc_scan))
            {
            var name2 = req.body.sh_name;
            var location = req.body.location;
            var contact = req.body.sh_phone_no;
            var email = req.body.emial;
            var address = req.body.address;
            var percentage = req.body.percentage;
             var date = req.body.date_man;
             var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                

                        con.query("INSERT INTO partner_registration(`full_name`,`location`,`contact`,`email`,`address`,`participant_percentage`,`document`,`date`) VALUES ('"+name2+"','"+ location +"','"+contact+"','"+email+"','"+address+"','"+percentage+"','default.png','"+m+"')",function(err,rows){


                        if(err) 
                        {
                            throw err ;
                        }else{
                            res.json({
                                status:'1',
                                data:rows
                            });
                        }
                        });
                    }else{

                                    var name2 = req.body.sh_name;
                                    var location = req.body.location;
                                    var contact = req.body.sh_phone_no;
                                    var email = req.body.emial;
                                    var address = req.body.address;
                                    var percentage = req.body.percentage;
                                    var date = req.body.date_man;
                                    var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                                    var file = req.files.doc_scan;
                                    var  file_name = file.name;
                                    con.query("INSERT INTO partner_registration(`full_name`,`location`,`contact`,`email`,`address`,`participant_percentage`,`document`,`date`) VALUES ('"+name2+"','"+ location +"','"+contact+"','"+email+"','"+address+"','"+percentage+"','"+file_name+"','"+m+"')",function(err,rows){

                                        if(err) 
                                        {
                                            throw err ;
                                        }else{
                                            
                            
                                            file.mv("Images/"+file_name,function(err)
                                            {
                                               res.send("success");
                                            });
                                        }
                                        
                                    });
            
                      }
        });
        app.post("/partner_bardasht", function(req,res){


            var partner_id = req.body.item_name;
            var taken_amount = req.body.taken_amount;
            
             var date = req.body.date_man;
             var m = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var file = req.files.doc_scan;
                var  file_name = file.name;
                con.query("INSERT INTO partner_taken_amount(`partner_id`,`amount`,`document`,`date`) VALUES ('"+partner_id+"','"+ taken_amount +"','"+file_name+"','"+m+"')",function(err,rows){

                  console.log("INSERT INTO partner_taken_amount(`partner_id`,`amount`,`document`,`date`) VALUES ('"+partner_id+"','"+ taken_amount +"','"+file_name+"','"+m+"')");

                  if(err) 
                  {
                      throw err ;
                  }else{
                      res.json({
                          status:'1',
                          data:rows
                      });
                  }
                
                file.mv("Images/"+file_name,function(err)
                {
 
                  });
                  });
        });

        app.post("/add_company_info", function(req,res){


            var name2 = req.body.sh_name;
            var location = req.body.location;
            var contact = req.body.sh_phone_no;
            var email = req.body.email;
            var address = req.body.address;
            var description = req.body.description;
            //var percentage = req.body.percentage;
             var agreement_date = req.body.date_man;
             var date = req.body.date_man_2;
             var m = moment.from(agreement_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
             var m1 = moment.from(date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var file = req.files.doc_scan;
                var  file_name = file.name;
                var currency = req.body.currency;
                var back_up = req.body.backup_folder;

                con.query("update `company_info` set `company_name` ='"+name2+"',description='"+description+"',`location`='"+ location +"',`contact`='"+contact+"',`email`='"+email+"',`website`='"+address+"',`logo`='"+file_name+"',`starting_activity`='"+m+"',`date`='"+m1+"',`backup_url`='"+back_up+"',`currency`='"+currency+"' where id = '1' ",function(err,rows){

                    console.log("update company_info set `company_name` ='"+name2+"',description='"+description+"',`location`='"+ location +"',`contact`='"+contact+"',`email`='"+email+"',`website`='"+address+"',`logo`='"+file_name+"',`starting_activity`='"+m+"',`date`='"+m1+"',`backup_url`='"+back_up+"',`currency`='"+currency+"' where id = '1' ");

                  if(err) 
                  {
                      throw err ;
                  }else{
                      res.json({
                          status:'1',
                          data:rows
                      });
                  }
                
                file.mv("Images/"+file_name,function(err)
                {
 
                  });
                  });
        });
    //   app.use(upload());
    //app.use(fileupload());
    //   //stuff registration
    //   app.post("/stuff_reg", function(req,res){

    //         // var form = new formidable.IncomingForm();
    //         // form.parse(req);
    //         // form.on('fileBegin', function (name, file){
    //         //     file.path = __dirname + '/public/images/' + file.name;
    //         // });
    //         // form.on('file', function (name, file){
    //         //     console.log('Uploaded ' + file.name);
    //         // });
            
    //     var name = req.body.emp_name;
    //     var last_name = req.body.emp_fname;
    //     var contact = req.body.emp_phone;
    //     var email = req.body.emp_email;
    //     var tazkira = req.body.emp_tazkira;
    //     var emp_add = req.body.emp_add;
    //     var job_place = req.body.j_area;
    //     var job_type = req.body.emp_j_type;
    //     var salary = req.body.emp_salary;
    //     var stuff_id = req.body.emp_id_staff;
        
           
    //             var file = req.files.emp_img;
    //            var  file_name = file.name;//
    //             console.log(file_name);
    //             file.mv("Images/"+emp_img,function(err)
    //             {
    //                 if(err)
    //                 {
    //                     console.log(err);
    //                 }
    //                 else
    //                 { 
    //                     console.log("wowo uploaded");
    //                 }
                
    //             });
            
        

    //     var date1 = req.body.date_man;
  
    //     var m = moment.from(date1, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');//conver farsi date to gregorian
       
    //     con.query("INSERT INTO stuff_registration(`name`,`last_name`,`contact`,`email`,`tazkira`,`address`,`job_place`,`job_type`,`id_number`,`salary`,`image`,`date`) VALUES ('"+name+"','"+ amount +"','"+m+"')",function(err,rows){
             
    //         if(err) 
    //         {
    //             throw err ;
    //         }else{
    //             res.json({
    //                 status:'1',
    //                 data:rows
    //             });
    //         }
    //     });
              
    // });

    // app.post('/saveImage', (req, res) => {
    //     console.log("sadlkjlkfj");
    //     const fileName = req.files.upload;//req.files['upload[]'];
    //     const path = __dirname + '/Images/' + fileName
      
    //     fileName.mv(path, (error) => {
    //       if (error) {
    //         console.error(error)
    //         res.writeHead(500, {
    //           'Content-Type': 'application/json'
    //         })
    //         res.end(JSON.stringify({ status: 'error', message: error }))
    //         return
    //       }
      
    //       res.writeHead(200, {
    //         'Content-Type': 'application/json'
    //       })
    //       res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
    //     })
    //   });

    // app.use(fileUpload());

    // app.post('/file_upload', function (req, res) {
        
    //     console.log(aa);
    //     if(!req.files){
    //       var file = req.files.upload_input;
    //       file.mv('/Images/'+file,function(err,data){
    //         if(err){
    //           return  res.send("error occured")
    //         }
    //         else{
    //           console.log("saved");
    //           res.send("File uploaded")
    //         }
    //       })
    //     }
    //     else{
    //         console.log("not set");
    //     }
    //   })

    // app.post('/newFlavour', function (req, res){
    //     console.log('hiiii');
        
    //     var form = new formidable.IncomingForm();
    //     console.log('hiiii2');
    //     form.parse(req);
    //     console.log('hiiii2');
    //     form.on('fileBegin', function (name, file){
    //         file.path = __dirname + '/Images/' + file.name;
    //         console.log('hiiiii3');
    //     });
    
    //     form.on('file', function (name, file){
    //         console.log('Uploaded ' + file.name);
    //     });
    
    //     res.status(200);
    // });


           app.get("/readyMF.ejs", function(req,res){
            con.query("select * from ready_materials_type ",function(err,rows_04)
            {
                con.query("SELECT MAX(id) as new_bill  FROM ready_materials_type", function(err,rows_03)
                           {
  
            res.render("readyMF",{data_list:rows_04,data_03:rows_03[0].new_bill}); 
       
           });
           });
           });

           app.get("/tools-rge.ejs", function(req,res){
            con.query("SELECT sum(purchase_price)AS price FROM item_registration where machine_life IS NULL",function(err,rows_05)
            {
            con.query("select * from item_registration where machine_life IS  NULL",function(err,rows_04)
            {
                if(rows_04.length >0)
                {

               
                   var arr = [];
                    for(var i =0 ; i<rows_04.length;i++)
                    {
                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                        arr += sh + ",";
                    }
                    var str_array = arr.split(',');
  
                   res.render("tools-rge",{data_04:rows_04,data_date:str_array,purchase_price:rows_05[0].price}); 
                }else{
                    res.send("<h1 style='color:green; text-align:center;'>جنس در گدام موجود نیست !</h1>");
                }
       
           });
           });
           });
           app.get("/tool.ejs", function(req,res){

  
            res.render("tool"); 
       
           });
           app.get("/share_holders.ejs", function(req,res){

  
            res.render("share_holders"); 
       
           });
           app.get("/sh_reg.ejs", function(req,res){
            con.query("select * from partner_registration",function(err,rows_04)
            {
                /* here we have to use if condition like if (rows_04.length >0)  */
                if(rows_04.length > 0 )
                {
                        con.query("select sum(participant_percentage) as all_assets from partner_registration ",function(err,rows_01){
                            con.query("select * from partner_registration ",function(err,rows_02){
                                
                                var percent =[];
                            // var partners_asset ;
                                partners_asset  = rows_01[0].all_assets;
                                for(var i=0 ; i<rows_02.length;i++)
                                {
                                    var each_asset = parseFloat(rows_02[i].participant_percentage * 100) /partners_asset;

                                    percent += roundTo(each_asset,2) + ",";
                                    var arr_ass = percent.split(',');//roundTo(1.234, 2);
                                
                                    
                                }
                            // console.log(arr_ass);
                                    
                            ///////////////
                                var arr = [];
                                    for(var i =0 ; i<rows_04.length;i++)
                                    {
                                    var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                        arr += sh + ",";
                                    }
                                    var str_array = arr.split(',');
        
                            res.render("sh_reg",{data_04:rows_04,data_date:str_array,asset_data:arr_ass,all_money:rows_01[0].all_assets}); 
            
                            });
                            });
                    }else{
                        res.send("<h1 style='color:green; text-align:center;'>شریک موجود نیست !</h1>");
                    }
                });
              });


           app.get("/rmf_reg.ejs", function(req,res){
                con.query("SELECT round(sum((fixed_price * quantity)/ex_rate),3)AS total FROM stack_factory_registration",function(err,rows_05)
                {
                con.query("SELECT * FROM `stack_factory_registration` ORDER BY serial_number ASC ",function(err,rows_04)
                {
                    if(rows_04.length >0)
                    {
                        var arr = [];
                        for(var i =0 ; i<rows_04.length;i++)
                        {
                        var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                            arr += sh + ",";
                        }
                        var str_array = arr.split(',');
                   
                   
                
                       res.render("rmf_reg",{data_04:rows_04,data_date:str_array,expenses:rows_05[0].total});
                    }else{
                        res.send("<h1 style='color:green; text-align:center;'>محصول موجود نیست !</h1>");
                    }
       
                });
           });
           });

           /* SELECT SUM((sell_price * quantity) -(fixed_price * quantity))AS benefit FROM stack_to_market */
          
           app.get("/reports.ejs", function(req,res){
            con.query("SELECT round(SUM(price * quantity/ex_rate),3)AS total FROM expenses",function(err,rows_04)
                {

                   con.query("SELECT round(SUM(total_amount/ex_rate),3)AS sell_total FROM froshat_details",function(err,rows_03)
                      {
                        con.query(" SELECT round(SUM(total_amount/ex_rate),3)AS benefit FROM froshat_details",function(err,rows_05)
                        {
                        con.query("SELECT round(SUM(amount/ex_rate),3)AS company_loan FROM incoming_loan",function(err,rows_02)
                        {
                            con.query("SELECT round(SUM(amount/ex_rate),3)AS stuff_loan FROM outgoing_loan",function(err,rows_01)
                            {
                            con.query("SELECT round(SUM((quantity * price)/ex_rate),3)AS sell_total4 FROM stack_raw_materials",function(err,rows_06)
                            {

                       res.render("reports",{expenses:rows_04[0].total,sell_amount:rows_03[0].sell_total,comp_loan:rows_02[0].company_loan,stuff_loan:rows_01[0].stuff_loan,pure_benefit:rows_05[0].benefit,purchase1:rows_06[0].sell_total4,});
       
                        });
                        });
                      });
                    });
                  });
                });
            });

            app.post('/from_date_to_date', function(req,res)
            {
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                con.query("SELECT COALESCE(sum(quantity*price),0) as expse FROM `expenses` WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'", function(err,rows_01)
                    {
                con.query("SELECT COALESCE(sum(total_amount),0) as tot_price FROM froshat_details WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'", function(err,rows_02)
                    {
                
                con.query("SELECT COALESCE(sum(amount),0) as tot_loan FROM incoming_loan WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'", function(err,rows_03)
                    {
                con.query("SELECT COALESCE(sum(amount), 0) as tot_outloan FROM outgoing_loan WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'", function(err,rows_04)
                    {

                con.query("SELECT round(SUM((quantity* price)/ex_rate),3) as tot_raw_purchase FROM stack_raw_materials WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'", function(err,rows_05)
                    {
                        //husainquantity* price)/ex_rate
                        var date_only9 = rows_01[0].expse;
                        var date_only10 = rows_02[0].tot_price;
                        var date_only11 = rows_03[0].tot_loan;
                        var date_only12 = rows_04[0].tot_outloan;
                        var date_only13 = rows_04[0].tot_raw_purchase;

                         result += date_only9 + ','+date_only10 + ","+date_only11 + ','+date_only12 + ',' +date_only13;
                        
                         var str_array = result.split(',');
                      
                        
                         res.send(str_array);
                    
                    });
                    });
                    });
                    });
                    });
            });
                 /* custome date */
            app.post('/from_date_to_expense_01', function(req,res)
            {

               // res.send("hello expenses");
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT expenses.*, expense_category.name FROM expenses INNER JOIN expense_category ON expenses.category_id = expense_category.id WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.description+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            table_data += "<td>"+ row.quantity+ "</td>";
                                            table_data += "<td>"+ row.price+ "</td>";
                                            table_data += "<td>"+ parseFloat(row.price) *  parseFloat(row.quantity)+ "</td>";
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>  </a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                               
                            }
                        });
            });

            app.post('/from_date_to_raw_m_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT * from stack_raw_materials WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.item_name+ "</td>";
                                            table_data += "<td>"+ row.item_type+ "</td>";
                                            table_data += "<td>"+ row.company_name+ "</td>";
                                            table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.bill_no+ "</td>";
                                            table_data += "<td>"+ row.buy_place+ "</td>";
                                            table_data += "<td>"+ row.description+ "</td>";
                                            table_data += "<td>"+ row.price+ "</td>";
                                            table_data += "<td>"+ row.quantity+ "</td>";
                                            table_data += "<td>"+ parseFloat(row.price) *  parseFloat(row.quantity)+ "</td>";
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>  </a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                               
                            }
                        });
            });   

            app.post('/from_date_to_rmf_reg_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                
                        con.query("SELECT * from stack_factory_registration WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){

                            if(rows_04.length > 0)
                            {
                                
                            
                            if(err) 
                            {
                                throw err ;
                            }else{
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.item_name+ "</td>";
                                            table_data += "<td>"+ row.item_type+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            table_data += "<td>"+ row.quantity+ "</td>";
                                            table_data += "<td>"+ row.fixed_price+ "</td>";
                                            
                                            table_data += "<td>"+ row.serial_number+ "</td>";
                                            /* table_data += "<td>"+ row.quantity+ "</td>"; */
                                            // table_data += "<td>"+ parseFloat(row.price) *  parseFloat(row.quantity)+ "</td>";
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><button data-toggle='tooltip' title='حذف' class='edt del' onclick="+"delete1("+row.id+")"+"><img width='15px' src='assets/img/last-project/delete.svg' alt=''>  </button>     <button title='ویرایش' data-toggle='tooltip' onclick="+"update_rmf("+row.id+")"+"  class='edt edit-tbl'><img width='15px' src='assets/img/last-project/edit.svg' alt=''></button></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                               
                            }//else
                        }else{
                            res.send("<h3 style='color:brown;'>موجود نیست</h3>");
                        }
                        });
            });

            app.post('/from_date_to_city_m_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT * from stack_to_market WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{

                                if(rows_04.length > 0)
                                {
                                        var shamsi = [];
                                        for(var i =0;i<rows_04.length;i++)
                                        {
                                        var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                        shamsi += sh + ",";
                                        }
                                        var str_array = shamsi.split(',');
                               
                                        var table_data = "";
                                        var no =0;
                                        rows_04.forEach( (row) => {
                                                    table_data += "<tr id="+"delete_row_"+row.id+">";
                                                    table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                                    table_data += "<td>"+ row.item_name+ "</td>";
                                                    table_data += "<td>"+ row.item_type+ "</td>";
                                                    
                                                    table_data += "<td>"+ row.quantity+ "</td>";
                                                    table_data += "<td>"+ row.fixed_price+ "</td>";
                                                    table_data += "<td>"+ row.sell_price+ "</td>";
                                                    table_data += "<td>"+ parseFloat(row.sell_price) * parseFloat(row.quantity) + "</td>";
                                                    /* table_data += "<td>"+ row.quantity+ "</td>"; */
                                                    // table_data += "<td>"+ parseFloat(row.price) *  parseFloat(row.quantity)+ "</td>";
                                                    table_data += "<td>"+ str_array[no]+ "</td>";
                                                    table_data += "<td><a onclick="+"cat_delet("+row.id+")"+" href='#' style='color:red;'>  </a>     <a onclick="+"cat_edit("+row.id+")"+" href=# style='color:green;'></a></td>";
                                                    table_data += "</tr>";
                                                    no++;
                                            
                                        });
                                         res.send(table_data);
                                    }else{
                                        res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                                    }
                               
                            }
                        });
            });
            
            app.post('/from_date_to_emp_m_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT * from stuff_registration WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.last_name+ "</td>";
                                            
                                            table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.email+ "</td>";
                                            table_data += "<td>"+ row.tazkira+ "</td>";
                                            table_data += "<td>"+ row.address+ "</td>";
                                            table_data += "<td>"+ row.job_place+ "</td>";
                                            table_data += "<td>"+ row.job_type + "</td>";
                                            table_data += "<td>"+ row.salary+ "</td>";
                                            table_data += "<td>"+ row.id_number + "</td>";
                                            table_data += "<td><img src="+ row.image + " style='height:40px; width:40px;'></td>";
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_employees("+row.id+")"+" data-toggle='tooltip' href=# class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                              }else{
                                  res.send("موجود نیست");
                              }
                            }
                        });
            });

            app.post('/from_date_to_emp_removable_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT taken_amount.id as tken_id,taken_amount.amount,taken_amount.currency,taken_amount.ex_rate,taken_amount.date as tkn_date , stuff_registration.* from taken_amount INNER JOIN stuff_registration ON taken_amount.stuff_id = stuff_registration.id WHERE taken_amount.date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.last_name+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.email+ "</td>";
                                            table_data += "<td>"+ row.id_number+ "</td>";
                                            table_data += "<td>"+ row.amount+ "</td>";
                                            
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_employees("+row.id+")"+" data-toggle='tooltip' href=# class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });


            app.post('/from_date_to_emp_salpay_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT stuff_registration.id,stuff_registration.name,stuff_registration.last_name,stuff_registration.salary,payable_amount.* FROM payable_amount INNER JOIN stuff_registration ON payable_amount.stuff_id=stuff_registration.id WHERE payable_amount.date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.last_name+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.salary+ "</td>";
                                            table_data += "<td>"+ row.overtime+ "</td>";
                                            table_data += "<td>"+ row.taken_amount+ "</td>";
                                            table_data += "<td>"+ row.tax+ "</td>";
                                            table_data += "<td>"+ row.payable+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_payable_sal("+row.id+")"+" data-toggle='tooltip' class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });

            app.post('/from_date_to_oloan_reg_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT outgoing_loan.id,outgoing_loan.stuff_id as stf_id,outgoing_loan.company_name,outgoing_loan.amount,outgoing_loan.installment_no,outgoing_loan.currency,outgoing_loan.ex_rate,outgoing_loan.tazkira,outgoing_loan.date,(SELECT COALESCE(SUM(paid), 0)AS total FROM outgoing_loan_list WHERE outgoing_loan_id =outgoing_loan.id) AS totalcount FROM outgoing_loan  WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                
                                
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.company_name+ "</td>";
                                            table_data += "<td>"+ row.company_name+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.amount+ "</td>";
                                            table_data += "<td>"+ row.totalcount+ "</td>";
                                            table_data += "<td>"+ parseFloat(row.amount - row.totalcount)+ "</td>";
                                            
                                           
                                            table_data += "<td>"+ row.installment_no+ "</td>";
                                            table_data += "<td>"+ row.currency + "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>  <a onclick="+"update_payable_sal("+row.id+")"+" data-toggle='tooltip' class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });

            app.post('/from_date_to_iloan_reg_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT *,(SELECT COALESCE(SUM(paid), 0)AS total FROM incoming_loan_list WHERE incoming_loan_id =incoming_loan.id) AS totalcount FROM incoming_loan WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                console.log("SELECT *,(SELECT COALESCE(SUM(paid), 0)AS total FROM incoming_loan_list WHERE incoming_loan_id =incoming_loan.id) AS totalcount FROM incoming_loan WHERE date BETWEEN '"+f_d+"' AND '"+t_d+"'");
                                
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.borrower+ "</td>";
                                            table_data += "<td>"+ row.lender+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.amount+ "</td>";
                                            table_data += "<td>"+ row.installment_no+ "</td>";
                                            table_data += "<td>"+ row.lender_contact+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            table_data += "<td>"+ row.benefit+ "</td>";
                                            table_data += "<td>"+ parseFloat(row.amount + row.benefit) + "</td>";
                                            table_data += "<td>"+ row.totalcount+ "</td>";
                                            table_data += "<td>"+ parseFloat(row.amount + row.benefit - row.totalcount) + "</td>";
                                            table_data += "<td>"+ row.address+ "</td>";
                                            
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td ><a onclick="+"delete1("+row.id+")"+" href='#' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_incom_loan("+row.id+")"+" data-toggle='tooltip' class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });

            app.post('/from_date_to_tools_reg_01', function(req,res)
            {
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("select * from item_registration where machine_life IS  NULL and date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                
                                
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.company_name+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.description+ "</td>";
                                            table_data += "<td>"+ row.quantity+ "</td>";
                                            table_data += "<td>"+ row.purchase_price+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            /* table_data += "<td>"+ row.benefit+ "</td>"; */
                                            
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_payable_sal("+row.id+")"+" data-toggle='tooltip' class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });

            app.post('/from_date_to_tools_reg_02', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
               
                        
                        con.query("SELECT * FROM  item_registration where machine_life IS NOT NULL and date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                
                                
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.company_name+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.description+ "</td>";
                                            table_data += "<td>"+ row.quantity+ "</td>";
                                            table_data += "<td>"+ row.purchase_price+ "</td>";
                                            table_data += "<td>"+ row.machine_life+ "</td>";
                                            table_data += "<td>"+ row.currency+ "</td>";
                                            table_data += "<td>"+ row.ex_rate+ "</td>";
                                            
                                            table_data += "<td>"+ str_array[no]+ "</td>";
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_payable_sal("+row.id+")"+" data-toggle='tooltip' class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='9' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });

            app.post('/from_date_to_cs_reg_01', function(req,res)
            {

               
                var from_date =  req.query.from_date; 
                var to_date =  req.query.to_date;
                var result= [];
                var f_d = moment.from(from_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
                var t_d= moment.from(to_date, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

                
                        
                        con.query("SELECT *,(SELECT round(COALESCE(SUM(total_amount /ex_rate),0),3)AS total FROM froshat_details WHERE cus_id=customer_account.id) AS total_amount ,(SELECT round(COALESCE(SUM(paid_amount/ex_rate),0),3)AS total_paid FROM froshat_details WHERE cus_id=customer_account.id) AS cus_paid FROM customer_account where  date BETWEEN '"+f_d+"' AND '"+t_d+"'",function(err,rows_04){
                            if(err) 
                            {
                                throw err ;
                            }else{
                                
                                
                                if(rows_04.length > 0)
                                {
                                var shamsi = [];
                                for(var i =0;i<rows_04.length;i++)
                                {
                                var sh = moment(rows_04[i].date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
                                shamsi += sh + ",";
                                }
                                var str_array = shamsi.split(',');
                               
                                var table_data = "";
                                var no =0;
                                rows_04.forEach( (row) => {
                                            table_data += "<tr id="+"delete_row_"+row.id+">";
                                            table_data += "<td>"+ parseFloat(no + 1)  + "</td>";
                                            table_data += "<td>"+ row.name+ "</td>";
                                            table_data += "<td>"+ row.last_name+ "</td>";
                                            
                                            // table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.company_name+ "</td>";
                                            table_data += "<td>"+ row.contact+ "</td>";
                                            table_data += "<td>"+ row.address+ "</td>";
                                            
                                            table_data += "<td>"+ row.total_amount+ "</td>";
                                            table_data += "<td>"+ row.cus_paid+ "</td>";
                                            table_data += "<td>"+ parseFloat(row.total_amount - row.cus_paid ) + "</td>";
                                            
                                            /* table_data += "<td>"+ str_array[no]+ "</td>"; */
                                            table_data += "<td><a onclick="+"delete1("+row.id+")"+" href='#'' class='edt del'><img width='15px' src='assets/img/last-project/delete.svg' alt=''> </a>     <a onclick="+"update_payable_sal("+row.id+")"+" data-toggle='tooltip' class='edt edit-tbl'  ><img width='15px' src='assets/img/last-project/edit.svg' alt=''></a></td>";
                                            table_data += "</tr>";
                                            no++;
                                       
                                });
                                res.send(table_data);
                            }else{
                               
                                res.send("<td colspan='12' style='color:red;'>موجود نیست </td>");
                            }
                               
                            }
                        });
            });
          
/* end of custome date */
//notification

//device token
//cfOGs6jfvWo:APA91bHxTRd8LmaME2IxC7v8ZOlQspXUFQ3r8T_VLXx6ILSVdvKdHyZzcPCDvqn68LAufsZ1pekrwKZb2K9QStQUXtueuDW7ytQS50h7cEL88z4AxofyfEufVe4SqcTAPUgR4_TGzjQCYzdqClvtMJUXt4KCmXisYA
function notification1(user_id, msg) {
        var gcm = require('node-gcm');
        var device_token = '';
        var device_type = '';
        var q = "SELECT * from dev_detail where user_id= '1200' ";

        con.query(q, function (err, rows) {
            //console.log(q);
            
         var sender = new gcm.Sender('AIzaSyDTf7B27IwgRCYnvqjrZIrEFQI2zlJPdow');
                var message = new gcm.Message({
                        data: {
                                message: msg
                                //category: cat
        
                        }
                });
                var regTokens = [rows[0].dev_token];
                
            
                  
                sender.send(message, {
                        registrationTokens: regTokens
                }, function (err, response) {
                        if (err) console.error(err);
                        else console.log(response);
                });
        });
}

//ios & android Push-Notifications
function notification(id, msg) {
var gcm = require('node-gcm');
    
var q = "SELECT * from dev_detail where user_id='" + id + "'";
   
con.query(q, function (err, rows)
          {
    for(var i=0;i<rows.length;i++)
        {
if(rows[i].dev_type == 'iOS')
{
 var apn = require('apn');
    var device_token = rows[i].dev_token;
    var options = {
    cert: "Apns.pem",
    key: "keyAPNS.pem", 
    production: false,
    debug : true,
    gateway :'gateway.push.apple.com:2195',
    enhanced : true 
    };
    var apnProvider = new apn.Provider(options);
    var note = new apn.Notification();
    note.expiry = Math.floor(Date.now() / 1000) + 3600; 
    note.badge = 1;// for number of message sent to number of friends
    note.sound = "ping.aiff";   
    note.payload = msg;      
    note.alert = msg;   
    note.topic = "com.maven.development.ManupClub";     
    apnProvider.send(note, device_token).then( function(result)  {
  // see documentation for an explanation of result
     console.log(result);
   });
} if(rows[i].dev_type == 'Android'){
    
        var gcm = require('node-gcm');
        var dev_token = '';
                var sender = new gcm.Sender('AIzaSyDTf7B27IwgRCYnvqjrZIrEFQI2zlJPdow');
                var message = new gcm.Message({
                        data: {
                                message: msg  
                        }});
                var regTokens = [rows[i].dev_token];
                sender.send(message, {
                        registrationTokens: regTokens
                }, function (err, res) {
                        if (err) console.error(err);
                        else console.log(res);
                });
                                          }
        }
        });                    }

        function backup_func(dir_folder,file_name){
            
            var dir_name = dir_folder + file_name;
            const file = new AdmZip();
            file.addLocalFile(dir_name);
            const fs = require('fs');
            
            var just_name_without_extension = file_name.split(".");
            fs.writeFileSync(dir_folder+ '/' + just_name_without_extension[0] +'.zip', file.toBuffer());
            console.log(dir_name);
       
            
        }
// Use Smtp Protocol to send Email
//shell:startup
 
//function for special chars 
function mysql_real_escape_string (str) {
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
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}




//send mail function

/* ALTER TABLE `expense_category` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci */
app.listen(3000,function(){
    console.log('server is running on port 3000');
});

