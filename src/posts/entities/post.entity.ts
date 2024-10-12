import { Exclude, Expose } from "class-transformer";
import { formatRelative, subDays } from "date-fns";
import { uk } from "date-fns/locale";

export class PostEntity {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  categoryId: string | null;
  categoryName: string | null;
  image: string | null;
  slug: string;

  @Expose()
  createdAtLocale() {
    return formatRelative(subDays(this.createdAt, 0), new Date(), { locale: uk })
  }

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
