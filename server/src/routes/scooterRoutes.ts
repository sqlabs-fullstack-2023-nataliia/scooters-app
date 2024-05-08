import express from 'express';
import {
    getScooter,
    getScooters,
    createScooter,
    updateScooter,
    deleteScooter
} from '../controllers/scooterController';
const router = express.Router();

router.get('/', getScooters);
router.get('/:id', getScooter);
router.post('/', createScooter);
router.delete('/:id', deleteScooter);
router.patch('/:id', updateScooter);

export default router;