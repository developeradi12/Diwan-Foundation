import nodemailer from "nodemailer"

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT),
    secure: false,        
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.verify()
  console.log("SMTP connected ")

  const info = await transporter.sendMail({
    from:    `"Your NGO Name" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })

  console.log("Email sent ", info.messageId)
}