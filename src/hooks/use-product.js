import { useContext } from 'react';
import { ProductContext } from '@/contexts/ProductContext/product-context';

export const useProduct = () => useContext(ProductContext);
