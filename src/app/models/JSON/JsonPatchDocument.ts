export interface JsonPatchDocument {
  op: 'replace';
  path: string;
  value: any;
}
