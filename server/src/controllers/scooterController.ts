import {Request, Response} from 'express';
import {Scooter} from '../models/scooterModel';

export const createScooter = async(req: Request,res: Response): Promise<void> => {
    const scooter = new Scooter(req.body);
    try {
        await scooter.save();
        res.status(201).send(scooter);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getScooters = async(_: Request, res: Response): Promise<void> => {
    try {
        const scooters = await Scooter.find();
        res.status(200).send(scooters);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getScooter = async(req: Request, res: Response): Promise<void> => {
    try {
        const scooter = await Scooter.findById(req.params.id);
        if(!scooter){
            res.status(404).send();
        }
        res.status(200).send(scooter);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateScooter = async(req: Request, res: Response): Promise<void> => {
    try {
        const scooter = await Scooter.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        if(!scooter){
            res.status(404).send();
        }
        res.status(200).send(scooter);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteScooter = async(req: Request, res: Response): Promise<void> => {
    try {
        const scooter = await Scooter.findByIdAndDelete(req.params.id);
        if(!scooter){
            res.status(404).send();
        }
        res.status(200).send(scooter);
    } catch (error) {
        res.status(500).send(error);
    }
}