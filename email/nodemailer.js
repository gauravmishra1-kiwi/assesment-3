const nodemailer=require("nodemailer")

const msg={
    from:'gaurav.mishra1@kiwitech.com',
    to:'ram.sharma@kiwitech.com',
    subject:"Train Running status",
    text :"nodemailer runs with attachment",
    // html:'<b>node mailer task done</b><br/><img src="cid:images"/>',
    attachments:[{
        filename:'images.jpeg',
        path:__dirname+'/upload/images.jpeg',
        cid:"images"
       
    }]
}

nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:465,
    requireTLS:true,
    auth:{
        user:'gaurav.mishra1@kiwitech.com',
        pass:"rmuscfrnksqdflga"
    }
})

.sendMail(msg,(error)=>{
    if (error) {
        console.log("error occuer",error);
    }
    else{
        console.log("email has been send");
    }
})

