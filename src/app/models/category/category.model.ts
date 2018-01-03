import { Image } from '../image.model';

export class Category {

  public type: string;
  public hasOnlineProducts: boolean;
  public hasOnlineSubCategories: boolean;
  public online: string;
  public description: string;
  public subCategoriesCount?: number;
  public images?: Image[];
  public subCategories?: Category[];
  public uri?: string;

  constructor(public id: string, public name: string) { }

  /**
   * Helper function to compare two categories
   * @param category   The category to be compared with the object.
   * @returns          True if the categories are equal, false if not.
   *                   'equal' means
   *                   - both categories are defined
   *                   - the id of the categories is the same
   */
  equals(category: Category): boolean {
    return !!category && this.id === category.id;
  }
}