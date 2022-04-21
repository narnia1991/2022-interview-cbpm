import { FC, useCallback } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { blogToData } from "../helpers/blogHelper";
import { Blog } from "../types";
import { cName } from "./Landing";
import DeleteModal from "../components/DeleteModal";

type Props = {
  isOpen: boolean;
  onClose(): void;
  dataId: string;
  oldData: Blog;
  onSuccess(): void;
};

const DeletePostModal: FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  dataId,
  oldData,
}) => {
  const deletePost = async () => {
    try {
      const oldDataRef = doc(db, cName, dataId);
      await updateDoc(oldDataRef, { ...blogToData(oldData), isActive: false });
      onClose();
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DeleteModal
      onSubmit={deletePost}
      isOpen={isOpen}
      onModalClose={onClose}
      header="Delete this Post?"
    />
  );
};

export default DeletePostModal;
