import React from "react";
import "./index.scss"
import {useSelector} from "react-redux"
import AddTaskButton from "./addTask";
import axios from "axios";
import AllTasks from "./TasksTable";
import EditProfile from "./editProfile";
import PieChart from "./PieChart";

import TodayEmployee from "./todayEmployee"; 

function EmployeeDashboard(){
    var date = new Date();
    var [addTaskShow, setAddTask] = React.useState(false);
    var [editProfileShow, setEditProfile] = React.useState(false);
    var isLoggedIn = useSelector((state) => state.isLoggedIn);
    var email = useSelector((state) => state.Email);
    var [allTasks, setAllTasks] = React.useState([]);
    var [dateWise, setDateWise] = React.useState(date)

    React.useEffect(() => {
        getAllTasks();
    }, [])

    const getAllTasks =  async () => {
        var data = {email};
        var response = await axios.post("/getTasksForEmployee", data)


        // console.log(response);
        setAllTasks(response.data);
    }

    function handleEdit(){
        setEditProfile(false);
        setAddTask(!addTaskShow);
    }

    function handlePress() {
      setAddTask(false);
      setEditProfile(!editProfileShow);
    }

    if(isLoggedIn == false){
        return (
            <div>
                Please Login to Be here
            </div>
        )
    }
    else return (
        <main>
            <div className="employee-dashboard">
                <div className="today-task">
                    <div className="h3">
                        <h3>Today’s Tasks</h3>
                    </div>
                    <div className="edit">
                        <button className="edit-button button" onClick={handlePress}>
                        Edit Profile
                        </button>
                    </div>
                    <div className="addtask">
                        <button className="add-button button" onClick={handleEdit}>
                            + Add Task
                        </button>
                    </div>
                    <div className="alltask">
                        <AllTasks props={allTasks} />
                    </div>
                </div>
                <div className="today-graph">
                    <div className="h3"><h3>Today’s Stats</h3></div>
                    <div style={{"width":"500px"}}>
                        <TodayEmployee props={allTasks} />
                    </div>
                </div>
                <div className="weekly-graph">
                <div className="h3"><h3>Weekly Stats</h3></div>
                    <div style={{"width":"500px"}}>
                        {/* <weekly props = {allTasks}/> */}
                    </div>
                </div>
                <div className="select-graph">
                <div className="h3"><h3>Day-wise Stats</h3></div>
                    <form action="">
                        <input type="date" name="" id="" 
                        value = {dateWise}
                        onChange={(e) => setDateWise(e.target.value)}/>
                    </form>
                    <div style={{"width":"500px"}}>
                        <TodayEmployee props={allTasks} />
                    </div>
                </div>
            </div>
            {editProfileShow && <EditProfile props = {handlePress}/>}
            {addTaskShow && <AddTaskButton props = {handleEdit}/>}
        </main>
      );
  }
  
  export default EmployeeDashboard;