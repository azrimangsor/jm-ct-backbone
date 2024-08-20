import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    username: process.env.LCH_USERNAME || '',
    password: process.env.LCH_PASSWORD || '',
    usernameFT: process.env.FT_USERNAME || '',
    passwordFT: process.env.FT_PASSWORD || ''
};