import { Spinner } from "reactstrap"

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
            <Spinner color="primary" />
        </div>
    )
}

export default Loader