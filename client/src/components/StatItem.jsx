import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatItem";
const StatItem = ({ count, title, icon, color, bcg, onClick }) => {
 
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">
          {icon}
        </span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
