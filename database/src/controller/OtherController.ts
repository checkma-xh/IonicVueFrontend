import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PriorityInfo } from "../entity/PriorityInfo";
import { RepeatInfo } from "../entity/RepeatInfo";
import { tokenVerify } from "../utils/useVerifyTool";

export class OtherController {
    private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
    private RepeatInfoRepository = AppDataSource.getRepository(RepeatInfo);

    async getPriorities(request: Request, response: Response, next: NextFunction) {
        const decodeToken = await tokenVerify(request.headers?.authorization.split(" ")[1]);
        if (!decodeToken) {
            return response.status(400).json({ message: "bad request" });
        }

        const priorities = await this.PriorityInfoRepository.find();

        return response.status(200).json({ priorities: priorities, message: "get successful" });
    }


    async getRepeats(request: Request, response: Response, next: NextFunction) {
        const decodeToken = await tokenVerify(request.headers?.authorization.split(" ")[1]);
        if (!decodeToken) {
            return response.status(400).json({ message: "bad request" });
        }

        const repeats = await this.RepeatInfoRepository.find();

        return response.status(200).json({ repeats: repeats, message: "get successful" });
    }
}
