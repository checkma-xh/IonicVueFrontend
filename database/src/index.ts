import * as express from "express";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { dropDatabase, insertFakeData } from "./utils/useDataTool";

async function initializeData() {
  await dropDatabase();
  await insertFakeData();
}


async function startServer() {
  try {
    await AppDataSource.initialize();
    const app = express();
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use((err, req: Request, res: Response, next: any) => {
      console.error(err.stack);
      res.status(500).send("internal server error");
    });

    // 使用更简洁的方式来注册路由  
    Routes.forEach(route => {
      app[route.method](route.route, async (req, res, next) => {
        try {
          const controller = new (route.controller)();
          const result = await controller[route.action](req, res, next);
          // ! not use `res.json(result);`
          return result;
        } catch (error) {
          next(error);
        }
      });
    });

    // 开始监听端口  
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`express server has started on http://localhost:${PORT}/`);
    });

    // 检查并初始化数据  
    await initializeData();
  } catch (error) {
    console.error("error starting server:", error);
  }
}


// 启动服务器  
startServer();
