export interface IPaginationData {
  page: number;

  totalDocs: number;
  totalPages: number;

  hasNext: boolean;
  hasPrev: boolean;
}
