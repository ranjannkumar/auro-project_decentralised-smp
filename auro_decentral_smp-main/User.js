import React, {
    useState,
    useEffect
} from "react";
import {
    fetchReputation,
    boostReputation,
    registerUserProfile
} from "../utils/blockchain";

function User() {
    const [username, setUsername] = useState("");
    const [reputation, setReputation] = useState(0);
    const walletAddress = "0xYourWalletAddress";

    useEffect(() => {
        async function loadReputation() {
            const reputationScore = await fetchReputation(walletAddress);
            setReputation(reputationScore);
        }
        loadReputation();
    }, [walletAddress]);

    const createProfile = async () => {
        const feedback = await registerUserProfile(username);
        alert(feedback);
    };

    const increaseUserReputation = async () => {
        await boostReputation(walletAddress, 10);
        const updatedScore = await fetchReputation(walletAddress);
        setReputation(updatedScore);
    };

    return ( <div>
        <h2> User Profile < /h2> 
        <input type = "text"
        placeholder = "Enter your username"
        value = {username}
        onChange = {
            (e) => setUsername(e.target.value)
        }
        /> 
        <button onClick = {createProfile} > Create Profile < /button> 
            <h3> Reputation: {reputation} </h3> 
            <button onClick = {increaseUserReputation}> Increase Reputation </button> 
            </div>
    );
}

export default User;
