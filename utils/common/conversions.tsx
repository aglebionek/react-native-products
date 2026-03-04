import { ProductCategory, Transaction } from "@/@types";
import { string2Date } from ".";

export const csv2Json = (csv: string, headers: string[]) => {
    const lines = csv.split('\n');
    const jsonData = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const jsonObject: { [key: string]: string } = {};
        headers.forEach((header, index) => {
            jsonObject[header] = values[index] || '';
        });
        return jsonObject;
    });
    return jsonData;
}

export const convertCsvTransactions2Json = (csv: string) => {
    const headers = ['date', 'time', 'productCategory', 'productName', 'productQuantity'];
    const jsonData = csv2Json(csv, headers);

    const transactions = jsonData.map((item) => {
        const timestamp = string2Date(item.date, item.time);
        
        return {
            timestamp,
            productCategory: item.productCategory as ProductCategory,
            productName: item.productName,
            productQuantity: parseInt(item.productQuantity, 10) || 0,
        }
    });

    return transactions as Transaction[];
}