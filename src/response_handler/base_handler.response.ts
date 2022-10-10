export class BaseResponseHandler<T> {
  ok(data: T[]) {
    if (data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item);
      });
    } else {
      this.returnItem(data);
    }
  }

  private returnItem = (item: any) => {
    const toReturn: any = {
      id: item._id,
      employeeNo: item.employeeNo,
      timestamp: item.timestamp,
    };

    return toReturn;
  };

  private prepareEnumItem = (item: any, isArray = false) => {
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
}
