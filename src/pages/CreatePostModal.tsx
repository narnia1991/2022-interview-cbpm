import { FC, useCallback, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FieldValues, useForm } from "react-hook-form";

import { db } from "../firebase";
import { blogToData } from "../helpers/blogHelper";
import BlogModal from "../components/BlogModal";

type Props = {
  isOpen: boolean;
  onClose(): void;
};

const CreatePostModal: FC<Props> = ({ isOpen, onClose }) => {
  const blogCollectionRef = collection(db, "blogList");

  const createPost = (data: FieldValues) => {
    try {
      console.log(blogToData(data));
      addDoc(blogCollectionRef, blogToData(data));
      onClose();
    } catch (err) {
      console.log(err);
      // noop
    }
  };

  return (
    <BlogModal
      onSubmit={createPost}
      isOpen={isOpen}
      onModalClose={onClose}
      header="Create Post"
    />
  );
};

export default CreatePostModal;
