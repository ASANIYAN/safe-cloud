import DashboardContent from "./DashboardContent";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";

const Dashboard = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row">
                <Navigation />
                <SearchBar />
            </div>
            <div className="border border-gray-100 w-full mt-4 md:mt-1"></div>
            <DashboardContent />
        </div>
    );
}
 
export default Dashboard;