import DirectoryItem from '../directory-item/directory-item.component'
import './directory-menu.style.scss'

const DirectoryMenu = ( {categories} ) => {
    return (
        <div className='directory-menu-container'>
        {
            categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
                )
            )
        }
        </div>
    );
}

export default DirectoryMenu;
