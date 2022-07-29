const FolderBreadCrumbs = ({ currentFolder }) => {
    return (
        <span>
            {
                currentFolder && currentFolder.name
            }
        </span>
    )
}
 
export default FolderBreadCrumbs;