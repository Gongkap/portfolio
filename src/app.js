const port =process.env.PORT ||3000;

const express =require('express');
const path =require('path');
const hbs =require('hbs')

const config=require('./database/config');
// const UserData =require('./model/user');
const model =require('./model/user');
const collection1 =model.collection1;
const collection2 =model.collection2;

const app =express();


const static_path=path.join(__dirname,'../views');
const partials_path=path.join(__dirname,'../views/partials');

/** note.. while in routing the files.. remember /public means.. it is the ending point. and by giving  public/ means it is the starting point and 
 * and we want to locate something inside it. 
 */
app.set('view engine', 'hbs');
app.set('views',static_path);
app.use('/public',express.static(path.join(__dirname,'../public')));
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
app.use(express.urlencoded({extended:true}));

hbs.registerPartials(partials_path);


app.get('/',(req,res)=>{
    res.render('home.hbs');
})

app.post('/contactData',async(req,res)=>{
    try {
        // console.log(req.body.message)
        // res.render('home');
       const username =req.body.username;
       const useremail =req.body.useremail;
       const message =req.body.message;
    // //    const password =req.body.password;
       const contactsave =new collection1({
        name:username,
        email:useremail,
        message:message

        
       })
       const saveData =await contactsave.save();
       if(saveData){
        res.render('home');
       }
        
    } catch (error) {
        res.status(401).send(error)
        
    }
})
app.post('/register',async(req,res)=>{
    try {
        const username =req.body.name;
        const email =req.body.email;
        const phone =req.body.phone;
        const password =req.body.password;
        const cpassword =req.body.cpassword;
        if(password ===cpassword){
            const Registered =new collection2({
                name:username,
                email:email,
                phone:phone,
                password:password,
                cpassword:cpassword
            })
            const Registereduser =await Registered.save();
            if(Registereduser){
                res.render('home',{username,isLoggedin:true});
            }
            
        }
        else{
            res.send('password mismatch')
        }

    } catch (error) {
        res.status(401).send(error);
    }
})




app.listen(port,()=>{
    console.log('listening on the port '+port);
})