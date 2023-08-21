import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionHandle, deleteUserSessionHandle, getUserSessionHandle } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import ProductRouter from "./routes/product.router";
import cors from 'cors'
import validateResource from "./middleware/validateResource";
import { createProductSchema } from "./schema/product.schema";
import { createProductHandler } from "./controllers/product.controller";

export default function routers(app: Express){




    app.get('/api', (req: Request, res: Response) => {
        res.status(200).send("ok")
    })


    app.post("/api/users", validate(createUserSchema), createUserHandler);

    app.post("/api/users/login",validate(createSessionSchema), createSessionHandle);

    app.get("/api/users/session", requireUser, getUserSessionHandle);

    app.delete("/api/users/delete", requireUser, deleteUserSessionHandle);

    // app.post(
    //     "/api/product",
    //     [requireUser, validateResource(createProductSchema)],
    //     createProductHandler
    //   );

    app.use("/api/product", ProductRouter)


    // product



}