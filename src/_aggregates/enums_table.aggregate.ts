import { aggregateFormatDate } from 'src/_aggregates/helper.aggregate';

export class AggregateEnumsTable {
  values() {
    return [
      {
        $set: {
          lastModifiedDate: aggregateFormatDate('lastModifiedDate'),
          name: { $toUpper: '$name' },
          code: { $toUpper: '$code' },
        },
      },
    ];
  }
}
