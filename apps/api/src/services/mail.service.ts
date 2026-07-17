import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.legislaturacaba.ar',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true para 465, false para otros
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Útil para servidores institucionales con certificados propios
      },
    });
  }

  /**
   * Envía un correo electrónico utilizando un template HTML
   * @param to Destinatario
   * @param subject Asunto
   * @param templateName Nombre del archivo en src/templates/mails (ej: 'gacetilla.html')
   * @param data Objeto con las variables a reemplazar en el template
   */
  public async sendWithTemplate(
    to: string,
    subject: string,
    templateName: string,
    data: Record<string, string>,
  ) {
    try {
      const templatePath = path.join(__dirname, '../templates/mails', templateName);
      let html = fs.readFileSync(templatePath, 'utf8');

      // Reemplazo simple de variables {{variable}}
      // Usa una función de reemplazo para evitar que JS interprete $&, $1, $`, $' del HTML del valor
      Object.keys(data).forEach((key) => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        const value = data[key] ?? '';
        html = html.replace(regex, () => value);
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[MAIL] Enviado a ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('[MAIL] Error enviando correo:', error);
      throw error;
    }
  }

  /**
   * Envía un correo electrónico simple (texto o HTML directo)
   */
  public async sendDirect(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('[MAIL] Error enviando correo directo:', error);
      throw error;
    }
  }
}

export default new MailService();
