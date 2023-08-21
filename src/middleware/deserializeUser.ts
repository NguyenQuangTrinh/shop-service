import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserilizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refeshToken = get(req, "headers.x-refesh");

    if(!accessToken) return next();

    const {decoded, expired} = verifyJwt(accessToken);



    if(decoded){
        res.locals.user = decoded;
        return next();
    }

    if(expired && refeshToken){
        let refreshToken = String(refeshToken);
        const newAccessToken = await reIssueAccessToken({refreshToken});
        if(newAccessToken){
            res.setHeader('x-access-token', newAccessToken);
        }
        const result = verifyJwt(String(newAccessToken));
        
        res.locals.user =  result.decoded
        return next();
    }

}

export default deserilizeUser;