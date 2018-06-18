import { ItemModel } from './ItemModel';

export class PricelistModel {
    BeginTime: Date;
    EndTime: Date;
    Items: ItemModel[];
    PricelistServiceId: number;
}
