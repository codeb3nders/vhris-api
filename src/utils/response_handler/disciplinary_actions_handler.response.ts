import { CreateDisciplinaryActionDto } from 'src/disciplinary_actions/dto/create-disciplinary_action.dto';
import { BaseResponseHandler } from './base_handler.response';

export class DisciplinaryActionResponseHandler extends BaseResponseHandler {
  ok(data: CreateDisciplinaryActionDto | CreateDisciplinaryActionDto[]) {
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
      caseNumber: item.caseNumber,
      violationCategory: this.prepareEnumItem(item.violationCategoryEnum),
      violations: this.prepareEnumItem(item.violationsEnum),
      offenseStage: this.prepareEnumItem(item.offenseStageEnum),
      offenseLevel: this.prepareEnumItem(item.offenseLevelEnum),
      misconductReportIssueDate: item.misconductReportIssueDate,
      noticeToExplainIssueDate: item.noticeToExplainIssueDate,
      explanationDate: item.explanationDate,
      finalDisposition: item.finalDisposition,
      dispositionDate: item.dispositionDate,
      isAcknowledged: item.isAcknowledged,
      dateAcknowledged: item.dateAcknowledged,
      cleansingPeriod: item.cleansingPeriod,
      status: item.status,
      aging: item.aging,
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
