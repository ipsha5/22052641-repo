import { Request, Response, NextFunction } from 'express';

export const getNumbers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const numberId = req.params.numberid;
    res.json({ message: `Received number ID: ${numberId}` });
  } catch (error) {
    next(error);
  }
};

export const calculateAverage = async (req: Request, res: Response): Promise<void> => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers) || numbers.length === 0 || numbers.some(isNaN)) {
        res.status(400).json({ error: "Invalid input. Please enter valid numbers." });
        return;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / numbers.length;

    res.json({ average: avg });
};