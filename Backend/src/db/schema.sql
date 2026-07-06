CREATE TABLE IF NOT EXISTS public."Urls"
(
    id SERIAL PRIMARY KEY,
    "baseUrl" text COLLATE pg_catalog."default" NOT NULL,
    "shortUrl" text COLLATE pg_catalog."default" NOT NULL UNIQUE,
    "statisticsUrl" text COLLATE pg_catalog."default" NOT NULL
);
