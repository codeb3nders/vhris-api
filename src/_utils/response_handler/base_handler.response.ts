import { withEnumValuesList } from 'src/_utils/enums/employee.enum';

export class BaseResponseHandler {
  returnItem = (item: any, otherItem?: any) => {
    const toReturn: any = {
      id: item.id,
      employeeNo: item.employeeNo,
      timestamp: item.timestamp,
      lastModifiedDate: item.lastModifiedDate,
      ...otherItem,
    };

    return toReturn;
  };

  prepareEnumItem = (item: any, isArray = false) => {
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

  getReportToDetails(items: any) {
    if (!items || items.length < 1) {
      return null;
    }

    let item;
    if (Array.isArray(items)) {
      item = items[0];
    } else {
      item = items;
    }
    return {
      ...item,
      employeeName: `${item.firstName} ${item.lastName}`,
    };
  }

  prepareDetails(data: any) {
    const object = {};
    const { details } = data;
    Object.keys(details).map((item) => {
      if (withEnumValuesList.includes(item)) {
        object[item] =
          this.prepareEnumItem(data[`${item}Enum`]) || details[item];
      } else {
        object[item] = details[item];
      }
    });
    return object;
  }
}
