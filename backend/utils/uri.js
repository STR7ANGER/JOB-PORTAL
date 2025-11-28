import DatauriParser from "datauri/parser.js";
import path from "path";



export const dataUri = (file) => {
    const parser = new DatauriParser();
    const extension = path.extname(file.originalname).toString();
    return parser.format(extension, file.buffer);
};