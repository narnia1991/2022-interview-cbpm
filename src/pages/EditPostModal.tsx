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
};

const EditPostModal: FC<Props> = ({ oldData, isOpen, onClose, dataId }) => {
  const editPost = (data: FieldValues) => {
    const oldDataRef = doc(db, cName, dataId);
    try {
      updateDoc(oldDataRef, blogToData({ ...oldData, ...data }));
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(dataId);

  return (
    <BlogModal
      onSubmit={editPost}
      isOpen={isOpen}
      onModalClose={onClose}
      header="Edit Post"
      data={oldData}
    />
  );
};

export default EditPostModal;
