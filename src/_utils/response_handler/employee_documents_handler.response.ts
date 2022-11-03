import { CreateEmployeeDocumentDto } from 'src/employee_documents/dto/create-employee_document.dto';
import { BaseResponseHandler } from './base_handler.response';

export class EmployeeDocumentResponseHandler extends BaseResponseHandler {
  ok(data: CreateEmployeeDocumentDto | CreateEmployeeDocumentDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    const employee = item.employee;
    const toReturn: any = {
      documentType: this.prepareEnumItem(item.documentTypeEnum),
      dateUploaded: item.dateUploaded,
      url: item.url,
      remarks: item.remarks,
    };

    if (employee) {
      toReturn.employee = employee;
    }

    return toReturn;
  };
}
