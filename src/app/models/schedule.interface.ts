export interface WorkingHours {
    hours: number;
    days: number;
}

export interface Shift {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    totalHours: number;
    status: number;
    shiftDate: Date;
}

export interface ScheduleWarning {
    userId: string;
    applyJobId: string;
    employerId: string;
    jobId:string;
    startOfWeek: Date;
    endOfWeek: Date;
    fullName: string;
    workingHours: WorkingHours;
    shift: Shift[];
    totalShiftHours: number;
    totalWorkingDays: number;
}