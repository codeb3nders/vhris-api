import { aggregateFormatDate } from 'src/_aggregates/helper.aggregate';

export class AggregateLeaveBalance {
  values() {
    return [
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeNo',
          foreignField: 'employeeNo',
          as: 'employeeDetails',
        },
      },

      {
        $set: {
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
          VLRemaining: {
            $subtract: [
              {
                $ifNull: ['$VL', 0],
              },
              {
                $ifNull: ['$VLTaken', 0],
              },
            ],
          },

          SLRemaining: {
            $subtract: [
              {
                $ifNull: ['$SL', 0],
              },
              {
                $ifNull: ['$SLTaken', 0],
              },
            ],
          },

          BLRemaining: {
            $subtract: [
              {
                $ifNull: ['$BL', 0],
              },
              {
                $ifNull: ['$BLTaken', 0],
              },
            ],
          },

          CLRemaining: {
            $subtract: [
              {
                $ifNull: ['$CL', 0],
              },
              {
                $ifNull: ['$CLTaken', 0],
              },
            ],
          },

          MLRemaining: {
            $subtract: [
              {
                $ifNull: ['$ML', 0],
              },
              {
                $ifNull: ['$MLTaken', 0],
              },
            ],
          },

          PLRemaining: {
            $subtract: [
              {
                $ifNull: ['$PL', 0],
              },
              {
                $ifNull: ['$PLTaken', 0],
              },
            ],
          },

          SILRemaining: {
            $subtract: [
              {
                $ifNull: ['$SIL', 0],
              },
              {
                $ifNull: ['$SILTaken', 0],
              },
            ],
          },

          BRLRemaining: {
            $subtract: [
              {
                $ifNull: ['$BRL', 0],
              },
              {
                $ifNull: ['$BRLTaken', 0],
              },
            ],
          },

          ULRemaining: {
            $subtract: [
              {
                $ifNull: ['$UL', 0],
              },
              {
                $ifNull: ['$ULTaken', 0],
              },
            ],
          },
          /**
           
SL
VL
BL
CL
ML
PL
SIL
BRL
UL


           */
        },
      },
    ];
  }
}
