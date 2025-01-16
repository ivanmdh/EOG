import DarkMode from "./DarkMode/DarkMode"
import MaximizeScreen from "./MaximizeScreen/MaximizeScreen"
import Profile from "./Profile/Profile"

const HeaderRight = () => {
  return (
    <div className="nav-right">
      <ul className="header-right">
        <DarkMode />
        <MaximizeScreen />
        <Profile/>
        </ul>
    </div>
  );
};

export default HeaderRight;
