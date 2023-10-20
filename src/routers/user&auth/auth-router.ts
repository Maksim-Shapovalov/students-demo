import {Request, Response, Router} from "express";
import {serviceUser} from "../../service-rep/service-user";
import {HTTP_STATUS} from "../../index";

export const authRouter = Router()


authRouter.post("/", async (req: Request ,res:Response)=>{
    const user = await serviceUser.checkCredentials(req.body.loginOrEmail, req.body.password)
    // const result = await serviceUser.getNewUser(req.body.login,req.body.email, req.body.password)
    // res.status(HTTP_STATUS.CREATED_201).send(result)
})