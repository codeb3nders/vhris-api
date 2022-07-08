import { Prop, SchemaFactory } from "@nestjs/mongoose"

export type LeaveTypesDocument = Leave_types & Document

export class Leave_types {

    @Prop({ required: true, unique: true })
    typeId: string;
    @Prop()
    typeCode: string[]
    @Prop()
    typeName: string[]
   
}

export const LeaveTypesSchema = SchemaFactory.createForClass(Leave_types);
