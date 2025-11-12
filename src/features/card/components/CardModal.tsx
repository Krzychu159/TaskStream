import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useCardModal } from "@/features/card/state/useCardModal";
import { useCard } from "../hooks/useCard";
import { useUpdateCard } from "../hooks/useUpdateCard";
import { useDeleteCard } from "../hooks/useDeleteCard";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { ui } from "@/ui/styles";
import { InlineLoader } from "@/ui/InlineLoader";
import CommentList from "@/features/comment/components/CommentList";
import CommentForm from "@/features/comment/components/CommentForm";
import { usePermissions } from "@/features/auth/hooks/usePermissions";
import PrioritySelector from "./PrioritySelector";

export default function CardModal() {
  const { openCardId, close } = useCardModal();
  const { data: card } = useCard(openCardId);

  const { mutateAsync: updateCard, isPending: isUpdating } = useUpdateCard(
    card?.board_id || 0
  );
  const { mutateAsync: deleteCard } = useDeleteCard(card?.board_id || 0);

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState(card?.title || "");

  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [description, setDescription] = useState(card?.description || "");

  const [isDeleting, setIsDeleting] = useState(false);

  const { canEditCard, canDeleteCard } = usePermissions();

  const handleUpdate = async () => {
    if (!card) return;
    if (title.trim() === "") {
      toast.error("Title cannot be empty");
      setTitle(card.title);
      return;
    }

    try {
      await updateCard({ cardId: card.id, updates: { title } });
      setIsTitleEditing(false);
      setTitle(card.title);
      toast.success("Card updated successfully!");
    } catch (err) {
      toast.error("Failed to update card");
      console.error("Failed to update card:", err);
    }
  };

  const handleUpdateDescription = async () => {
    if (!card) return;
    if (description.trim() === "") {
      toast.error("Description cannot be empty");
      setDescription(card.description || "");
      return;
    }

    try {
      await updateCard({ cardId: card.id, updates: { description } });
      setIsDescriptionEditing(false);
      setDescription(description);
      toast.success("Card updated successfully!");
    } catch (err) {
      toast.error("Failed to update card");
      console.error("Failed to update card:", err);
    }
  };

  const handleDelete = async () => {
    if (!card) return;
    setIsDeleting(true);
    try {
      await deleteCard(card?.id);
      toast.success("Card deleted successfully!");
      close();
    } catch (err) {
      toast.error("Failed to delete card");
      console.error("Failed to delete card:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!openCardId) return null;

  return (
    <Transition show={!!openCardId} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              {!card ? (
                <div className="flex justify-center py-8">
                  <InlineLoader />
                </div>
              ) : (
                <>
                  <Dialog.Title className="text-xl font-semibold mb-2">
                    {isTitleEditing ? (
                      <input
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        onBlur={handleUpdate}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate();
                          if (e.key === "Escape") {
                            setTitle(card.title);
                            setIsTitleEditing(false);
                          }
                        }}
                        className={`${ui.input} ${
                          isUpdating ? "opacity-50" : ""
                        } w-full mr-2`}
                        autoFocus
                        disabled={isUpdating}
                      />
                    ) : (
                      <p
                        className="font-medium cursor-text"
                        onClick={() => {
                          if (canEditCard(card)) {
                            setIsTitleEditing(true);
                          } else {
                            toast.error(
                              "You do not have permission to edit this card's title."
                            );
                          }
                        }}
                      >
                        {card.title}
                      </p>
                    )}
                  </Dialog.Title>

                  {isDescriptionEditing ? (
                    <textarea
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      onBlur={handleUpdateDescription}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleUpdateDescription();
                        }
                        if (e.key === "Escape") {
                          setDescription(card.description || "");
                          setIsDescriptionEditing(false);
                        }
                      }}
                      className={`${ui.input} ${
                        isUpdating ? "opacity-50" : ""
                      } w-full mr-2 h-24`}
                      autoFocus
                      disabled={isUpdating}
                    />
                  ) : (
                    <div
                      className=" text-gray-600 text-sm mb-4 text-wrap cursor-text whitespace-pre-wrap"
                      onClick={() => {
                        if (canEditCard(card)) {
                          setIsDescriptionEditing(true);
                        } else {
                          toast.error(
                            "You do not have permission to edit this card's description."
                          );
                        }
                      }}
                    >
                      {card.description || "No description"}
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-gray-500 pb-1">Priority</div>
                    <PrioritySelector
                      cardId={card.id}
                      boardId={card.board_id}
                      current={card.priority}
                    />
                  </div>

                  <CommentList cardId={card.id} />
                  <CommentForm cardId={card.id} />

                  {!isDeleting ? (
                    <div className="flex gap-3">
                      <button
                        onClick={close}
                        className={`${ui.button.base} ${ui.button.secondary} mt-4`}
                      >
                        Close
                      </button>

                      <button
                        onClick={() => {
                          if (canDeleteCard(card)) {
                            handleDelete();
                          } else {
                            toast.error(
                              "You do not have permission to delete this card."
                            );
                          }
                        }}
                        className={`${ui.button.base} ${
                          ui.button.danger
                        } mt-4 ${
                          isDeleting || !canDeleteCard(card)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <InlineLoader />
                  )}
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
