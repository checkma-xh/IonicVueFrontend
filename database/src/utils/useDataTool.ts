import { AppDataSource } from "../data-source";
import { GroupInfo } from "../entity/GroupInfo";
import { PlanInfo } from "../entity/PlanInfo";
import { PriorityInfo } from "../entity/PriorityInfo";
import { RepeatInfo } from "../entity/RepeatInfo";
import { UserInfo } from "../entity/UserInfo";


// ! 并没有提供删除数据库的功能, 只能删除所有数据, 需要注意外键关系
export async function dropDatabase() {
  const UserInfoRepository = await AppDataSource.getRepository(UserInfo);
  const PriorityInfoRepository = await AppDataSource.getRepository(PriorityInfo);
  const RepeatInfoRepository = await AppDataSource.getRepository(RepeatInfo);
  const GroupInfoRepository = await AppDataSource.getRepository(GroupInfo);
  const PlanInfoRepository = await AppDataSource.getRepository(PlanInfo);

  await PlanInfoRepository.delete({});
  await GroupInfoRepository.delete({});
  await PriorityInfoRepository.delete({});
  await RepeatInfoRepository.delete({});
  await UserInfoRepository.delete({});
}


// * 插入假数据
export async function insertFakeData() {
  const UserInfoRepository = await AppDataSource.getRepository(UserInfo);
  const PriorityInfoRepository = await AppDataSource.getRepository(PriorityInfo);
  const RepeatInfoRepository = await AppDataSource.getRepository(RepeatInfo);

  // UserInfo
  const user = new UserInfo();
  user.id = 1;
  user.email = "checkmaxh@gmail.com";
  user.password = "Wlj+=9351524";

  // PriorityInfo
  const highPriority = new PriorityInfo();
  highPriority.name = "high";
  highPriority.remark = "high priority";

  const mediumPriority = new PriorityInfo();
  mediumPriority.name = "medium";
  mediumPriority.remark = "medium priority";

  const lowPriority = new PriorityInfo();
  lowPriority.name = "low";
  lowPriority.remark = "low priority";

  // RepeatInfo
  const everydayRepeat = new RepeatInfo();
  everydayRepeat.name = "everyday";
  everydayRepeat.remark = "repeat everyday";

  const workdayRepeat = new RepeatInfo();
  workdayRepeat.name = "workday";
  workdayRepeat.remark = "repeat workday";

  const weekdayRepeat = new RepeatInfo();
  weekdayRepeat.name = "weekday";
  weekdayRepeat.remark = "repeat weekday";

  // GroupInfo
  const defaultGroup = new GroupInfo();
  defaultGroup.name = "default";
  defaultGroup.remark = "default group";
  defaultGroup.user = user;
  defaultGroup.plans = [];

  const keepGroup = new GroupInfo();
  keepGroup.name = "keep";
  keepGroup.remark = "keep working";
  keepGroup.user = user;
  keepGroup.plans = [];

  const dailyGroup = new GroupInfo();
  dailyGroup.name = "daily";
  dailyGroup.remark = "my life";
  dailyGroup.user = user;
  dailyGroup.plans = [];

  // PlanInfo
  const groups = [defaultGroup, keepGroup, dailyGroup];
  const repeats = [everydayRepeat, workdayRepeat, weekdayRepeat];
  const priorities = [highPriority, mediumPriority, lowPriority];

  // todo 
  let index = 0;
  const PLAN_COUNT = 18;
  const startDate = new Date();
  const endDate = new Date();
  const halfPlanCount = Math.floor(PLAN_COUNT / 2);

  groups.forEach((item: GroupInfo) => {
    const groupPlans = Array.from({ length: PLAN_COUNT }, (_, i) => {
      const plan = new PlanInfo();
      plan.name = `plan-${index++}`;
      plan.remark = `When all else is lost the future still remains`;
      plan.user = user;
      plan.group = item;
      plan.priority = i < halfPlanCount ? highPriority : mediumPriority;
      plan.repeat = everydayRepeat;
      plan.startDate = startDate;
      plan.endDate = endDate;
      return plan;
    });
    item.plans.push(...groupPlans);
  });

  user.groups = groups;

  await RepeatInfoRepository.save(repeats);
  await PriorityInfoRepository.save(priorities);
  await UserInfoRepository.save(user);
}