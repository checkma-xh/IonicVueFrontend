import { checkmarkCircle, alertCircle, sparkles, listCircle } from "ionicons/icons";
import { computed, ref } from "vue";

export const priorities = ref(["high", "medium", "low"]);
export const colorArray = ref([
    "danger",
    "tertiary",
    "success",
    "warning",
    "primary",
    "secondary",
    "light",
    "medium",
    "dark",
]);

// ! Export prohibited
const colorCycle = arrayCycleTool(colorArray.value);

export function arrayCycleTool(array: Array<any>) {
    let index: number = 0;
    const arrayCycle = () => {
        if (index === array.length) {
            index = 0;
        }
        return array[index++];
    };
    return arrayCycle;
}
export function sortPlan(currentItem: any, afterItem: any) {
    if (currentItem.completed !== afterItem.completed) {
        return currentItem.completed ? -1 : 1;
    }

    const priorityOrder = priorities.value;

    if (currentItem.completed) {
        const currentItemIndex = priorityOrder.indexOf(
            currentItem.priorityName
        );
        const afterItemIndex = priorityOrder.indexOf(afterItem.priorityName);
        return currentItemIndex - afterItemIndex;
    } else {
        if (currentItem.expired !== afterItem.expired) {
            return currentItem.expired ? 1 : -1;
        }
        return (
            priorityOrder.indexOf(currentItem.priorityName) -
            priorityOrder.indexOf(afterItem.priorityName)
        );
    }
}

export function colorByPriorityName(priorityName: string) {
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

export function colorByRepeatName(repeatName: string) {
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

export function colorByCompleted(completed: boolean) {
    switch (completed) {
        case true:
            return "primary";
        case false:
            return "success";
        default:
            return "medium";
    }
}

export function iconByCompleted(completed: any) {
    switch (completed) {
        case true:
            return checkmarkCircle;
        case false:
            return sparkles;
        default:
            return alertCircle;
    }
}

export function colorByExpired(expired: boolean) {
    switch (expired) {
        case true:
            return "danger";
        case false:
            return "danger";
        default:
            return "danger";
    }
}

export function iconByExpired(expired: boolean) {
    switch (expired) {
        case true:
            return alertCircle;
        case false:
            return alertCircle;
        default:
            return alertCircle;
    }
}

export function setPlanAttribute({
    plan,
    handleClick = null,
    handleDelete = null,
    handleComplete = null,
    handleDetail = null,
}: {
    plan: any,
    handleClick: any,
    handleDelete: any,
    handleComplete: any,
    handleDetail: any,
}) {
    plan.handleClick = handleClick;
    plan.handleDelete = handleDelete;
    plan.handleComplete = handleComplete;
    plan.handleDetail = handleDetail;

    plan.priorityName = computed(() => {
        return plan.priority.name;
    });
    plan.repeatName = computed(() => {
        return plan.repeat.name;
    });
    plan.groupName = computed(() => {
        return plan.group.name;
    });
    plan.expired = computed(() => {
        const endDate = new Date(plan.endDate);
        const today = new Date();
        endDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return endDate.getTime() < today.getTime();
    });
    plan.icon = computed(() => {
        if (!plan.completed && plan.expired) {
            return iconByExpired(plan.expired);
        }
        return iconByCompleted(plan.completed);
    });
    plan.color = computed(() => {
        if (!plan.completed && plan.expired) {
            return colorByExpired(plan.expired);
        }
        return colorByCompleted(plan.completed);
    });
    plan.priorityColor = computed(() => {
        return colorByPriorityName(plan.priority.name);
    });
    plan.repeatColor = computed(() => {
        return colorByRepeatName(plan.repeat.name);
    });
}


export function setGroupAttribute({
    group,
    handleClick,
    handleDetail,
    handleDelete,
}: {
    group       : any,
    handleClick : any,
    handleDetail: any,
    handleDelete: any,
}) {
    group.handleClick  = handleClick;
    group.handleDetail = handleDetail;
    group.handleDelete = handleDelete;

    group.icon = computed(() => {
        return listCircle;
    });
    group.color = computed(() => {
        return colorCycle();
    });
    group.total = computed(() => {
        return group.plans.length;
    });
    group.completedCount = computed(() => {
        return group.plans.filter((plan: any) => plan.completed).length;
    });
    group.unfinishedCount = computed(() => {
        return group.total - group.completedCount;
    });
    group.selectPlan = computed(() => {
        return group.handleClick;
    });
}
