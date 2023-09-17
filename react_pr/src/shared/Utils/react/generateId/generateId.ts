// import { assineId } from "./assineId";
import { assoc } from "../../js/assoc";
import { generateRandomIndex } from "./generateRandomIndex";

export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomIndex())(obj);
