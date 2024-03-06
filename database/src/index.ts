import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { UserInfo } from "./entity/UserInfo";
import { PlanInfo } from "./entity/PlanInfo";
import { GroupInfo } from "./entity/GroupInfo";
import { PriorityInfo } from "./entity/PriorityInfo";
import { RepeatInfo } from "./entity/RepeatInfo";


async function createData () {
  // todo 创建数据
  // UserInfo
  const user = new UserInfo();
  user.email = "checkmaxh@gmail.com";
  user.passwordHash = "#";
  user.avatarUrl = "#";

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
  const keepGroup = new GroupInfo();
  keepGroup.name = "keep";
  keepGroup.remark = "keep working";
  keepGroup.user = user;

  const dailyGroup = new GroupInfo();
  dailyGroup.name = "daily";
  dailyGroup.remark = "my life";
  dailyGroup.user = user;

  // PlanInfo
  const getUp = new PlanInfo();
  getUp.name = "get up";
  getUp.remark = "7:00 AM";
  getUp.user = user;
  getUp.group = dailyGroup;
  getUp.repeat = everydayRepeat;
  getUp.priority = lowPriority;

  const washFace = new PlanInfo();
  washFace.name = "wash face";
  washFace.remark = "7:05 AM";
  washFace.user = user;
  washFace.group = dailyGroup;
  washFace.repeat = everydayRepeat;
  washFace.priority = lowPriority;

  const brushTeeth = new PlanInfo();
  brushTeeth.name = "brush teeth";
  brushTeeth.remark = "7:10 AM";
  brushTeeth.user = user;
  brushTeeth.group = dailyGroup;
  brushTeeth.repeat = everydayRepeat;
  brushTeeth.priority = lowPriority;

  const eatBreakfast = new PlanInfo();
  eatBreakfast.name = "eat breakfast";
  eatBreakfast.remark = "7:30 AM";
  eatBreakfast.user = user;
  eatBreakfast.group = dailyGroup;
  eatBreakfast.repeat = everydayRepeat;
  eatBreakfast.priority = lowPriority;

  const working = new PlanInfo();
  working.name = "working";
  working.remark = "8:00 AM";
  working.user = user;
  working.group = dailyGroup;
  working.repeat = everydayRepeat;
  working.priority = lowPriority;

  // todo 处理依赖
  // UserInfo
  user.plans = [ getUp, washFace, brushTeeth, eatBreakfast, working ];
  user.groups = [ keepGroup, dailyGroup ];

  // PriorityInfo
  highPriority.plans = [];
  mediumPriority.plans = [];
  lowPriority.plans = [ getUp, washFace, brushTeeth, eatBreakfast, working ];

  // RepeatInfo
  everydayRepeat.plans = [ getUp, washFace, brushTeeth, eatBreakfast, working ];
  workdayRepeat.plans = [];
  weekdayRepeat.plans = [];

  // GroupInfo
  keepGroup.plans = [];
  dailyGroup.plans = [ getUp, washFace, brushTeeth, eatBreakfast, working ];

  // PlanInfo

  // todo 保存数据
  await AppDataSource.manager.save( PriorityInfo, [
    highPriority,
    mediumPriority,
    lowPriority,
  ] );
  await AppDataSource.manager.save( RepeatInfo, [
    everydayRepeat,
    workdayRepeat,
    weekdayRepeat,
  ] );
  await AppDataSource.manager.save( PlanInfo, [
    getUp,
    washFace,
    brushTeeth,
    eatBreakfast,
    working,
  ] );
  await AppDataSource.manager.save( UserInfo, [ user ] );
  await AppDataSource.manager.save( GroupInfo, [ keepGroup, dailyGroup ] );
}

AppDataSource.initialize()
  .then( async () => {
    // create express app
    const app = express();
    app.use( cors( {
      origin: '*',
    } ) );
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded( { extended: true } ) );

    // register express routes from defined application routes
    Routes.forEach( ( route ) => {
      ( app as any )[ route.method ](
        route.route,
        ( req: Request, res: Response, next: Function ) => {
          const result = new ( route.controller as any )()[ route.action ](
            req,
            res,
            next,
          );
          if ( result instanceof Promise ) {
            result.then( ( result ) =>
              result !== null && result !== undefined
                ? res.send( result )
                : undefined,
            );
          } else if ( result !== null && result !== undefined ) {
            res.json( result );
          }
        },
      );
    } );

    // setup express app here
    // ...

    // start express server
    app.listen( 3000 );

    if ( ( await AppDataSource.manager.find( UserInfo ) ).length === 0 ) {
      createData();
    }

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/user-info/users/1 to see results",
    );
  } )
  .catch( ( error ) => console.log( error ) );
