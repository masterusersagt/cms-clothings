import { createContext, useState, useEffect } from 'react';
import { 
    addCollectionAndDocuments,
    getCategoriesAndDocuments
    }                                         from '../util/firebase/firebase.util';
import SHOP_DATA                              from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
    // const [ products, setProducts ] = useState([PRODUCTS]);
    const [ categoriesMap, setCategoriesMap ] = useState({});
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log("read from db:", categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);

    const value = { categoriesMap };

    console.log('Product', categoriesMap);
    return ( <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider> );
}

