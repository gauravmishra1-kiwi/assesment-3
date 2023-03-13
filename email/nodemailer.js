const nodemailer = require("nodemailer")


const transpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port :587,
    secure : false,
    requireTLS: true,
    auth:{
        user:'gaurav.mishra1@kiwitech.com',
        pass:"asbxpbjfwoycnndg"
    }
});

const subscribeEmail = function(email, train, user){
    let mailOptions = {
        from : 'gaurav.mishra1@kiwitech.com',
        to : email,
        subject : 'you have subscribed a train',
        html : `<h2> hello, Mr ${user.name}
         <br> Your subscription for  ${train.trainName}
          and the no is ${train.trainNo}. now, you will get stations updates </h2>`
    };

    transpoter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error)
        }else{
            console.log('Subscribe email sent');
        }
    })
}


const updatesubscriber = function (email, train, user){
    let mailOptions = {
        from : 'gaurav.mishra1@kiwitech.com',
        to : email,
        subject : 'Hey! Station update',
        html : `<h2>hello Mr. ${user.name}
         <br> Your subscription for  ${train.trainName}
         and the no is ${train.trainNo}.
          you has been reached ${train.ArrivedStation}
            station.</h2>`
    };

    transpoter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error)
        }else{
            console.log('Subscribe email sent');
        }
    })
}

module.exports ={
    subscribeEmail, updatesubscriber
}