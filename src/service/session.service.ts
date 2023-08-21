import { FilterQuery } from "mongoose";
import {get} from 'lodash';
import config from 'config';
import SessionModel, { SchemaDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent});

    return session.toJSON();
}

export async function findSession(query: FilterQuery<SchemaDocument>){
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SchemaDocument>){
    return SessionModel.deleteOne(query);
}

export async function reIssueAccessToken({refreshToken}: {refreshToken: string}){
    const {decoded} = verifyJwt(refreshToken);

    if(!decoded || !get(decoded, 'session')) return false;
    const session = await SessionModel.findById(get(decoded, 'session'))
    console.log(session)

    if(!session || !session.valid) return false;

    const user = await findUser({_id: session.user});

    if(!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("accesTokenTtl") }
    );

    return accessToken;
}