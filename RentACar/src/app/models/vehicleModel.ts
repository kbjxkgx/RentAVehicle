export class VehicleModel {
    Id: number;
    Model: string;
    Manufacturer: string;
    YearOfProduction: number;
    Description: string;
    Type: string;
    IsAvailable = false;
    VehicleServiceId: number;
    TypeId: number;
    Images: any[];
    PricePerHour: number;
}
