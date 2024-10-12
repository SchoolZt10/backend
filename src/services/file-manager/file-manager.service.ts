import { Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';
import { env } from 'process';

@Injectable()
export class FileManagerService {
  private readonly _folderPath =
    env['NODE_ENV'] === 'development' ? './cdn' : '/app/cdn';

  async readFile(path: string): Promise<any> {
    return fs.readFile(this._folderPath + path, { encoding: 'utf-8' });
  }

  async writeFile(path: string, content: string | Buffer): Promise<void> {
    await fs.writeFile(this._folderPath + path, content);
  }

  async deleteFile(path: string): Promise<void> {
    await fs.unlink(this._folderPath + path);
  }

  async existsFile(path: string): Promise<boolean> {
    try {
      await fs.access(this._folderPath + path);
      return true;
    } catch (e) {
      return false;
    }
  }
}