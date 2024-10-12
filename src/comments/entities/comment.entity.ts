import { Exclude, Expose } from "class-transformer";
import { format, formatRelative, subDays } from 'date-fns'
import { uk } from 'date-fns/locale'

export class CommentEntity {
  id: string;
  username: string;
  @Exclude()
  email: string;
  comment: string;
  @Exclude()
  postId: string;
  @Exclude()
  createdAt: Date;

  @Expose({ name: 'createdAt' })
  _createdAt() {
    return formatRelative(subDays(this.createdAt, 0), new Date(), { locale: uk })
  }

  @Expose()
  timestamp() {
    return format(this.createdAt, 'yyyy-MM-dd HH:mm:ss')
  }

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}
