export const FormatDateTime = ({data}) => {
    const date = new Date(data);
    const today = new Date();
  
    const isToday = date.toDateString() === today.toDateString();
  
    const options = isToday
      ? { hour: "numeric", minute: "numeric" }
      : { month: "long", day: "numeric", year: "numeric" };
  
    return date.toLocaleString("en-US", options);
  };
  