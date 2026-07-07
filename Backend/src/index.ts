import app from "./app";
import { urlRepository } from "./repositories/urlRepository";
import "./routes/urlRoutes"
urlRepository.getLongUrl("")

app.listen(3000)
