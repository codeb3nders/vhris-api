import { LearningDevelopment } from '../entities/learning_development.entity';

export const learningDevelopmentResponseHandler = {
  ok: (data: LearningDevelopment[]) => {
    if (data.length > 0) {
      return data.map((item: any) => {
        return returnItem(item);
      });
    } else {
      return returnItem(data);
    }
  },
};

function returnItem(item) {
  const toReturn: any = {
    id: item._id,
    employeeNo: item.employeeNo,
    timestamp: item.timestamp,
    isAttended: item.isAttended,
    courseTitle: item.courseTitle,
    institution: item.institution,
    venue: item.venue,
    startDate: item.startDate,
    endDate: item.endDate,
    status: item.status,
    bondLength: item.bondLength,
    bondStartDate: item.bondStartDate,
    bondEndDate: item.bondEndDate,
    lastModifiedDate: item.lastModifiedDate,
  };

  return toReturn;
}
