import {
  aggregateLookUp,
  aggregateFormatDate,
} from 'src/_aggregates/helper.aggregate';

export class AggregateDisciplinaryAction {
  values() {
    return [
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'violationCategory',
          'code',
          'violationCategoryEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'violations',
          'code',
          'violationsEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'offenseStage',
          'code',
          'offenseStageEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'offenseLevel',
          'code',
          'offenseLevelEnum',
        ),
      },
      {
        $set: {
          dateAcknowledged: aggregateFormatDate('dateAcknowledged'),
          misconductReportIssueDate: aggregateFormatDate(
            'misconductReportIssueDate',
          ),
          noticeToExplainIssueDate: aggregateFormatDate(
            'noticeToExplainIssueDate',
          ),

          explanationDate: aggregateFormatDate('explanationDate'),
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),

          aging: {
            $dateDiff: {
              startDate: '$misconductReportIssueDate',
              endDate: '$$NOW',
              unit: 'day',
            },
          },
        },
      },
    ];
  }
}
