import { FC } from "react";
import { Box, Button, Container, Modal, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CloseOutlined } from "@mui/icons-material";

import { Blog } from "../types";

type Props = {
  data?: Blog;
  header: string;
  isOpen: boolean;
  onModalClose(): void;
  onSubmit: SubmitHandler<FieldValues>;
};

const DeleteModal: FC<Props> = ({ header, isOpen, onSubmit, onModalClose }) => {
  const { reset } = useForm();

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        reset({ title: "", content: "" });
        onModalClose();
      }}
    >
      <Container
        sx={{
          minHeight: "20rem",
          maxHeight: "85%",
          padding: "2rem",
          background: "white",
          marginTop: "2rem",
          overflow: "auto",
        }}
      >
        <Box textAlign="right">
          <CloseOutlined onClick={onModalClose} sx={{ cursor: "pointer" }} />
        </Box>
        <h1>{header}</h1>
        <Box display="flex" alignItems="flex-end">
          <Button
            type="submit"
            onClick={onSubmit}
            variant="contained"
            color="primary"
            sx={{
              width: 300,
              alignSelf: "end",
              marginTop: "1rem",
            }}
          >
            Yes
          </Button>
          <Button
            onClick={onModalClose}
            variant="contained"
            color="secondary"
            sx={{
              width: 300,
              alignSelf: "end",
              marginTop: "1rem",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default DeleteModal;
