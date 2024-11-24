import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'luella22@ethereal.email',
      pass: '9747dg7zwABaWaQBBK'
  }
});

async function malier() {
  const info = await transporter.sendMail({
    from: 'luella22@ethereal.email', // sender address
    to: "natawat.cho@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  })
  console.log("Message sent: %s", info.messageId)
} 

export default malier