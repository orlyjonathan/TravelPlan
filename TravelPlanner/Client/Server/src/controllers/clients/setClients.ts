import User from '../../model/userModel/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
const saltRounds = 10 ;
console.log(saltRounds)


export const secret = process.env.SECRET_JWT || "secret"

export async function addClient(req: any, res: any) {
    try {
        const {
            firstName,
            lastName,
            password,
            email,
            userId
        } = req.body;

        const result = await User.create({
            firstName,
            lastName,
            password,
            email,
            userId
        })
        console.log(result)
        if (!result) {
            return res.status(400).send({ error: "Couldn't create new user" })
        }

        return res.status(201).send({ message: "Client created successfully" })


    } catch (error: any) {
        console.error(error)
        return res.status(500).send({ error: error.message })
    }
}
    
export async function register(req: any, res: any) {
    try {
        const { firstName,lastName, email, password } = req.body;

        if (!firstName ||!lastName|| !email || !password ) {
            throw new Error('Please fill all fields');
        }

        //hash password
        const hashedPassword = bcrypt.hashSync(password, saltRounds);


        //send request to DB
        await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })

        console.log("Received password:", password, hashedPassword);
        return res.status(201).send({ message: "User registered successfully" });
       

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}

export async function login(req: any, res: any) {
    try {
        const { firstName,email, password } = req.body;

        if (!email || !password) throw new Error("Please fill all fields");

        const user = await User.findOne({ email});
        if (!user) {
            return res.status(400).send({ error: "Invalid email or password" });
        }

        if (!user.password) throw new Error("Invalid email or password");

        console.log(password, user.password);
        //compare password

        const match = bcrypt.compareSync(password, user.password);
        console.log("is match", match)

        if (!match) {
            return res.status(400).send({ error: "Invalid email or password" });
        }




        const token = jwt.encode({ id: user._id, role: "user" }, secret);

        res.cookie('user', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(200).send({ message: "Login successful" });

    } catch (error: any) {
        if (error.code === "11000") {
            res.status(400).send({ error: "user already exists" })
        }
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}