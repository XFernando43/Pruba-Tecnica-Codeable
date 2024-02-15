import "dotenv/config";
import { app } from "./app";
const port = process.env["PORT"]

app.listen(port, () => {console.log(`Servidor escuchando en el puerto ${port}`);});


