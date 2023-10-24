import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "gantt-task-react/dist/index.css";
import { Gantt } from "gantt-task-react";
import moment from "moment"

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [taskList, setTaskList] = useState([]);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/tasks`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTaskList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const tasksWithUser = taskList.map((task, idx) => {
    const startDate = moment(task.startDate); // Parse using moment
  
    return {
      start: startDate.toDate(), // Convert back to JavaScript Date
      end: moment(task.endDate).toDate(), // Parse and convert end date
      name: task.name,
      user: task.user.name,
      type: "task",
      progress: 100,
      styles: {
        progressColor: "#ffbb54",
        progressSelectedColor: "#ff9e0d",
        ganttHeight: 100,
      },
    };
  });

  return (
    <div style={{ width: "50%" }}>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Selamat Datang Kembali <strong>{user && user.name}</strong>
      </h2>
      {taskList.length > 0 ? (
        <Gantt tasks={tasksWithUser} /> 
      ) : (
        <p>Loading tasks...</p>
      )}
    </div>
  );
};

export default Welcome;


// // yg berbayar
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import moment from "moment"
// // import CustomGanttChart from "./CustomGanttChart"; // Import your custom Gantt chart component
// import "gantt-task-react/dist/index.css";
// // import { Gantt } from "gantt-task-react";
// import { GanttComponent } from "@syncfusion/ej2-react-gantt";
// import "../App.css";
// const Welcome = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [taskList, setTaskList] = useState([]);
//   const tasksWithUser = taskList.map((task, idx) => {
//     return {
//       TaskID: idx + 1,
//       TaskName: task.name,
//       StartDate: new Date(moment(task.startDate)),
//       EndDate: new Date(moment(task.endDate)),
//       // subtasks: [
//       //   {
//       //     TaskID: 2,
//       //     TaskName: "Identify Site location",
//       //     StartDate: new Date("04/02/2019"),
//       //     Duration: 4,
//       //     Progress: 50,
//       //   },
//       //   {
//       //     TaskID: 3,
//       //     TaskName: "Perform Soil test",
//       //     StartDate: new Date("04/02/2019"),
//       //     Duration: 4,
//       //     Progress: 50,
//       //   },
//       //   {
//       //     TaskID: 4,
//       //     TaskName: "Soil test approval",
//       //     StartDate: new Date("04/02/2019"),
//       //     Duration: 4,
//       //     Progress: 50,
//       //   },
//       // ],
//     };
//   });

//   const taskFields = {
//     id: "TaskID",
//     name: "TaskName",
//     startDate: "StartDate",
//     endDate: "EndDate",

//     // duration: "Duration",
//     // progress: "Progress",
//     child: "subtasks",
//   };
//   const getTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios({
//         url: `${process.env.REACT_APP_BASE_URL}/tasks`,
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setTaskList(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   return (
//     <div style={{ width: "75%" }}>
//       <h1 className="title">Dashboard</h1>
//       <h2 className="subtitle">
//         Selamat Datang Kembali <strong>{user && user.name}</strong>
//       </h2>
//       {taskList.length > 0 ? (
//         <GanttComponent
//           dataSource={tasksWithUser}
//           height="450px"
//           taskFields={taskFields}
//         />
//       ) : (
//         <p>Loading tasks...</p>
//       )}
//     </div>
//   );
// };

// export default Welcome;
