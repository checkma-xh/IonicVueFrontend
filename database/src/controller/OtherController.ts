import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PriorityInfo } from "../entity/PriorityInfo";
import { RepeatInfo } from "../entity/RepeatInfo";
import { tokenVerify } from "../utils/tokenVerify";

export class OtherController {
    private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
    private RepeatInfoRepository = AppDataSource.getRepository(RepeatInfo);

    async getPriorities(request: Request, response: Response, next: NextFunction) {
        const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
        if (!decodeToken) {
            response.status(404).json({ message: "no permission" });
            return;
        }
        const priorities = await this.PriorityInfoRepository.find();
        if (!priorities) {
            response.status(404).json({ message: "priorities information not found" });
            return;
        }
        response.json(priorities);
    }

    async getRepeats(request: Request, response: Response, next: NextFunction) {
        const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
        if (!decodeToken) {
            response.status(404).json({ message: "no permission" });
            return;
        }
        const repeats = await this.RepeatInfoRepository.find();
        if (!repeats) {
            response.status(404).json({ message: "repeats information not found" });
            return;
        }
        response.json(repeats);
    }
}
