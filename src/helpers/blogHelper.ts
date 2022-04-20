import { format } from "date-fns";
import { Blog } from "../types";

export const dataToBlog = (data: any): Blog => {
  console.log(data.dateCreated, new Date(data.dateCreated));
  return {
    title: data.title,
    content: data.content,
    dateCreated: format(new Date(data.dateCreated), "yyyy-MM-dd hh:mm:ss"),
  };
};
