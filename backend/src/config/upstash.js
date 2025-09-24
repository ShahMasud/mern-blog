import pkg from "@upstash/ratelimit";
const { Ratelimit } = pkg;

import { Redis } from "@upstash/redis"

import dotenv from "dotenv"

dotenv.config();

// create a limiter that allows 10 requests per 20 seconds 
const rateLimit = new Ratelimit ({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10, "20 s"),
});

export default rateLimit;