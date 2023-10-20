import {Response, Request, Router} from "express";
import {searchLogAndEmailInUsers} from "../../repository/qurey-repo/query-filter";
import {userRepository} from "../../repository/user-repository";
import {serviceUser} from "../../service-rep/service-user";
import {HTTP_STATUS} from "../../index";
import {UserValidation} from "../../middleware/input-middleware/user-validation";
import {authGuardMiddleware} from "../../middleware/register-middleware";


export const userRouter = Router()

userRouter.get("/", async (res: Response, req: Request) => {
    const filter = searchLogAndEmailInUsers(req.query)
    const result = await userRepository.getAllUsers(filter)
    res.send(result)
})
userRouter.post("/",
    authGuardMiddleware,
    UserValidation(),
    async (res: Response, req: Request)=> {
    const {login, password, email} = req.body
    const result = await serviceUser.getNewUser(login, password, email)
    res.status(HTTP_STATUS.CREATED_201).send(result)
})
userRouter.delete("/:id",
    authGuardMiddleware,
    async (res: Response, req: Request)=> {
    const deletedUs = await serviceUser.deleteUserById(req.params.id)
    if (!deletedUs){
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
        return
    }
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204)

})