import { FC, useCallback, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FieldValues, useForm } from "react-hook-form";

import { db } from "../firebase";
import { blogToData } from "../helpers/blogHelper";
import BlogModal from "../components/BlogModal";

type Props = {
  isOpen: boolean;
  onClose(): void;
  onSuccess(): void;
};

const CreatePostModal: FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const blogCollectionRef = collection(db, "blogList");
  const { reset } = useForm();

  const createPost = async (data: FieldValues) => {
    try {
      await addDoc(blogCollectionRef, blogToData(data));
      reset({});
      onClose();
      onSuccess();
    } catch (err) {
      console.log(err);
      // noop
    }
  };

  const closeModal = useCallback(() => {
    reset({});
    onClose();
  }, []);

  return (
    <BlogModal
      onSubmit={createPost}
      isOpen={isOpen}
      onModalClose={closeModal}
      header="Create Post"
    />
  );
};

export default CreatePostModal;
