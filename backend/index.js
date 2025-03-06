const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arunansha2003@gmail.com',
        pass: 'bapqckjlcikzadme'
    }
});

const app = express();
const mongodbUrl = 'mongodb+srv://arunansha2003:a123456k@cluster0.xrvowrs.mongodb.net/'
mongoose.connect(mongodbUrl);
const database = mongoose.connection;
app.use(cors({
    origin: "*"
}))

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());
const Donor = require('./donor')

app.use(express.json());
const User = require('./user')

app.use(express.json());
const Admin = require('./admin')

app.use(express.json());
const Donate = require('./donate')

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    // Store hash in the database
    return hash;
}

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

//Post Method
app.get('/', (req, res) => {

    res.send('welcome in mern')
})
app.get('/about', (req, res) => {

    res.send('about mern')
})

// Define a route to handle sending emails
app.post('/checkRequest', async (req, res) => {
    try {
        const data = await Donate.find({ "userid": req.body.userid, "donorid": req.body.donorid, "donatedate": req.body.donatedate });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post('/send-email', async (req, res) => {
    // Define email options

    const otp = req.body.otp;

    const response = await User.find({ email: req.body.email })

    if (response.length > 0) {
        //const data = await User.find({ email: req.body.email });
        //const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)

        const mailOptions = {
            from: 'arunansha2003@gmail.com',
            to: req.body.email,
            subject: 'Password sent By Blood Donation App.',
            //text: 'Hello' + data[0].name + ',Your password is' + data[0].password
            text: 'Your One Time Password(OTP) is :' + otp
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                res.send('Email sent successfully');
            }
        });
    }
    else {
        res.send('Invalid email');
    }
});

//Post Method
app.post('/requestblood', async (req, res) => {

    // console.log(97, hpass)

    const data = new Donate({
        userid: req.body.userid,
        donorid: req.body.donorid,
        donatedate: req.body.donatedate,
        status: 'pending'
    })
    try {
        const response = await data.save();
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.post('/registerDonor', async (req, res) => {

    const password = req.body.password

    const hpass = await hashPassword(password)

    console.log(97, hpass)

    const data = new Donor({
        name: req.body.name,
        email: req.body.email,
        password: hpass,
        address: req.body.address,
        contact: req.body.contact,
        bloodgroup: req.body.bloodgroup,
        gender: req.body.gender,
        dob: req.body.dob
    })
    try {
        const response = await data.save();
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.post('/registerUser', async (req, res) => {

    const password = req.body.password

    const hpass = await hashPassword(password)

    const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: hpass,
        address: req.body.address,
        contact: req.body.contact,
        bloodgroup: req.body.bloodgroup,
        gender: req.body.gender,
        dob: req.body.dob
    })
    try {
        const response = await data.save();
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post('/registerAdmin', async (req, res) => {

    const password = req.body.password

    const hpass = await hashPassword(password)

    const data = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hpass,
        address: req.body.address,
        contact: req.body.contact,
        gender: req.body.gender,
        dob: req.body.dob
    })
    try {
        const response = await data.save();
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.post('/addRequest', async (req, res) => {

    const data = new Donate({

        userid: req.body.userid,
        donorid: req.body.donorid,
        donatedate: req.body.donatedate,
        status: "pending"
    })
    try {
        const response = await data.save();
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Post Method
app.post('/loginDonor', async (req, res) => {

    const password = req.body.password

    const res1 = await Donor.find({ email: req.body.email })
    if (res1.length > 0) {
        const hpass = res1[0].password

        const result = await comparePassword(password, hpass)

        console.log(145, result)

        if (result) {
            res.send({ 'message': true })
        }
        else {
            res.send({ 'message': false })
        }


    } else {
        res.send({ 'message': false })
    }

})

app.post('/loginUser', async (req, res) => {
    const password = req.body.password

    const res1 = await User.find({ email: req.body.email })
    if (res1.length > 0) {
        const hpass = res1[0].password

        const result = await comparePassword(password, hpass)

        console.log(145, result)

        if (result) {
            res.send({ 'message': true })
        }
        else {
            res.send({ 'message': false })
        }

    }
    else {
        res.send({ 'message': false })

    }

})

app.post('/loginAdmin', async (req, res) => {

    const password = req.body.password

    const res1 = await Admin.find({ email: req.body.email })
    if (res1.length > 0) {
        const hpass = res1[0].password

        const result = await comparePassword(password, hpass)

        console.log(145, result)

        if (result) {
            res.send({ 'message': true })
        }
        else {
            res.send({ 'message': false })
        }


    } else {
        res.send({ 'message': false })
    }

})

app.post('/searchboth', async (req, res,) => {

    try {
        const data = await Donor.find({ address: { $regex: req.body.address }, "bloodgroup": req.body.bloodgroup, "status": "active" });

        var tempArr = []
        if (data) {

            for (let i = 0; i < data.length; i++) {
                const lastdonateddate = data[i].lastdonateddate; // Assuming format is y/m/d (e.g., '2025/02/19')

                if (lastdonateddate == "") {
                    tempArr.push(data[i])
                }
                else {
                    const today = new Date();
                    const currentdate = today.toISOString().split('T')[0].replace(/-/g, '/'); // current date in y/m/d format
                    console.log(lastdonateddate);
                    console.log(currentdate)

                    const date1 = new Date(lastdonateddate);
                    const date2 = new Date(currentdate);

                    // Calculate the difference in milliseconds
                    const diffInMs = (date2 - date1);

                    // Convert milliseconds to days
                    const diffInDays = parseInt(diffInMs / (1000 * 60 * 60 * 24));

                    //console.log(diffInDays); // Output: 41

                    if (diffInDays > 90) {
                        tempArr.push(data[i])
                    }
                }


            }
        }

        res.json(tempArr)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post('/searchbothuser', async (req, res) => {

    try {
        const data = await User.find({ address: { $regex: req.body.address }, "bloodgroup": req.body.bloodgroup });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post('/validateEmailUser', async (req, res) => {

    try {
        const data = await User.find({ "email": req.body.email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post('/validateEmailDonor', async (req, res) => {

    try {
        const data = await Donor.find({ "email": req.body.email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//Get all Method

app.get('/getAllRequestByDonorId/:id', async (req, res) => {


    try {
        const donorid = req.params.id;
        console.log(donorid)
        const data = await Donate.find({ "donorid": donorid });
        const temp = [];

        for (let i = 0; i < data.length; i++) {
            let userid = data[i].userid;

            const data1 = await User.find({ email: userid });

            const userdetails = data1[0];

            if (userdetails) {
                const userObject = userdetails.toObject(); // Convert Mongoose document to plain object
                userObject.reqid = data[i]._id; // Add request ID
                userObject.donatedate = data[i].donatedate; // Add request ID
                userObject.status = data[i].status; // Add request ID
                temp.push(userObject); // Add modified user details to temp array
            }

        }

        res.json(temp);
    } catch (error) {
        console.error("Error in getRequestbydonorId:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }


});

app.get('/getAllDonors', async (req, res) => {
    try {
        const data = await Donor.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/getAllUsers', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/SearchbyBloodgroup/:bloodgroup', async (req, res) => {
    try {
        const data = await Donor.find({ "bloodgroup": req.params.bloodgroup });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})


app.get('/search/:address', async (req, res) => {
    try {
        const data = await Donor.find({ "address": req.params.address });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.get('/searchbyaddress/:address', async (req, res) => {
    const address = req.params.address
    try {
        const data = await Donor.find({ address: { $regex: address } }); //regex jekono key theke find korbe 
        //onno kichu die search korte hole regex er por seta likhte hobe
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//Get by ID Method
app.get('/getUsersByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email
        const data = await User.find({ "email": email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/getDonorsByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email
        const data = await Donor.find({ "email": email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/getDonorsbyId/:id', async (req, res) => {
    try {
        const data = await Donor.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/getUsersbyId/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method

app.patch('/updateStatus/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        if (req.body.status === "Accept") {
            const options = { new: true };

            const result = await Donate.findByIdAndUpdate(
                id, updatedData, options
            )

            const details = await Donate.findById(id)
            const donoremail = details.donorid
            const data11 = await Donor.find({ 'email': donoremail })
            const donatedate = details.donatedate
            const donorid = data11[0]._id

            const options1 = { new: true };
            const updatedData1 = { 'lastdonateddate': donatedate }
            const result1 = await Donor.findByIdAndUpdate(
                donorid, updatedData1, options1
            )

            res.send(result)

        }
        else {
            const data = await Donate.findByIdAndDelete(id)
            res.send(`Document with has been deleted..`)
        }

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.patch('/updateDonorimage/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Donor.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.patch('/updateDonor/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Donor.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.patch('/updateUser/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/updateRequest/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Donate.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/updateUserByEmail/:email', async (req, res) => {
    const password = req.body.password

    const hpass = await hashPassword(password)

    console.log(97, hpass)
    try {
        const data = await User.find({ "email": req.params.email })
        const id = data[0]._id
        const updatedData = req.body;
        req.body.password = hpass
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.patch('/updateDonorByEmail/:email', async (req, res) => {
    const password = req.body.password //body theke password ta tolar jonno

    const hpass = await hashPassword(password) //hash function er je result return korbe seta hpass e store korbe

    try {
        const data = await Donor.find({ "email": req.params.email })
        const id = data[0]._id
        const updatedData = req.body;
        req.body.password = hpass
        const options = { new: true };

        const result = await Donor.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method

app.delete('/deleteDonor/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Donor.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// The default route for all other paths
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});


app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})

//ekhane api create hoeche database er sathe kotha bolar jonno
//patch-update korar jonno   //eita params mane link theke nay
//post-register korar jonno    //eita body theke nay
//get-information get korar jonno  //eitao params link theke nay