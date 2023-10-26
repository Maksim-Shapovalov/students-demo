import {Request, Response, Router} from "express";
import {serviceUser} from "../../service-rep/service-user";
import {HTTP_STATUS} from "../../index";
import {jwtService} from "../../application/jwt-service";
import {userMapper} from "../../repository/user-repository";
import {authMiddleware} from "../../middleware/auth-middleware";

export const authRouter = Router()


authRouter.post("/login", async (req: Request ,res:Response)=>{
    const user = await serviceUser.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (!user){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }
    const token = await jwtService.createdJWT(userMapper(user))
    res.status(HTTP_STATUS.OK_200).send({accessToken:token})
})

authRouter.post("/login", async (req: Request ,res:Response)=>{
    const user = await serviceUser.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (!user){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }
    const token = await jwtService.createdJWT(userMapper(user))

    res.status(HTTP_STATUS.OK_200).send({accessToken:token})
})
authRouter.get("/me",
    authMiddleware ,
    async (req: Request ,res:Response)=> {
    const user = await serviceUser.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (!user){
        res.sendStatus(HTTP_STATUS.UNAUTHORIZED_401)
        return
    }
    res.status(HTTP_STATUS.OK_200).send({
        email: user.email,
        login: user.login,
        userId: user._id.toString()
    })
})