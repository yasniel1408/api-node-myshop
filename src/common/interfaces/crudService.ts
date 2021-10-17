export interface CRUDService {
  findAll(limit: number, page: number): Promise<any>;
  create(resource: any): Promise<any>;
  editById(id: string, resource: any): Promise<string>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<string>;
  patchById(id: string, resource: any): Promise<string>;
}
