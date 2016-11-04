/**
 * CalculatorRouter class
 */

import { Router, Request, Response } from 'express';
import { Calculator } from './../Modules/Calc';

export class CalculatorRouter {
    private router: Router = Router();

    getRouter(): Router {

        this.router.post('/sum', async (request: Request, response: Response) => {
            var x = request.body.x;
            var y = request.body.y;
            var calc: Calculator = new Calculator();
            var sum = calc.add(x, y);
            response.statusCode = 200;
            response.json({ 'sum': sum });
        });

        return this.router;

    }
}

