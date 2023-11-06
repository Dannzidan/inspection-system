import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditTasks from "../components/FormEditTasks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import FormAddSubTasks from "../components/FormAddSubtask";

const AddSubtasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormAddSubTasks />
    </Layout>
  );
};

export default AddSubtasks;
