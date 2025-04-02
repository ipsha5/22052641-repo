import { Router } from 'express';
import { getNumbers, calculateAverage } from '../controllers/numberController';

const router = Router();

router.get('/:numberid', getNumbers);

router.post("/calculate-average", calculateAverage);

export default router;
