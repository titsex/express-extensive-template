import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { createTransport, Transporter } from 'nodemailer'

export class MailService {
    private static transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
        host: process.env.EMAIL_SMTP,
        secure: true,
        port: +process.env.EMAIL_PORT!,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    public static async sendActivationMail(to: string, hex: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: `Активация аккаунта`,
            text: '',
            html: `
                    <div class='container'>
                        <h1>Для активации аккаунта, нажмите кнопку ниже</h1>
                        <a href='${process.env.CLIENT_URL!}/activate/${to}/${hex}'>Активировать</a>
                    </div>
                  `,
        })
    }
}
