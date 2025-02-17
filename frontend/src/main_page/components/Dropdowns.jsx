const times = [
    { value: 0, label: "8:00 am"},
    { value: 1, label: "8:30 am"},
    { value: 2, label: "9:00 am"},
    { value: 3, label: "9:30 am"},
    { value: 4, label: "10:00 am"},
    { value: 5, label: "10:30 am"},
    { value: 6, label: "11:00 am"},
    { value: 7, label: "11:30 am"},
    { value: 8, label: "12:00 pm"},
    { value: 9, label: "12:30 pm"},
    { value: 10, label: "1:00 pm"},
    { value: 11, label: "1:30 pm"},
    { value: 12, label: "2:00 pm"},
    { value: 13, label: "2:30 pm"},
    { value: 14, label: "3:00 pm"},
    { value: 15, label: "3:30 pm"},
    { value: 16, label: "4:00 pm"},
    { value: 17, label: "4:30 pm"},
    { value: 18, label: "5:00 pm"},
    { value: 19, label: "5:30 pm"},
    { value: 20, label: "6:00 pm"},
    { value: 21, label: "6:30 pm"},
    { value: 22, label: "7:00 pm"},
    { value: 23, label: "7:30 pm"},
    { value: 24, label: "8:00 pm"},
    { value: 25, label: "8:30 pm"},
]
const durations = [
    { value: 0, label: "0m"},
    { value: 1, label: "30m"},
    { value: 2, label: "1h"},
    { value: 3, label: "1h30"},
    { value: 4, label: "2h"},
    { value: 5, label: "2h30"},
    { value: 6, label: "3h"},
    { value: 7, label: "3h30"},
    { value: 8, label: "4h"},
    { value: 9, label: "4h30"},
    { value: 10, label: "5h"},
    { value: 11, label: "5h30"},
    { value: 12, label: "6h"},
]

function StartTimeSelect ({ value, parentHandler }) {

    return (
        <select value={value} onChange={ (e) => parentHandler(e.target.value) }>
            {times.map(time => (
                <option key={time.value} value={time.value}>
                    {time.label}
                </option>
            ))}
        </select>
    );

};

function DurationSelect ({ value, parentHandler }) {
    return (
        <select value={value} onChange={ (e) => parentHandler(e.target.value) }>
            {durations.map(duration => (
                <option key={duration.value} value={duration.value}>
                    {duration.label}
                </option>
            ))}
        </select>
    );
};

export {StartTimeSelect, DurationSelect}