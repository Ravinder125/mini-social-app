
const CustomPagination = ({ limit = 5, page, setPage, totalPages }) => {
    return (
        <div
            style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >

            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >

                Prev

            </button>

            <span
                style={{
                    margin: "0 10px"
                }}
            >

                Page {page} of {totalPages}

            </span>

            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >

                Next

            </button>

        </div>
    )
}

export default CustomPagination