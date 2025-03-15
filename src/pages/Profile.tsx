import EditUserDetails from "../components/EditUserDetails";
import ExportData from "../components/ExportData";

const Profile = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className=" ">
        <EditUserDetails />
      </div>

      <div>
        <ExportData />
      </div>
    </div>
  );
};

export default Profile;
