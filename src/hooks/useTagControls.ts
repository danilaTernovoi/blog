import { useCallback, useState } from "react";

interface Tag {
  id: number;
  name: string;
}

const useTagControls = () => {
  const [tagList, setTagList] = useState<Tag[]>([]);

  const addTagField = useCallback(() => {
    setTagList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
      },
    ]);
  }, []);

  const deleteTag = useCallback((id: number) => {
    setTagList((prev) => prev.filter((tag) => tag.id !== id));
  }, []);

  return {
    tagList,
    addTagField,
    deleteTag,
    setTagList,
  };
};

export default useTagControls;
