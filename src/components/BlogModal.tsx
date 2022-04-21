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

const BlogModal: FC<Props> = ({
  header,
  data,
  isOpen,
  onSubmit,
  onModalClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column">
            <TextField
              {...register("title", { required: true })}
              label="Title"
              variant="outlined"
              error={!!errors.title}
              helperText={`${!!errors.title ? "this field is required" : ""}`}
              defaultValue={data?.title}
            />
            <TextField
              {...register("content", { required: true })}
              label="Content"
              variant="outlined"
              multiline
              minRows={5}
              error={!!errors.content}
              helperText={`${!!errors.content ? "this field is required" : ""}`}
              defaultValue={data?.content}
              sx={{
                marginTop: "1rem",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 300,
                alignSelf: "end",
                marginTop: "1rem",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </Modal>
  );
};

export default BlogModal;
