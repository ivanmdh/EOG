import { Spinner } from "reactstrap"

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color="primary" />
        </div>
    )
}

export default Loader