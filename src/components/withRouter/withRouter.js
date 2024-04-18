import { useLocation, useParams, useNavigate } from 'react-router-dom'

export const withRouter = (Component) => {
    function ComponentWithRouterProps(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProps;
}
