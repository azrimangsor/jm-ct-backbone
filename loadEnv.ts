// loadEnv.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: resolve(__dirname, envFile) });

console.log(`Loaded environment variables from ${envFile}`);
console.log(`URL : ${process.env.EFUEL_URL}`)
console.log(`URL : ${process.env.FT_DCF_URL}`)
console.log(`URL : ${process.env.LCH_DCF_URL}`)
console.log(`URL : ${process.env.LCH_GIT_URL}`)
console.log(`URL : ${process.env.BLUEHYDROGEN_URL}`)