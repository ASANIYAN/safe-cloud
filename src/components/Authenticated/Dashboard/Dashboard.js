import DashboardContent from "./DashboardContent";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";

const Dashboard = () => {
    return (
        <section className="w-full">
            <div className="flex justify-between" style={{maxWidth: "1600px", margin: "0 auto"}}>
                <Navigation />
                <SearchBar />
            </div>
            <div className="border border-gray-100 w-full mt-4 md:mt-1"></div>
            <DashboardContent />
        </section>
    );
}
 
export default Dashboard;