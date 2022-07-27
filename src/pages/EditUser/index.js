import React from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  let { code } = useParams();
  return (
    <>
      <div>Edit user have code -{code}</div>
    </>
  );
};

export default EditUser;
