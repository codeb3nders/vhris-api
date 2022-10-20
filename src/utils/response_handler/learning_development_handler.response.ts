import { CreateLearningDevelopmentDto } from 'src/learning_development/dto/create-learning_development.dto';
import { BaseResponseHandler } from './base_handler.response';

export class LearningDevelopmentResponseHandler extends BaseResponseHandler {
  ok(data: CreateLearningDevelopmentDto | CreateLearningDevelopmentDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    const employee = item.employee;
    const toReturn: any = {
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
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
