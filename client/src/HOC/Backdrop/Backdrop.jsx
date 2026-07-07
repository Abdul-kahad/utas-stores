import Modal from "../Modal/Modal"

const Backdrop = (props) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn z-index-40">
            <Modal title={props.title} action={props.action} cancel={props.cancel} confirm={props.confirm}/> 
        </div>
    )
}
export default Backdrop