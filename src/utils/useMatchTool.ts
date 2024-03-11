import { alertCircle, checkmarkCircle } from "ionicons/icons";

export function matchModuleNameByRouteName(routeName: string,) {
	switch (routeName) {
		case "PlanManagement":
			return "plan management";
		case "CreatePlan":
			return "create plan";
		case "SetPlan":
			return "set plan";
		case "PlanList":
			return "plan list";
		case "Auth":
			return "auth";
		case "Register":
			return "register";
		case "Login":
			return "login";
		case "Deactivate":
			return "deactivate";
		case "UserInfo":
			return "user info";
		case "EditEmail":
			return "edit email";
		case "EditPassword":
			return "edit password";
		default:
			return "error";
	}
}

export function matchColorByPriorityName(priorityName: string) {
	switch (priorityName) {
		case "high":
			return "primary";
		case "medium":
			return "secondary";
		case "low":
			return "medium";
		default:
			return "danger";
	}
}

export function matchIconColorByCompleted(completed: boolean) {
	switch (completed) {
		case true:
			return "primary";
		case false:
			return "warning";
		default:
			return "danger";
	}
}

export function matchIconByCompleted(completed: any) {
	switch (completed) {
		case true:
			return checkmarkCircle;
		case false:
			return alertCircle;
		default:
			return alertCircle;
	}
}

export function matchColorByRepeatName(repeatName: string) {
	switch (repeatName) {
		case "everyday":
			return "success";
		case "workday":
			return "tertiary";
		case "weekday":
			return "warning";
		default:
			return "danger";
	}
}