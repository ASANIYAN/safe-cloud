import Navigation from "../Dashboard/Navigation";
import SearchBar from "../Dashboard/SearchBar";
import RecoveryContent from "./RecoveryContent";

const Recovery = () => {
    return (
        <section>
            <div className="flex justify-between" style={{maxWidth: "1600px", margin: "0 auto"}}>
                <Navigation />
                <SearchBar />
            </div>
            <div className="border border-gray-100 w-full mt-4 md:mt-1"></div>
            <RecoveryContent />
        </section>
    );
}
 
export default Recovery;