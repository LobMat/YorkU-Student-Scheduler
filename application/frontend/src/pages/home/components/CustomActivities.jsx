import { useMainContext } from "../HomePage";
import { act, React, useState } from "react";


const CustomActivities = (props) => {
    const { hooks: { customActivityList } } = useMainContext();
    const [activityName, setActivityName] = useState("");
    const [startTime, setStartTime] = useState(-1);
    const [endTime, setEndTime] = useState(0);
    const [customVisible, setCustomVisible] = useState(false);
    const [selectedWeekdays, setSelectedWeekdays] = useState([]);
    const [selectedSemesters, setSelectedSemesters] = useState([]);

    const times = [
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM", "9:00 PM"
    ];

    const days = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays"];

    const semesters = { F: 'Fall', W: 'Winter' };

    const handleDelete = (activity) => {
        props.onRemoveAct((activity));
    }

    const handleWeekdayChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedWeekdays([...selectedWeekdays, value]);
        } else {
            setSelectedWeekdays(selectedWeekdays.filter(day => day !== value));
        }
    };

    const handleSemesterChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSemesters([...selectedSemesters, value]);
        } else {
            setSelectedSemesters(selectedSemesters.filter(semester => semester !== value));
        }

    }

    const handleSubmit = () => {
        if (!activityName || !startTime || !endTime || selectedSemesters.length === 0 || selectedWeekdays.length === 0) {
            alert("Please fill out all fields.");
            return;
        }
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        if (start >= end) {
            alert("Start time must be before end time.");
            return;
        }
        props.onSubmit(({
            name: activityName,
            start: (parseInt(startTime)),
            end: (parseInt(endTime)),
            weekdays: selectedWeekdays.map(weekday => parseInt(weekday)),
            semesters: selectedSemesters
        }));
        setActivityName("")
        setStartTime(-1)
        setEndTime(0)
        setSelectedWeekdays([])
        setSelectedSemesters([])
        setCustomVisible(false)
    }



    return (
        <>
            <div className="custom-box-container" >
                <button className="toggle-button" style={{ display: !customVisible ? 'flex' : 'none' }} onClick={() => setCustomVisible(true)}>Add Custom Activity</button>
                <div className="custom-box" style={{ display: customVisible ? 'flex' : 'none' }}>
                    <p >Enter Custom Activity</p>
                    <div className="box-head">
                        <input className="custom-input"
                            type="text"
                            placeholder="Activity Name:"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                        >
                        </input>
                        <div className="timeContainer">
                            <select className="dropdown" value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                                <option value={-1}>Start Time</option>
                                <option value={0}>8:00 AM</option>
                                <option value={1}>8:30 AM</option>
                                <option value={2}>9:00 AM</option>
                                <option value={3}>9:30 AM</option>
                                <option value={4}>10:00 AM</option>
                                <option value={5}>10:30 AM</option>
                                <option value={6}>11:00 AM</option>
                                <option value={7}>11:30 AM</option>
                                <option value={8}>12:00 PM</option>
                                <option value={9}>12:30 PM</option>
                                <option value={10}>1:00 PM</option>
                                <option value={11}>1:30 PM</option>
                                <option value={12}>2:00 PM</option>
                                <option value={13}>2:30 PM</option>
                                <option value={14}>3:00 PM</option>
                                <option value={15}>3:30 PM</option>
                                <option value={16}>4:00 PM</option>
                                <option value={17}>4:30 PM</option>
                                <option value={18}>5:00 PM</option>
                                <option value={19}>5:30 PM</option>
                                <option value={20}>6:00 PM</option>
                                <option value={21}>6:30 PM</option>
                                <option value={22}>7:00 PM</option>
                                <option value={23}>7:30 PM</option>
                                <option value={24}>8:00 PM</option>
                                <option value={25}>8:30 PM</option>
                            </select>


                            <select className="dropdown" value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                                <option value={0}>End Time</option>
                                <option value={1}>8:30 AM</option>
                                <option value={2}>9:00 AM</option>
                                <option value={3}>9:30 AM</option>
                                <option value={4}>10:00 AM</option>
                                <option value={5}>10:30 AM</option>
                                <option value={6}>11:00 AM</option>
                                <option value={7}>11:30 AM</option>
                                <option value={8}>12:00 PM</option>
                                <option value={9}>12:30 PM</option>
                                <option value={10}>1:00 PM</option>
                                <option value={11}>1:30 PM</option>
                                <option value={12}>2:00 PM</option>
                                <option value={13}>2:30 PM</option>
                                <option value={14}>3:00 PM</option>
                                <option value={15}>3:30 PM</option>
                                <option value={16}>4:00 PM</option>
                                <option value={17}>4:30 PM</option>
                                <option value={18}>5:00 PM</option>
                                <option value={19}>5:30 PM</option>
                                <option value={20}>6:00 PM</option>
                                <option value={21}>6:30 PM</option>
                                <option value={22}>7:00 PM</option>
                                <option value={23}>7:30 PM</option>
                                <option value={24}>8:00 PM</option>
                                <option value={25}>8:30 PM</option>
                                <option value={26}>9:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div className="boxes">
                        <div className="picker">
                            <p>Weekdays:</p>
                            <div className="checks">
                                <div>
                                    <input type="checkbox" // type of input
                                        id="monday" // used to reference specific checkbox
                                        name="Weekday" // purpose of checkbox. used to group values together.
                                        value={0}
                                        onChange={handleWeekdayChange}
                                        checked={selectedWeekdays.includes("0")}
                                    />
                                    <label> Monday</label>
                                </div>
                                <div>
                                    <input type="checkbox"
                                        id="tuesday"
                                        name="Weekday"
                                        value={1}
                                        onChange={handleWeekdayChange}
                                        checked={selectedWeekdays.includes("1")}
                                    />
                                    <label > Tuesday</label>
                                </div>
                                <div>
                                    <input type="checkbox"
                                        id="wednesday"
                                        name="Weekday"
                                        value={2}
                                        onChange={handleWeekdayChange}
                                        checked={selectedWeekdays.includes("2")}
                                    />
                                    <label> Wednesday</label>
                                </div>
                                <div>
                                    <input type="checkbox"
                                        id="thursday"
                                        name="Weekday"
                                        value={3}
                                        onChange={handleWeekdayChange}
                                        checked={selectedWeekdays.includes("3")}
                                    />
                                    <label > Thursday</label>
                                </div>
                                <div>
                                    <input type="checkbox"
                                        id="friday"
                                        name="Weekday"
                                        value={4}
                                        onChange={handleWeekdayChange}
                                        checked={selectedWeekdays.includes("4")}
                                    />
                                    <label > Friday</label>
                                </div>
                            </div>
                        </div>
                        <div className="picker">
                            <p>Semester:</p>
                            <div className="checks">
                                <div>
                                    <input type="checkbox"
                                        id="fall"
                                        name="Semester"
                                        value="F"
                                        onChange={handleSemesterChange}
                                        checked={selectedSemesters.includes("F")}
                                    />
                                    <label> Fall</label>
                                </div>
                                <div>
                                    <input type="checkbox"
                                        id="winter"
                                        name="Semester"
                                        value="W"
                                        onChange={handleSemesterChange}
                                        checked={selectedSemesters.includes("W")}
                                    />
                                    <label > Winter</label>
                                </div>
                            </div>
                            <div className="buttons">
                                <button className="search-button2" onClick={handleSubmit}>Submit!</button>
                                <button className="cancel-button" onClick={() => setCustomVisible(false)}>Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div >

                <ul>
                    {customActivityList && customActivityList.length > 0 ? (
                        customActivityList.map((activity, index) => (
                            <div className="activity-list-item" key={index}>
                                <div className="item-info">
                                    <strong className = "activity-name">{activity.name}</strong> - {activity.semesters.map(sem => semesters[sem]).join(", ")}
                                    <p>{activity.weekdays.map(dayIndex => days[dayIndex]).join(", ")}</p>
                                    <p>{times[activity.start]} to {times[activity.end]}</p>
                                </div>
                                <div>
                                    <button className="toggle-button" onClick={() => handleDelete(activity)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </ul>

            </div>

        </>
    )
}

export default CustomActivities;