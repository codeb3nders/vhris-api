import { withEnumValuesList } from 'src/enums/employee.enum';
import { Employee_history } from '../entities/employee_history.entity';

export const EmployeeHistoryResponseHandler = {
  ok: (data: Employee_history[]) => {
    if (data.length > 0) {
      return data.map((item: any) => {
        return returnItem(item);
      });
    } else {
      return returnItem(data);
    }
  },
};

export const ResponseHandler = {
  ok: (data: Employee_history) => {
    return returnItem(data);
  },
};

function returnItem(data) {
  const toReturn: any = {
    employeeNo: data.employeeNo,
    timestamp: data.timestamp,
    type: data.type,
    details: prepareDetails(data),
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

function getReportToDetails(items: any) {
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

const prepareDetails = (data: any) => {
  const object = {};
  const { details } = data;
  Object.keys(details).map((item) => {
    if (withEnumValuesList.includes(item)) {
      object[item] = prepareEnumItem(data[`${item}Enum`]);
    } else {
      object[item] = details[item];
    }
  });
  return object;
};
