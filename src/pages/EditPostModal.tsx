import { FC, useCallback, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FieldValues, useForm } from "react-hook-form";

import { db } from "../firebase";
import { blogToData } from "../helpers/blogHelper";
import BlogModal from "../components/BlogModal";
import { Blog } from "../types";
import { cName } from "./Landing";

type Props = {
  oldData: Blog;
  isOpen: boolean;
  onClose(): void;
  dataId: string;
  onSuccess(): void;
};

const EditPostModal: FC<Props> = ({
  oldData,
  isOpen,
  onClose,
  onSuccess,
  dataId,
}) => {
  const { reset } = useForm();
  const editPost = async (data: FieldValues) => {
    const oldDataRef = doc(db, cName, dataId);
    try {
      await updateDoc(oldDataRef, blogToData({ ...oldData, ...data }));
      reset({});
      onClose();
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = useCallback(() => {
    reset({});
    onClose();
  }, []);
  return (
    <BlogModal
      onSubmit={editPost}
      isOpen={isOpen}
      onModalClose={closeModal}
      header="Edit Post"
      data={oldData}
    />
  );
};

export default EditPostModal;
