export class BaseResponseHandler {
  returnItem = (item: any, otherItem?: any) => {
    const toReturn: any = {
      id: item._id,
      employeeNo: item.employeeNo,
      timestamp: item.timestamp,
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
}
