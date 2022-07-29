import { useAuth } from "../Context/AuthContext";

const Progressbar = () => {
    const { width } = useAuth();
    return (
        <div className="w-full rounded h-0.5 mt-2 bg-gray-100">
            <div className="bg-progressbar h-full" id="progressbar" style={{width: `${width}%`}}>
            </div>
        </div>
    );
}
 
export default Progressbar;