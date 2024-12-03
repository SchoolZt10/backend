export interface IFileManager {
  readFile(path: string): Promise<any>;
  writeFile(path: string, content: string | Buffer): Promise<void>;
  deleteFile(path: string): Promise<void>;
  existsFile(path: string): Promise<boolean>;
}
