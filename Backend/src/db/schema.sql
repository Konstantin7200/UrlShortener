CREATE TABLE IF NOT EXISTS public."Urls" (
    id SERIAL PRIMARY KEY,
    "baseUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "statisticsUrl" TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public."Visitors" (
    id SERIAL PRIMARY KEY,
    "urlId" INTEGER NOT NULL REFERENCES public."Urls"(id) ON DELETE CASCADE,
    "visitingDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ip" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "browserVersion" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "os" TEXT NOT NULL
);