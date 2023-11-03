import {Request, Response, Router} from "express";
import {serviceUser} from "../../service-rep/service-user";
import {HTTP_STATUS} from "../../index";
import {jwtService} from "../../application/jwt-service";
import {userMapper} from "../../repository/user-repository";
import {authMiddleware, CheckingauthorizationvalidationCode} from "../../middleware/auth-middleware";
import {authService} from "../../domain/auth-service";

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

authRouter.post("/registration-confirmation",
    CheckingauthorizationvalidationCode,
    async (req: Request ,res:Response) => {
    const result = await authService.confirmatorUser(req.body.code)
        if (!result){
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
})
authRouter.post("/registration", async (req: Request ,res:Response) => {
   const user = await serviceUser.getNewUser(req.body.login,req.body.password, req.body.email)
        await authService.doOperation(user)
    res.send(user)
})
authRouter.post("/registration-email-resending",
    async (req: Request ,res:Response) => {
    const user = await authService.findUserByEmail(req.body.email)
        if (!user) {
            res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
            return
        }
        await authService.doOperation(user)
    res.send(200)
        //ToDo: create service to router

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