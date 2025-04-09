import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  return (
    <footer>
      {goHomeButton}
      <p>Current user:</p>
      <p>Status: </p>
    </footer>
  );
};

export default DashFooter;
