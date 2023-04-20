import { useContext, useState, useEffect, Fragment } from 'react';
import { useSelector }                               from 'react-redux';
import { useParams }                                 from 'react-router-dom';

import ProductCard                                   from '../../components/product-card/product-card.component';

import { selectCategoriesMap }                       from '../../store/categories/categories.selector';

import { CategoryContainer, Title }                  from './category.styles';

//import { CategoriesContext } from '../../contexts/categories.context';

const Category = () => {
  console.log('render/re-rendering category component');
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
//  const { categoriesMap } = useContext(CategoriesContext);
 
  useEffect(() => {
    console.log('effect fired calling setProduct');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
      {
        products && products.map( (product) => (
            <ProductCard key={product.id} product={product} />
          )
        )
      }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
