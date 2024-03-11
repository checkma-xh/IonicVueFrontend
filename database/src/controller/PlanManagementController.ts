import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserInfo } from "../entity/UserInfo";
import { GroupInfo } from "../entity/GroupInfo";
import { PriorityInfo } from "../entity/PriorityInfo";
import { PlanInfo } from "../entity/PlanInfo";
import { tokenVerify } from "../utils/useVerifyTool";
import type { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "../utils/ConfigService";
import { RepeatInfo } from "../entity/RepeatInfo";

const config = ConfigService.getConfig();

export class PlanManagementController {
	private UserInfoRepository = AppDataSource.getRepository(UserInfo);
	private GroupInfoRepository = AppDataSource.getRepository(GroupInfo);
	private PriorityInfoRepository = AppDataSource.getRepository(PriorityInfo);
	private PlanInfoRepository = AppDataSource.getRepository(PlanInfo);
	private RepeatInfoRepository = AppDataSource.getRepository(RepeatInfo);

	async createPlan(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { name, remark, startDate, endDate, groupName, priorityName, repeatName } = request.body;
			const group = await this.GroupInfoRepository.findOneBy({ name: groupName });
			const priority = await this.PriorityInfoRepository.findOneBy({ name: priorityName });
			const repeat = await this.RepeatInfoRepository.findOneBy({ name: repeatName });
			const user = await this.UserInfoRepository
				.createQueryBuilder("user")
				.innerJoinAndSelect("user.plans", "plans ")
				.where("user.id = :id", { id: (decodeToken as JwtPayload).id })
				.getOne();

			const plan = new PlanInfo();
			plan.name = name;
			plan.remark = remark;
			plan.startDate = new Date(startDate as string);
			plan.endDate = new Date(endDate as string);
			plan.user = user;
			plan.group = group;
			plan.priority = priority;
			plan.repeat = repeat;
			user.plans.push(plan);
			await this.UserInfoRepository.save(user);

			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async getPlan(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { userId, planId } = request.params;
			const plan = await this.PlanInfoRepository
				.createQueryBuilder("plan")
				.innerJoinAndSelect("plan.user", "user")
				.where("user.id = :userId AND plan.id = :planId", { userId: (decodeToken as JwtPayload).id, planId: planId })
				.getOne();

			return plan;
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async completePlan(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { userId, planId } = request.params;
			const plan = await this.PlanInfoRepository
				.createQueryBuilder("plan")
				.innerJoinAndSelect("plan.user", "user")
				.where("user.id = :userId AND plan.id = :planId", { userId: (decodeToken as JwtPayload).id, planId: planId })
				.getOne();

			plan.completed = true;
			await this.PlanInfoRepository.save(plan);
			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async deletePlan(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { userId, planId } = request.params;
			const plan = await this.PlanInfoRepository
				.createQueryBuilder("plan")
				.innerJoinAndSelect("plan.user", "user")
				.where("user.id = :userId AND plan.id = :planId", { userId: (decodeToken as JwtPayload).id, planId: planId })
				.getOne();

			if (plan.deleted) {
				await this.PlanInfoRepository.delete(plan);
			} else {
				plan.deleted = true;
				await this.PlanInfoRepository.save(plan);
			}
			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}

	
	async setPlan(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { name, remark, startDate, endDate, groupName, priorityName, repeatName } = request.body;
			const { userId, palnId } = request.params;
			const group = await this.GroupInfoRepository.findOneBy({ name: groupName });
			const priority = await this.PriorityInfoRepository.findOneBy({ name: priorityName });
			const repeat = await this.RepeatInfoRepository.findOneBy({ name: repeatName });

			const plan = await this.PlanInfoRepository
				.createQueryBuilder("plan")
				.innerJoinAndSelect("plan.user", "user")
				.where("user.id = :userId AND plan.id = :planId", { userId: (decodeToken as JwtPayload).id, planId: palnId })
				.getOne();

			plan.name = name;
			plan.remark = remark;
			plan.startDate = new Date(startDate as string);
			plan.endDate = new Date(endDate as string);
			plan.group = group;
			plan.priority = priority;
			plan.repeat = repeat;
			await this.PlanInfoRepository.save(plan);

			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async createGroup(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { name, remark } = request.body;
			let group = await this.GroupInfoRepository
				.createQueryBuilder("group")
				.innerJoinAndSelect("group.user", "user")
				.where("user.id = :id AND group.name = :name", { id: (decodeToken as JwtPayload).id, name: name })
				.getOne();

			if (group) {
				throw new Error("Group existed.");
			}

			group = new GroupInfo();
			const user = await this.UserInfoRepository
				.createQueryBuilder("user")
				.where("user.id = :id", { id: (decodeToken as JwtPayload).id })
				.getOne();

			group.name = name;
			group.remark = remark;
			group.user = user;
			group.plans = [];
			await this.GroupInfoRepository.save(group);

			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async getGroups(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const deleted = (request.query.deleted as string).toLowerCase() === "true" ? true : false;
			const groups = await this.GroupInfoRepository
				.createQueryBuilder("groups")
				.innerJoinAndSelect("groups.user", "user")
				.where("user.id = :id AND groups.deleted = :deleted", { id: (decodeToken as JwtPayload).id, deleted: deleted })
				.getMany();

			return groups;
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async deleteGroup(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { userId, groupId } = request.params;
			const group = await this.GroupInfoRepository
				.createQueryBuilder("group")
				.innerJoinAndSelect("group.plans", "plans")
				.innerJoinAndSelect("group.user", "user")
				.where("user.id = :userId AND group.id = :groupId", { userId: (decodeToken as JwtPayload).id, groupId: groupId })
				.getOne();
			if (group.deleted) {
				const planIdsToDelete: number[] = group.plans.map(plan => plan.id);
				await this.PlanInfoRepository.delete(planIdsToDelete);
				await this.GroupInfoRepository.delete({ id: group.id });
			} else {
				group.plans.forEach(async (plan) => {
					plan.deleted = true;
					await this.PlanInfoRepository.save(plan);
				});
				group.deleted = true;
				await this.GroupInfoRepository.save(group);
			}
			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}


	async setGroup(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { name, remark } = request.body;
			const { userId, groupId } = request.params;
			const group = await this.GroupInfoRepository
				.createQueryBuilder("group")
				.innerJoinAndSelect("group.user", "user")
				.where("user.id = :userId AND group.id = :groupId", { userId: (decodeToken as JwtPayload).id, groupId: groupId })
				.getOne();

			group.name = name;
			group.remark = remark;
			await this.GroupInfoRepository.save(group);

			return { status: "success" };
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}

	
	async getPlans(request: Request, response: Response, next: NextFunction) {
		try {
			const decodeToken = await tokenVerify(request.headers.authorization.split(" ")[1]);
			if (!decodeToken) {
				throw new Error("Invalid token.");
			}

			const { deleted, groupName, startDate, endDate, completed, name, remark, priorityName, repeatName } = request.query;
			const repository = this.PlanInfoRepository
				.createQueryBuilder("plans")
				.innerJoinAndSelect("plans.user", "user")
				.innerJoinAndSelect("plans.priority", "priority")
				.innerJoinAndSelect("plans.repeat", "repeat")
				.where("user.id = :id", { id: (decodeToken as JwtPayload).id });

			if (deleted) {
				const fieldValue = (deleted as string).toLocaleLowerCase() === "true" ? true : false;
				repository.andWhere("plans.deleted = :deleted", { deleted: fieldValue });
			}
			if (completed) {
				const fieldValue = (completed as string).toLocaleLowerCase() === "true" ? true : false;
				repository.andWhere("plans.completed = :completed", { completed: fieldValue });
			}
			if (startDate && endDate) {
				repository.andWhere("plans.startDate >= :startDate AND plans.endDate <= :endDate", {
					startDate: new Date(startDate as string),
					endDate: new Date(endDate as string)
				});
			}
			if (name) {
				repository.andWhere("plans.name LIKE :name", { name: `%${name}%` });
			}
			if (remark) {
				repository.andWhere("plans.remark LIKE :remark", { remark: `%${remark}%` });
			}
			if (groupName) {
				repository
					.innerJoinAndSelect("plans.group", "group")
					.andWhere("group.name = :groupName", { groupName: groupName });
			}
			if (priorityName) {
				repository
					.innerJoinAndSelect("plans.priority", "priority")
					.andWhere("priority.name = :priorityName", { priorityName: priorityName });
			}
			if (repeatName) {
				repository
					.innerJoinAndSelect("plans.repeat", "repeat")
					.andWhere("repeat.name = :repeatName", { repeatName: repeatName });
			}

			const plans = await repository.getMany();
			return plans;
		} catch (error) {
			const errorMessage = error.message || "An unexpected error occurred.";
			return { status: "error", message: errorMessage };
		}
	}
}
