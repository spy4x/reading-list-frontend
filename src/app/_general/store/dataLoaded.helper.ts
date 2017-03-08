import { Tag } from '../../authenticated/tags/tag.model';
import { Item } from '../../authenticated/items/item.model';
import { ItemsService } from '../../authenticated/items/items.service';
import { TagsService } from '../../authenticated/tags/tags.service';

export class DataLoadedHelper {
  /* tslint:disable:max-line-length */
  static link = (itemsMap: Map<string, Item>,
          tagsMap: Map<string, Tag>): {items: Map<string, Item>, tags: Map<string, Tag>} => {
    /* tslint:enable:max-line-length */

    return {
      items: ItemsService.linkToTagsPure(itemsMap, tagsMap),
      tags: TagsService.linkToItemsPure(tagsMap, itemsMap)
    };
  }
}
