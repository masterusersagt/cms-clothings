import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryMenuContainer } from './directory-menu.styles';

const DirectoryMenu = ( {categories} ) => {
    return (
        <DirectoryMenuContainer>
        {
            categories.map((category) => (
                    <DirectoryItem key={category.id} category={category} />
                )
            )
        }
        </DirectoryMenuContainer>
    );
}

export default DirectoryMenu;

