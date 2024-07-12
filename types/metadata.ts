import { ObjectType } from "./filtering";

export interface PhotoDetails {
  timeIsSpecified: boolean;
  telescopeName: string;
  exposureTime: string;
  objectName: string;
  pictureDate: Date;
  pictureFolder: string;
  objectDetails: ObjectDetails;
}

export interface ObjectDetails {
  name: string;
  objectType: ObjectType;
}
