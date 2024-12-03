import { Injectable } from "@nestjs/common";
import { IFileManager } from "./file-manager.abstract";
import { LocalFileManager } from "./implementations/LocalFileManager";


@Injectable()
export class FileManagerService {
  private readonly fileManager: IFileManager = new LocalFileManager();

  async readFile(path: string): Promise<any> {
    return await this.fileManager.readFile(path);
  }

  async writeFile(path: string, content: string | Buffer): Promise<void> {
    return await this.fileManager.writeFile(path, content);
  }

  async deleteFile(path: string): Promise<void> {
    return await this.fileManager.deleteFile(path);
  }

  async existsFile(path: string): Promise<boolean> {
    return await this.fileManager.existsFile(path);
  }
}