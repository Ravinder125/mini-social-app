import DeleteBtn from "./DeleteBtn"

const CommentCard = ({ comment, onClick }) => {
    return (
        <div className="comments-card">
            <div className="comments-card--header">
                <h4>{comment.user.name}</h4>
                <small>{(new Date(comment.createdAt).toLocaleDateString())}</small>
            </div>
            <h5>{comment.user.email}</h5>
            <p>{comment.text}</p>

            {
                comment.canDelete && (
                    <DeleteBtn id={comment._id} onClick={onClick} />
                )
            }
        </div>
    )
}

export default CommentCard