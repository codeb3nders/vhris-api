const aggregateQry = [
  {
    $lookup: {
      from: 'enum_tables',
      localField: 'location',
      foreignField: 'code',
      as: 'locationEnum',
    },
  },
  {
    $lookup: {
      from: 'enum_tables',
      localField: 'department',
      foreignField: 'code',
      as: 'departmentEnum',
    },
  },
  {
    $lookup: {
      from: 'enum_tables',
      localField: 'employmentStatus',
      foreignField: 'code',
      as: 'employmentStatusEnum',
    },
  },
  {
    $lookup: {
      from: 'enum_tables',
      localField: 'employmentType',
      foreignField: 'code',
      as: 'employmentTypeEnum',
    },
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
      // location: {
      //   $map: {
      //     input: '$location',
      //     as: 'item',
      //     in: { $toUpper: '$$item' },
      //   },
      // },
      birthDate: { $toDate: '$birthDate' },
      yearsInService: {
        $subtract: [
          {
            $year: {
              $ifNull: ['$dateInactive', '$$NOW'],
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

// TODO: apply aggregation $project to transform output data to lowercase
export const EmployeeFields = [
  {
    $project: {
      location: {
        $map: {
          input: '$location',
          as: 'item',
          in: {
            $toUpper: '$$item',
          },
        },
      },
      educationalBackground: {
        $map: {
          input: '$educationalBackground',
          as: 'arrayElems',
          in: {
            $mergeObjects: [
              '$$arrayElems',
              {
                level: {
                  $toUpper: '$$arrayElems.level',
                },
              },
              {
                degree: {
                  $toUpper: '$$arrayElems.degree',
                },
              },
            ],
          },
        },
      },
      presentAddress: {
        $map: {
          input: '$presentAddress',
          as: 'arrayElems',
          in: {
            $mergeObjects: [
              '$$arrayElems',
              {
                addressLine: {
                  $toUpper: '$$arrayElems.addressLine',
                },
              },
              {
                barangay: {
                  $toUpper: '$$arrayElems.barangay',
                },
              },
            ],
          },
        },
      },
      permanentAddress: {
        $map: {
          input: '$permanentAddress',
          as: 'arrayElems',
          in: {
            $mergeObjects: [
              '$$arrayElems',
              {
                addressLine: {
                  $toUpper: '$$arrayElems.addressLine',
                },
              },
              {
                barangay: {
                  $toUpper: '$$arrayElems.barangay',
                },
              },
            ],
          },
        },
      },
      allowanceDetails: {
        $map: {
          input: '$allowanceDetails',
          as: 'arrayElems',
          in: {
            $mergeObjects: [
              '$$arrayElems',
              {
                code: {
                  $toUpper: '$$arrayElems.addressLine',
                },
              },
            ],
          },
        },
      },
      payrollBankAccount: {
        $mergeObjects: [
          '$payrollBankAccount',
          {
            bankName: {
              $toUpper: '$payrollBankAccount.bankName',
            },
          },
          {
            accountName: {
              $toUpper: '$payrollBankAccount.accountName',
            },
          },
        ],
      },
      employmentRecords: {
        $mergeObjects: [
          '$employmentRecords',
          {
            yrFrom: '$employmentRecords.yrFrom',
          },
          {
            companyName: {
              $toUpper: '$payrollBankAccount.companyName',
            },
          },
        ],
      },
      govtProfExamsPassed: {
        $mergeObjects: [
          '$govtProfExamsPassed',
          {
            dateTaken: '$govtProfExamsPassed.dateTaken',
          },
          {
            examTitle: {
              $toUpper: '$govtProfExamsPassed.examTitle',
            },
          },
        ],
      },
      licensesCertifications: {
        $mergeObjects: [
          '$licensesCertifications',
          {
            name: '$licensesCertifications.name',
          },
          {
            authorizingEntity: {
              $toUpper: '$licensesCertifications.authorizingEntity',
            },
          },
        ],
      },
      emergencyContact: {
        $mergeObjects: [
          '$emergencyContact',
          {
            name: {
              $toUpper: '$emergencyContact.name',
            },
          },
          {
            relation: {
              $toUpper: '$emergencyContact.relation',
            },
          },
        ],
      },
      familyBackground: {
        $map: {
          input: '$familyBackground',
          as: 'arrayElems',
          in: {
            $mergeObjects: [
              '$$arrayElems',
              {
                name: {
                  $toUpper: '$$arrayElems.name',
                },
              },
              {
                relation: {
                  $toUpper: '$$arrayElems.relation',
                },
              },
            ],
          },
        },
      },
      employeeNo: {
        $toUpper: '$employeeNo',
      },
      isActive: '$isActive',
      userGroup: {
        $toUpper: '$userGroup',
      },
      firstName: {
        $toUpper: '$firstName',
      },
      lastName: {
        $toUpper: '$lastName',
      },
      middleName: {
        $toUpper: '$middleName',
      },
      suffix: {
        $toUpper: '$suffix',
      },
      birthDate: '$birthDate',
      gender: {
        $toUpper: '$gender',
      },
      civilStatus: {
        $toUpper: '$civilStatus',
      },
      citizenship: {
        $toUpper: '$citizenship',
      },
      religion: {
        $toUpper: '$religion',
      },
      personalContactNumber: {
        $toUpper: '$personalContactNumber',
      },
      personalEmail: {
        $toUpper: '$personalEmail',
      },
      companyContactNumber: {
        $toUpper: '$companyContactNumber',
      },
      companyEmail: {
        $toUpper: '$companyEmail',
      },
      position: {
        $toUpper: '$position',
      },
      department: {
        $toUpper: '$department',
      },
      reportsTo: {
        $toUpper: '$reportsTo',
      },
      dateHired: '$dateHired',
      dateInactive: '$dateInactive',
      endOfProbationary: '$endOfProbationary',
      contractEndDate: '$contractEndDate',
      rank: {
        $toUpper: '$rank',
      },
      employmentStatus: {
        $toUpper: '$employmentStatus',
      },
      employmentType: {
        $toUpper: '$employmentType',
      },
      employeeBenefits: {
        $toUpper: '$employeeBenefits',
      },
      sss: {
        $toUpper: '$sss',
      },
      philHealth: {
        $toUpper: '$philHealth',
      },
      pagIbig: {
        $toUpper: '$pagIbig',
      },
      tin: {
        $toUpper: '$tin',
      },
      numberOfDependents: '$numberOfDependents',
      taxExemption: {
        $toUpper: '$taxExemption',
      },
      basicPay: '$basicPay',
      payRateType: '$payRateType',
      paymentMethod: {
        $toUpper: '$paymentMethod',
      },
      payrollGroup: {
        $toUpper: '$payrollGroup',
      },
      deductionSSS: {
        $toUpper: '$deductionSSS',
      },
      deductPhilhealth: {
        $toUpper: '$deductPhilhealth',
      },
      deductHMDF: {
        $toUpper: '$deductHMDF',
      },
      fixedContributionRate: {
        $toUpper: '$fixedContributionRate',
      },
      deductWithholdingTax: {
        $toUpper: '$deductWithholdingTax',
      },
    },
  },
];
