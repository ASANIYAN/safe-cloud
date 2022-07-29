import { useState } from "react";

const PasswordToggle = () => {
    const [visibility, setVisibility] = useState(false);
    const [repeatVisibility, setRepeatVisibility] = useState(false);
    const inputType = visibility ? "text" : "password";
    const repeatInputType = repeatVisibility ? "text" : "password";

    return [inputType, visibility, setVisibility, repeatInputType, repeatVisibility, setRepeatVisibility];
}
 
export default PasswordToggle;