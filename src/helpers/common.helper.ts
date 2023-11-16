import { GOLD_RANK, SILVER_RANK } from "src/constants";

export function pointCalculate(rank: number|string, orderValue: number = 0) {
    let pointPerHundred: number = 0;
    
    switch (rank) {
        case SILVER_RANK:
            pointPerHundred = 10;

            break;
        case GOLD_RANK:
            pointPerHundred = 15;

            break;
        default:
            pointPerHundred = 5;

            break;
    }

    return (orderValue / 100000 * pointPerHundred);
}