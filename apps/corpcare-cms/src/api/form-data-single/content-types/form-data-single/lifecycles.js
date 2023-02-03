module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      if (result?.formOrigin === 'contact-us') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Contact Us Form Submitted.',
          text: 'Contact Us Form Submitted.',
          html: 'Contact Us Form Submitted.',
        });
      }
      if (result?.formOrigin === 'partner-with-us') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Partner with Us Form Submitted.',
          text: 'Partner with Us Form Submitted.',
          html: 'Partner with Us Form Submitted.',
        });
      }
      if (result?.formOrigin === 'stay-tuned') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Stay Tuned Form Submitted.',
          text: 'Stay Tuned Form Submitted.',
          html: 'Stay Tuned Form Submitted.',
        });
      }
      if (result?.formOrigin === 'query-support') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Query Support Form Submitted.',
          text: 'Query Support Form Submitted.',
          html: 'Query Support Form Submitted.',
        });
      }
      if (result?.formOrigin === 'webinar-register') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Webinar Register Form Submitted.',
          text: 'Webinar Register Form Submitted.',
          html: 'Webinar Register Form Submitted.',
        });
      }
      if (result?.formOrigin === 'join-us') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Join Us Form Submitted.',
          text: 'Join Us Form Submitted.',
          html: 'Join Us Form Submitted.',
        });
      }
      if (result?.formOrigin === 'request-demo') {
        await strapi.plugins['email'].services.email.send({
          to: result?.data?.email,
          from: process.env['EMAIL_DEFAULT_FROM'], //e.g. single sender verification in SendGrid
          // cc: 'valid email address',
          // bcc: 'valid email address',
          // replyTo: 'valid email address',
          subject: result?.data?.message || 'Request Demo Form Submitted.',
          text: 'Request Demo Form Submitted.',
          html: `<html
          lang="en"
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta name="x-apple-disable-message-reformatting" />
            <title></title>
            <style>
              table,
              td,
              div,
              h1,
              p {
                font-family: Arial, sans-serif;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0">
            <table
              role="presentation"
              style="
                width: 100%;
                border-collapse: collapse;
                border: 0;
                border-spacing: 0;
                background: #ffffff;
              "
            >
              <tr>
                <td align="center" style="padding: 0">
                  <table
                    role="presentation"
                    style="
                      width: 602px;
                      border-collapse: collapse;
                      border: 1px solid #cccccc;
                      border-spacing: 0;
                      text-align: left;
                    "
                  >
                    <tr>
                      <td
                        align="center"
                        style="padding: 40px 0 30px 0; background: #191919"
                      >
                        <img
                        src=https://dev-cms.corpcare.co.in/uploads/Group_241085_1_d7714f5ab2.png?updated_at=2022-10-20T07:06:55.338Z"
                        alt="" width="300" style="height:auto;display:block;" />
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 30px 42px 30px">
                        <table
                          role="presentation"
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            border: 0;
                            border-spacing: 0;
                          "
                        >
                          <tr>
                            <td style="padding: 0 0 36px 0; color: #153643">
                              <h1
                                style="
                                  font-size: 20px;
                                  margin: 0 0 20px 0;
                                  font-family: Arial, sans-serif;
                                "
                              >
                                Dear ${result?.data?.name || 'User'}
                              </h1>
                              <p
                                style="
                                  margin: 0 0 12px 0;
                                  font-size: 16px;
                                  line-height: 24px;
                                  font-family: Arial, sans-serif;
                                "
                              >
                                Thank you for expressing interest in a demo of our
                                product. We are excited to show you what our product can
                                do and how it can benefit your business.
                              </p>
                              <p
                                style="
                                  margin: 0 0 12px 0;
                                  font-size: 16px;
                                  line-height: 24px;
                                  font-family: Arial, sans-serif;
                                "
                              >
                                We have received your request for a demo and our team
                                will be in touch with you shortly to schedule a
                                convenient time. In the meantime, if you have any
                                questions or need further information, please don't
                                hesitate to reach out.
                              </p>
                              <p
                                style="
                                  margin: 0 0 12px 0;
                                  font-size: 16px;
                                  line-height: 24px;
                                  font-family: Arial, sans-serif;
                                "
                              >
                                We look forward to speaking with you and demonstrating
                                the capabilities of our product.
                              </p>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="600"
                                class="mobile"
                                style="margin: 0 auto"
                                align="center"
                              >
                                <tr>
                                  <td>
                                    <table cellpadding="0" cellspacing="0" border="0"
                                    width="100%";">
                                    <tr>
                                      <td style="padding-bottom: 3%; text-align: left">
                                        Name:
                                      </td>
                                      <td style="padding-bottom: 3%; padding-left: 10%">
                                        ${result?.data?.name || 'Not Available'}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-bottom: 3%; text-align: left">
                                        Email:
                                      </td>
                                      <td style="padding-bottom: 3%; padding-left: 10%">
                                        ${
                                          result?.data?.email || 'Not Available'
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-bottom: 3%; text-align: left">
                                        Phone:
                                      </td>
                                      <td style="padding-bottom: 3%; padding-left: 10%">
                                        ${
                                          result?.data?.phone || 'Not Available'
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-bottom: 3%; text-align: left">
                                        Company
                                      </td>
                                      <td style="padding-bottom: 3%; padding-left: 10%">
                                        ${
                                          result?.data?.company ||
                                          'Not Available'
                                        }
                                      </td>
                                    </tr>
                                  </td>
                                </tr>
                              </table>
        
                              <p
                                style="
                                  margin: 0 0 12px 0;
                                  font-size: 16px;
                                  line-height: 24px;
                                  font-family: Arial, sans-serif;
                                "
                              >
                                Sincerely,
                              </p>
                              <p
                                style="
                                  margin: 0;
                                  font-size: 16px;
                                  line-height: 24px;
                                  font-family: Arial, sans-serif;
                                  color: #c5a265;
                                  font-weight: 600;
                                "
                              >
                                Corpcare Team
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
