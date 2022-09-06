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
      //     in: { $toLower: '$$item' },
      //   },
      // },
      birthDate: { $toDate: '$birthDate' },
      yearsInService: {
        $subtract: [
          {
            $year: {
              $ifNull: ['$inactiveDate', '$$NOW'],
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
            $toLower: '$$item',
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
                  $toLower: '$$arrayElems.level',
                },
              },
              {
                degree: {
                  $toLower: '$$arrayElems.degree',
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
                  $toLower: '$$arrayElems.addressLine',
                },
              },
              {
                barangay: {
                  $toLower: '$$arrayElems.barangay',
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
                  $toLower: '$$arrayElems.addressLine',
                },
              },
              {
                barangay: {
                  $toLower: '$$arrayElems.barangay',
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
                  $toLower: '$$arrayElems.addressLine',
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
              $toLower: '$payrollBankAccount.bankName',
            },
          },
          {
            accountName: {
              $toLower: '$payrollBankAccount.accountName',
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
              $toLower: '$payrollBankAccount.companyName',
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
              $toLower: '$govtProfExamsPassed.examTitle',
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
              $toLower: '$licensesCertifications.authorizingEntity',
            },
          },
        ],
      },
      emergencyContact: {
        $mergeObjects: [
          '$emergencyContact',
          {
            name: {
              $toLower: '$emergencyContact.name',
            },
          },
          {
            relation: {
              $toLower: '$emergencyContact.relation',
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
                  $toLower: '$$arrayElems.name',
                },
              },
              {
                relation: {
                  $toLower: '$$arrayElems.relation',
                },
              },
            ],
          },
        },
      },
      employeeNo: {
        $toLower: '$employeeNo',
      },
      isActive: '$isActive',
      userGroup: {
        $toLower: '$userGroup',
      },
      firstName: {
        $toLower: '$firstName',
      },
      lastName: {
        $toLower: '$lastName',
      },
      middleName: {
        $toLower: '$middleName',
      },
      suffix: {
        $toLower: '$suffix',
      },
      birthDate: '$birthDate',
      gender: {
        $toLower: '$gender',
      },
      civilStatus: {
        $toLower: '$civilStatus',
      },
      citizenship: {
        $toLower: '$citizenship',
      },
      religion: {
        $toLower: '$religion',
      },
      personalContactNumber: {
        $toLower: '$personalContactNumber',
      },
      personalEmail: {
        $toLower: '$personalEmail',
      },
      companyContactNumber: {
        $toLower: '$companyContactNumber',
      },
      companyEmail: {
        $toLower: '$companyEmail',
      },
      position: {
        $toLower: '$position',
      },
      department: {
        $toLower: '$department',
      },
      reportsTo: {
        $toLower: '$reportsTo',
      },
      dateHired: '$dateHired',
      dateInactive: '$dateInactive',
      endOfProbationary: '$endOfProbationary',
      contractEndDate: '$contractEndDate',
      rank: {
        $toLower: '$rank',
      },
      employmentStatus: {
        $toLower: '$employmentStatus',
      },
      employmentType: {
        $toLower: '$employmentType',
      },
      employeeBenefits: {
        $toLower: '$employeeBenefits',
      },
      sss: {
        $toLower: '$sss',
      },
      philHealth: {
        $toLower: '$philHealth',
      },
      pagIbig: {
        $toLower: '$pagIbig',
      },
      tin: {
        $toLower: '$tin',
      },
      NumberOfDependents: '$NumberOfDependents',
      taxExemption: {
        $toLower: '$taxExemption',
      },
      basicPay: '$basicPay',
      payRateType: '$payRateType',
      paymentMethod: {
        $toLower: '$paymentMethod',
      },
      payrollGroup: {
        $toLower: '$payrollGroup',
      },
      deductionSSS: {
        $toLower: '$deductionSSS',
      },
      deductPhilhealth: {
        $toLower: '$deductPhilhealth',
      },
      deductHMDF: {
        $toLower: '$deductHMDF',
      },
      fixedContributionRate: {
        $toLower: '$fixedContributionRate',
      },
      deductWithholdingTax: {
        $toLower: '$deductWithholdingTax',
      },
    },
  },
];
