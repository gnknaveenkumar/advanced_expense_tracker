import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (transactions: any[], fileName: string): void => {
  if (transactions.length === 0) {
    alert("No data to export!");
    return;
  }

  const formattedData = transactions.map((txn) => ({
    Date: txn.date,
    Category: txn.category,
    Amount: txn.amount,
    Type: txn.type,
  }));

  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transaction Data");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(dataBlob, `${fileName}.xlsx`);
};
