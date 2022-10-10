import { DisciplinaryAction } from '../entities/disciplinary_action.entity';

export const disciplinaryActionsResponseHandler = {
  ok: (data: DisciplinaryAction[]) => {
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
    caseNumber: item.caseNumber,
    violationCategory: prepareEnumItem(item.violationCategoryEnum),
    violations: prepareEnumItem(item.violationsEnum),
    offenseStage: prepareEnumItem(item.offenseStageEnum),
    offenseLevel: prepareEnumItem(item.offenseLevelEnum),
    misconductReportIssueDate: item.misconductReportIssueDate,
    noticeToExplainIssueDate: item.noticeToExplainIssueDate,
    explanationDate: item.explanationDate,
    finalDisposition: item.finalDisposition,
    dispositionDate: item.dispositionDate,
    isAcknowledged: item.isAcknowledged,
    dateAcknowledged: item.dateAcknowledged,
    cleansingPeriod: item.cleansingPeriod,
    status: item.status,
    lastModifiedDate: item.lastModifiedDate,
    aging: item.aging,
  };

  return toReturn;
}

const prepareEnumItem = (item: any, isArray = false) => {
  if (!item || item.length < 1) return null;
  if (isArray) {
    return (
      item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      })
    );
  } else {
    const data =
      item &&
      item.map((i: any) => {
        return { code: i.code, name: i.name };
      });
    return data[0];
  }
};
