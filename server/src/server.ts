import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port = 5000;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: "World" });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
