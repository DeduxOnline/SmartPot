interface Plant {
    pictureNum: number;
    address: string,
    name: string;
    watering: {
        status: boolean;
        min: string;
        max: string;
    };
    light: {
        status: boolean;
        lux: string;
        timeRunH: string;
    };
}