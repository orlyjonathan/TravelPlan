import { NextFunction } from "express";
import { User } from "../../model/userModel/userModel";

export async function checkUser(req: any, res: any, next: NextFunction) {
    try {
      
        const { userId } = req.cookies;
        console.log(userId);

        const userDB = await User.findById(userId);

        if (!userDB) {
            res.status(401).send({ error: 'User not found' });
            return;
        } 

        req.user = userDB;

        next();

        
       
    } catch (error) {
        console.error(error);
        res.send(error);

    }
}