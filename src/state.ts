
import type { Theme, TodoType } from "./type";
import { atomWithStorage } from "jotai/utils";

const STORAGE_KEY =
    "9e2cc294-919c-4cc2-a8a0-cd2c3f6b2ee5_";

export const TodosAtom = atomWithStorage<TodoType[]>(STORAGE_KEY+"react-todo-with-drag-and-drop", []);
export const ThemeAtom = atomWithStorage<Theme>(STORAGE_KEY+"theme", "white")