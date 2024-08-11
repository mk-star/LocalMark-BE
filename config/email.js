import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
