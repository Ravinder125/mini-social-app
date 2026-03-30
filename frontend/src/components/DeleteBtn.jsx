
const DeleteBtn = ({ id, onClick }) => {
    return (
        <div className="delete-btn" onClick={() => onClick(id)}>
            <button>
                Delete
            </button>
        </div>
    )
}

export default DeleteBtn