import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { PriorityInfo } from "../entity/PriorityInfo";
import { RepeatInfo } from "../entity/RepeatInfo";
import { tokenVerify } from "../utils/tokenVerify";

export class OtherController {
    private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
    private RepeatInfoRepository = AppDataSource.getRepository(RepeatInfo);

    async getPriorities(request: Request, response: Response, next: NextFunction) {
        try {
            const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
            if (!decodeToken) {
                throw new Error("Invalid token.");
            }

            const priorities = await this.PriorityInfoRepository.find();

            return priorities;
        } catch (error) {
            const errorMessage = error.message || "An unexpected error occurred.";
            return { status: "error", message: errorMessage };
        }
    }


    async getRepeats(request: Request, response: Response, next: NextFunction) {
        try {
            const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
            if (!decodeToken) {
                throw new Error("Invalid token.");
            }

            const repeats = await this.RepeatInfoRepository.find();

            return repeats;
        } catch (error) {
            const errorMessage = error.message || "An unexpected error occurred.";
            return { status: "error", message: errorMessage };
        }
    }
}
