
import {
    DndContext,
    type DragEndEvent,
    closestCorners,
    useSensor,
    PointerSensor,
    useSensors,
    TouchSensor,
    KeyboardSensor,
} from "@dnd-kit/core";

import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import type { TodoType } from "../type";

export default function TodoList({todos, setTodos}:{todos: TodoType[], setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>}) {
    // const [todos, setTodos] = useAtom(TodosAtom);
    function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e;
        if (active.id === over?.id || !over) {
            return;
        }
        setTodos((prev) => {
            const originPos = prev.findIndex((d) => d.id === active.id);
            const newPos = prev.findIndex((d) => d.id === over.id);
            return arrayMove(prev, originPos, newPos);
        });
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
        >
            <SortableContext
                items={todos}
                strategy={verticalListSortingStrategy}
            >
                {todos.map((item) => {
                    return (
                        <TodoItem item={item} key={`todo item ${item.id}`} />
                    );
                })}
            </SortableContext>
        </DndContext>
    );
}
