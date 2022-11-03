import { CreateUserCredentialDto } from 'src/user_credentials/dto/create-user_credential.dto';
import { UserCredential } from 'src/user_credentials/entities/user_credential.entity';
import { BaseResponseHandler } from './base_handler.response';

export class UserCredentialResponseHandler extends BaseResponseHandler {
  ok(data: CreateUserCredentialDto | CreateUserCredentialDto[]) {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        return this.returnItem(item, this.items(item));
      });
    } else {
      return this.returnItem(data, this.items(data));
    }
  }
  private items = (item: any) => {
    return {
      accessGroup: item.accessGroup,
      isActive: item.isActive,
    };
  };
}
