import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Logout () {
    useEffect(() => {
        localStorage.removeItem("decisionMakerToken");
        localStorage.removeItem("decisionMakerUID");
    });

    const history = useHistory();

    return(
        <div>{history.push("/")}</div>
    );
};

export default Logout;
