import { format } from "date-fns";
import { FieldValues } from "react-hook-form";
import { Blog } from "../types";

export const dataToBlog = (data: any, id: string): Blog => ({
  title: data.title,
  content: data.content,
  dateCreated: data.dateCreated,
  id,
  isActive: data.isActive,
});

export const blogToData = (data: FieldValues) => ({
  title: data.title,
  content: data.content,
  dateCreated: format(
    data.dateCreated ? new Date(data.dateCreated) : new Date(),
    "yyyy-MM-dd hh:mm:ss"
  ),
  dateUpdated: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
  isActive: data.isActive === false ? false : true,
});
