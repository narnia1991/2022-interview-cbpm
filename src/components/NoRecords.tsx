import { FC } from "react";

import styled from "@emotion/styled";

const NoRecordsContainer = styled.div`
  font-size: 5rem;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
`;

const NoRecords: FC = () => {
  return <NoRecordsContainer>No Record/s Found</NoRecordsContainer>;
};
export default NoRecords;
