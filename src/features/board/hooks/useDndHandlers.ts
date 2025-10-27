/* eslint-disable @typescript-eslint/no-unused-vars */

import type { DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDndHandlers = (boardId: number) => {
  const queryClient = useQueryClient();

  // 1️⃣ Mutacja React Query – update karty w Supabase
  const { mutate: updateCardPosition } = useMutation({
    mutationFn: async ({ cardId, updates }) => {
      // tutaj wywołamy np. updateCard(cardId, updates)
    },
    onMutate: () => {
      // optimistic update w cache'u
    },
    onSettled: () => {
      // odświeżenie danych po fakcie
    },
  });

  // 2️⃣ Główna funkcja obsługująca DnD
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    console.log("Dragged card:", active.id, "dropped over:", over.id);
  };

  return { handleDragEnd };
};
