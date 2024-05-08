import { Request, Response } from 'express';
import { Account } from '../models/accountModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}



export const getMyData = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.userId;
    console.log(`*** userId ${userId}`)
    if (!userId) {
        res.status(401).json({
            message: 'Unautorized!'
        })
    }
    const account = await Account.findById(userId)
    if (!account) {
        res.status(401).json({
            message: 'Account does not exist!'
        })
    }
    res.status(200).json({
        message: account
    })
}

export const login = async (req: Request, res: Response): Promise<void> => {
    // get data
    const { email, password } = req.body;
    // find in db
    const isAccount = await Account.findOne({ email: email });
    if (!isAccount) {
        res.status(401).json({
            message: 'Account is not exist'
        })
    }
    // check confirm
    // check password
    const isMatch = await bcryptjs.compare(password, isAccount?.password || "");
    if (!isMatch) {
        res.status(401).json({
            message: 'Password not match'
        })
    }
    // create token
    const token = jwt.sign({ userId: isAccount?._id }, 'YX48WVG6lFU6d6FOkpcbzBWRdju1C7W5V4MBE5z6JE9yHGFd0btZGXagOCZ2Dksc');
    res.status(200).json({ message: token })
}

export const register = async (req: Request, res: Response): Promise<void> => {

    const account = req.body;
    console.log(account)

    const isAccount = await Account.findOne({ email: account.email });
    console.log(isAccount)
    if (isAccount) {
        res.status(400).json({
            message: 'Account is not available'
        })
    } else {
        const hash = await bcryptjs.hash(account.password, 10);
        const new_account = new Account({
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            password: hash,
            verifyCode: getRandomInt(1000, 9999),
            location: {
                lat: account.location.lat,
                long: account.location.long
            },
        })
        new_account.save()
            .then(account_created => {
                res.status(201).json({
                    mesaage: account_created
                })
            })
            .catch(error => {
                res.status(500).json({
                    mesaage: error
                })
            })
    }
}