export interface Paintings {
  locationName: string;
  authorName: string;
  id: number;
  name: string;
  imageUrl: string;
  authorId: number;
  locationId: number;
  created: string;
}
export interface Authors {
  id: number;
  name: string;
}
export interface Locations {
  id: number;
  location: string;
}
export type OptionType = {
  value: number;
  label: string;
};
export interface FiltersState {
  searchQuery: string;
  authorFilter: string | null;
  locationFilter: string | null;
  startDate: string | null;
  endDate: string | null;
  pageFilter: number;
}
