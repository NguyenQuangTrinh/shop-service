import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSession, updateSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config'

export async function createSessionHandle(req: Request, res: Response) {

    // validate password
    console.log(req.body)

    const user = await validatePassword(req.body);

    if (!user) return res.status(401).send("Invalid email or password");

    // create session


    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("accesTokenTtl") }
    );

    const refreshToken = signJwt(
        { id: user._id, session: session._id },
        { expiresIn: config.get<string>("refreshTokenTtl") }
    );

    res.cookie('refeshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 1000
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 1000
    });

    return res.status(200).send("success");

}

export async function getUserSessionHandle(req: Request, res: Response){
    const userId = res.locals.user._id;
    const session = await findSession({user: userId, valid: true});

    return res.send(session);
}

export async function deleteUserSessionHandle(req: Request, res: Response){
    const sessionId = res.locals.user.session;


    await updateSession({sessionId});

    return res.send({
        accessToken: null,
        refeshToken: null
    })
}