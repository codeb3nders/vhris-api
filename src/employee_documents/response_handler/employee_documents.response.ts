import { EmployeeDocument } from 'src/employee_documents/entities/employee_document.entity';

export const employeeDocumentsResponseHandler = {
  ok: (data: EmployeeDocument[]) => {
    if (data.length > 0) {
      return data.map((item: any) => {
        return returnItem(item);
      });
    } else {
      return returnItem(data);
    }
  },
};

function returnItem(item) {
  const toReturn: any = {
    id: item._id,
    employeeNo: item.employeeNo,
    documentType: prepareEnumItem(item.documentTypeEnum),
    dateUploaded: item.dateUploaded,
    url: item.url,
    remarks: item.remarks,
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
