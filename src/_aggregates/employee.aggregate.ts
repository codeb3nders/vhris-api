import {
  defaultItems,
  defaultSet,
} from 'src/employees/interface/employee.interface';
import { aggregateLookUp } from 'src/_aggregates/helper.aggregate';

export class AggregateEmployee {
  values() {
    return [
      {
        $project: {
          ...defaultItems,
          name: {
            $concat: [
              '$lastName',
              ',',
              ' ',
              '$firstName',
              ' ',
              { $ifNull: ['$middleName', ''] },
              ' ',
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'enums_table',
          let: { field: '$location' },
          pipeline: [
            { $addFields: { code: { $toUpper: '$code' } } },
            { $match: { $expr: { $in: ['$code', '$$field'] } } },
          ],
          as: 'locationEnum',
        },
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'userGroup',
          'code',
          'userGroupEnum',
        ),
      },

      {
        $lookup: aggregateLookUp('enums_table', 'gender', 'code', 'genderEnum'),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'civilStatus',
          'code',
          'civilStatusEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'citizenship',
          'code',
          'citizenshipEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'religion',
          'code',
          'religionEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'payRateType',
          'code',
          'payRateTypeEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'payrollGroup',
          'code',
          'payrollGroupEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'deductPhilhealth',
          'code',
          'deductPhilhealthEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'fixedContributionRate',
          'code',
          'fixedContributionRateEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'paymentMethod',
          'code',
          'paymentMethodEnum',
        ),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'position',
          'code',
          'positionEnum',
        ),
      },

      {
        $lookup: aggregateLookUp('enums_table', 'rank', 'code', 'rankEnum'),
      },

      {
        $lookup: aggregateLookUp(
          'enums_table',
          'department',
          'code',
          'departmentEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'employmentStatus',
          'code',
          'employmentStatusEnum',
        ),
      },
      {
        $lookup: aggregateLookUp(
          'enums_table',
          'employmentType',
          'code',
          'employmentTypeEnum',
        ),
      },

      {
        $lookup: {
          from: 'employees',
          localField: 'reportsTo',
          foreignField: 'employeeNo',
          as: 'reportingTo',
        },
      },
      {
        $set: {
          ...defaultSet,

          birthDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: { $toDate: '$birthDate' },
            },
          },
          yearsInService: {
            $subtract: [
              {
                $year: {
                  $ifNull: [{ $toDate: '$dateInactive' }, '$$NOW'],
                },
              },
              {
                $year: { $toDate: '$dateHired' },
              },
            ],
          },
          age: {
            $subtract: [
              {
                $subtract: [
                  {
                    $year: '$$NOW',
                  },
                  {
                    $year: { $toDate: '$birthDate' },
                  },
                ],
              },
              {
                $cond: [
                  {
                    $lt: [
                      {
                        $dayOfYear: '$birthday',
                      },
                      {
                        $dayOfYear: '$$NOW',
                      },
                    ],
                  },
                  0,
                  1,
                ],
              },
            ],
          },
        },
      },
    ];
  }
}
