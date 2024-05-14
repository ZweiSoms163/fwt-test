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
