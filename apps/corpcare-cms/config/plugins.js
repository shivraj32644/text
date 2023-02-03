module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET_NAME'),
        },
      },
      // These parameters could solve issues with ACL public-read access — see [this issue](https://github.com/strapi/strapi/issues/5868) for details
      actionOptions: {
        upload: {
          ACL: null,
        },
        uploadStream: {
          ACL: null,
        },
      },
    },
  },
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: `email-smtp.${env('AWS_REGION')}.amazonaws.com`, //SMTP Host
        port: env('SMTP_PORT'), //SMTP Port
        secure: true,
        username: env('SMTP_USERNAME'),
        password: env('SMTP_PASSWORD'),
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        defaultReplyTo: env('EMAIL_DEFAULT_FROM_REPLY_TO'),
      },
    },
  },
});
