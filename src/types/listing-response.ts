export interface ListingResponse<T> {
  count: number;
  results: T[];
  next?: string;
  previous?: string;
}
