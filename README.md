# Frontend Mentor Challenge - Todo app

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW "https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW").

## Table of contents

- [Overview](#overview)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
        - [dnd-kit](#dnd-kit)
- [Resources](#resources)
- [Acknowledgements](#acknowledgements)

## Overview

Users should be able to:

- View the optimal layout for the app depending on their device's screen size

- See hover states for all interactive elements on the page

- Add new todos to the list

- Mark todos as complete

- Delete todos from the list

- Filter by all/active/complete todos

- Clear all completed todos

- Toggle light and dark mode

- Drag and drop to reorder items on the list

Links:

- GitHub Repo: <https://github.com/xup60521/react-todo-with-drag-and-drop> 

- Live website: <https://xup60521.github.io/react-todo-with-drag-and-drop/>

```bash
# install dependencies
pnpm install
# start dev server
pnpm run dev
```

## My process

### Built with

- React (powered by vite)

- TailwindCSS

- jotai (state management)

- dnd-kit

### What I learned

#### dnd-kit

It’s my first time dealing with drag-and-drop functionality.

I watched [this tutorial](https://www.youtube.com/watch?v=dL5SOdgMbRY&t=631s), which helps a lot.

Basically, we need to define which area should be drag-and-droppable. In our case, it is the todo list.

Since our list should be sortable vertically, adding the corresponding element.

```tsx

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable"

<DndContext>
  <SortableContext items={todos}>
      {todos.map((item) => {
          return (
              <TodoItem item={item} key={`todo item ${item.id}`} />
          );
      })}
   </SortableContext>
 </DndContext>
```

After dragging, the item should be sorted to match its new position.

```tsx

import { arrayMove } from "@dnd-kit/sortable"

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
```

Also, we need to add sensor and collision detection to the context object

```tsx

import {
    closestCorners,
    useSensor,
    PointerSensor,
    useSensors,
    TouchSensor,
    KeyboardSensor,
} from "@dnd-kit/core";

import {
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    })
);
```

```tsx
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
```

In the individual item, we need to adjust its dragging behavior. Luckily compared to the list, it is much more simpler.

```tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });
const style = { transition, transform: CSS.Transform.toString(transform) };

return (
  <div 
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    style={style}
  >
    {/* ... */}
   </div>
)
```

By doing so, we successfully implement drag-and-drop in this todo app.

## Resources

- dnd-kit docs - <https://docs.dndkit.com/>

- Google font - <https://fonts.google.com>

- TailwindCSS Docs - <https://tailwindcss.com/docs>

## Acknowledgements

- dnd-kit tutorial - <https://www.youtube.com/watch?v=dL5SOdgMbRY&t=631s>