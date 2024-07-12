import { CalendarDate } from "@internationalized/date";

export enum ObjectType {
  Galaxy = "Galaxy",
  Nebula = "Nebula",
  StarCluster = "Star Cluster",
  Lunar = "Lunar",
  Solar = "Solar",
  Eclipse = "Eclipse",
  Planetary = "Planetary",
}

export enum SortOption {
  DateDescending = "New -> Old",
  DateAscending = "Old -> New",
  AlphabeticallyAscending = "A -> Z",
  AlphabeticallyDescending = "Z -> A",
}

export enum Catalog {
  Messier = "Messier (M)",
  NGC = "New General Catalogue (NGC)",
  IC = "Index Catalogue (IC)",
  SH2 = "Sharpless Catalog (SH2)",
  Other = "Other",
}

export interface FilteringOptions {
  objectTypes: ObjectType[];
  sortOption: SortOption;
  catalogs: Catalog[];
  dateRangeStart?: CalendarDate;
  dateRangeEnd?: CalendarDate;
}
