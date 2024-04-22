import nodemailer, { Transporter } from 'nodemailer';
import { envs } from '../../../config';


  
export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailServiceDoc {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: envs.MAILER_SERVICE,
      auth: {
        user: envs.MAILER_EMAIL,
        pass: envs.MAILER_SECRET_KEY,
      },
    });
  }

  async sendFinancialDocuments(to: string | string[], attachments: Attachment[]): Promise<boolean> {
    const subject = 'Sus Documentos Financieros';
    const htmlBody = '<h1>Documentos Financieros Importantes</h1><p>Adjunto encontrará sus documentos financieros.</p>';

    try {
      if (!envs.SEND_EMAIL) return false;

      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      console.log('Documentos financieros enviados correctamente.');
      return true;
    } catch (error) {
      console.error('Error al enviar los documentos financieros:', error);
      return false;
    }
  }
}
