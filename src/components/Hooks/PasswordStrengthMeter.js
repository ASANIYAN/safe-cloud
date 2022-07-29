import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }) => {

    const testResult = zxcvbn(password);
    const num = testResult.score * 100/4;

    const progressColor = () => {
        switch (testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9BC158';
            case 4:
                return '#00BCB1';
            default:
                return 'none';
        }
    }
    
    const passwordLabel = () => {
        switch (testResult.score) {
            case 0:
                return 'Very weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    }

    const changePasswordColor = () => ({
        width: `${num}%`,
        backgroundColor: progressColor(),
    })

    return (
        <>
            <div className="password-progress h-0.5 bg-gray-100">
                <div className="password-progress-bar h-full transition-all duration-500 ease"
                style={changePasswordColor()}
                >
                </div>
            </div>
            <small className="text-gray-500 text-sm">
                Password strength: 
                <span
                style={{ color: progressColor() }}
                >
                    {
                        passwordLabel()
                    }
                </span>
            </small>
        </>
    );
}
 
export default PasswordStrengthMeter;