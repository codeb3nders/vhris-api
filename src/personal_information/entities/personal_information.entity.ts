import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonalInformation = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  personalId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  middleName: string;

  @Prop()
  suffix: string;

  @Prop({ required: true })
  citizenship: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  personalContactNumber: string;

  @Prop({ required: true, unique: true })
  personalEmail: string;

  @Prop({ type: JSON })
  presentAddress: {
    address: string;
    city: string;
    zipCode: string;
    region: string;
    country: string;
  };

  @Prop({ type: JSON })
  permanentAddress: {
    address: string;
    city: string;
    zipCode: string;
    region: string;
    country: string;
  };

  @Prop({ type: JSON })
  educationalBackground: [
    {
      level:
        | 'Elementary'
        | 'Secondary'
        | 'Tertiary'
        | 'Post'
        | 'Graduate'
        | 'Others';
      yearFrom: number;
      yearTo: number;
      schoolAndAddress: string;
      degree: string;
      honors: string;
    },
  ];

  @Prop({ type: JSON })
  employmentRecords: [
    {
      yearFrom: number;
      yearTo: number;
      companyName: string;
      positionHeld: string;
    },
  ];

  @Prop({ type: JSON })
  govtProfExamsPassed: [
    {
      examTitle: string;
      dateTaken: Date;
      rating: string;
    },
  ];

  @Prop({ type: JSON })
  licensesCertifications: [
    {
      name: string;
      authorizingEntity: string;
      validUntil: Date;
      licenseCertNo: string;
    },
  ];

  @Prop({ type: JSON })
  familyBackground: [
    {
      name: string;
      relation: string;
      occupation: string;
      company: string;
      residence: string;
    },
  ];

  @Prop({ required: true, type: JSON })
  emergencyContact: [
    {
      name: string;
      address: string;
      phoneNumber: string;
    },
  ];
}

export const PersonalInformationSchema = SchemaFactory.createForClass(Employee);
