import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const [loggingUser] = useContext(UserContext);

    return (
        <React.Fragment>
            <Route
                {...rest}
                render={({ location }) =>
                    loggingUser.email ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        </React.Fragment>
    );
};

export default PrivateRoute;
