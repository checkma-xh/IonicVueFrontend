export async function findModuleName(name: string,) {
	switch (name) {
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