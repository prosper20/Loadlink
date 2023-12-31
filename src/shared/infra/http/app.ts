import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { v1Router } from "./api/v1";
import { isProduction, PORT } from "../../../config";
import * as path from "path";

const origin = {
  // origin: isProduction ? 'https://loadlink.com' : '*',
  origin: "*",
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "../../../../public/app")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../../public/app/index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../../public/app/about.html"));
});

app.use("/api/v1", v1Router);

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});
