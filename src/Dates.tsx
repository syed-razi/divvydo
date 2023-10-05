import DatePicker from "react-datepicker";

export default function Dates({
  startDate,
  endDate,
  estimatedHours,
  setEstimatedHours,
  onStartChange,
  onEndChange,
}) {
  return (
    <div className="flex h-screen w-screen snap-center flex-col items-center justify-center space-y-10">
      <h2 className="text-2xl">Enter Assignment Details:</h2>
      <i>
        Enter the start and end date of your assignment as well as how long you
        think it should take you to complete
      </i>
      <div className="flex flex-col items-end justify-center space-y-3">
        <div>
          <label>
            Start Date:&nbsp;
            <DatePicker
              className="border"
              selected={startDate}
              onChange={(date) => {
                onStartChange(date);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        </div>
        <div>
          <label>
            End Date:&nbsp;
            <DatePicker
              className="border"
              selected={endDate}
              onChange={(date) => {
                onEndChange(date);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </label>
        </div>
        <div>
          <label>
            Estimated hours:&nbsp;
            <input
              className="border"
              type="number"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              min="0"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
