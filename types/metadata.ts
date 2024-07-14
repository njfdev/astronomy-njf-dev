import { ObjectType } from "./filtering";

export interface PhotoDetails {
  timeIsSpecified: boolean;
  telescopeName: string;
  exposureTime: string;
  catalogName: string;
  pictureDate: Date;
  pictureFolder: string;
  imagePath: string;
  readableName: string;
  readableDetailsString: string;
  objectDetails: ObjectDetails;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface PictureData {
  folder: string;
  photoDetails: PhotoDetails;
}

export interface ObjectDetails {
  name: string;
  objectType: ObjectType;
}
