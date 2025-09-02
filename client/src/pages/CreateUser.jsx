import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        return (
            <></>
        )
    }
}
export default CreateUser;
