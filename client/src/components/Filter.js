import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import {
  filterProduct,
  getAllProducts,
} from '../redux/products/product.action';

function Filter({ products }) {
  const { Option } = Select;

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-- Sort by --');
  const [category, setCategory] = useState('-- Select category --');

  const dispatch = useDispatch();

  const filterHandler = () => {
    dispatch(filterProduct({ sort, category, search }));
  };

  const clearFilter = () => {
    setSearch('');
    setSort('-- Sort by --');
    setCategory('-- Select category --');
    dispatch(getAllProducts());
  };

  return (
    <Row style={{ width: '80vw', padding: '2rem 0' }}>
      <Col span={5} offset={1}>
        <Input.Search
          placeholder='Search'
          style={{ width: 200 }}
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
      </Col>
      <Col span={5}>
        <Select
          value={sort}
          onChange={value => {
            setSort(value);
          }}
        >
          <Option value='az'>Name (A-Z)</Option>
          <Option value='za'>Name (Z-A)</Option>
          <Option value='htl'>High to low</Option>
          <Option value='lth'>Low to high</Option>
        </Select>
      </Col>
      <Col span={5}>
        <Select
          value={category}
          onChange={value => {
            setCategory(value);
          }}
        >
          <Option value='all'>All</Option>
          {[
            ...new Set(
              products.map(item => {
                return item.category;
              })
            ),
          ].map((row, id) => {
            return (
              <Option key={id} value={row}>
                {`${row.slice(0, 1).toUpperCase()}${row.slice(1)}`}
              </Option>
            );
          })}
        </Select>
      </Col>
      <Col span={4}>
        <Button
          style={{ backgroundColor: '#010133', color: 'white' }}
          onClick={filterHandler}
        >
          Search
        </Button>
      </Col>
      <Col span={4}>
        <Button
          style={{ backgroundColor: '#010133', color: 'white' }}
          onClick={clearFilter}
        >
          Clear filter
        </Button>
      </Col>
    </Row>
  );
}

export default Filter;
