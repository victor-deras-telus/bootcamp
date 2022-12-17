import { Button, Card, Collapse, DatePicker, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import TransactionListing from "./TransactionListing";

const TransactionFilteredTable = (categoriesData, accountsData) => {
  const dateFormat = "YYYY/MM/DD";
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [accountId, setAccountId] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [filterSelected, setFilterSelected] = useState(false);
  const [filters, setFilters] = useState({accountFilter:undefined,categoryFilter:undefined,startFilter:undefined,endFilter:undefined});
 
 
  useEffect(() => {
    console.log({accountId,categoryId,startDate,endDate});
    if(accountId || categoryId || startDate || endDate){
      setFilters({accountFilter:accountId,categoryFilter:categoryId,startFilter:startDate,endFilter:endDate});
    }
  }, [accountId, categoryId, endDate, startDate]);


  const getAccountOptions = (dataAccounts) => {
    const result = [];
    dataAccounts.forEach((accountType) => {
      const accounts = accountType.Accounts;

      accounts.forEach((item) => {
        result.push({
          label: item.name,
          value: item.id,
        });
      });
    });
    return result;
  };

 

  const getCategoryOptions = (dataCats) => {
    const result = [];
    dataCats.forEach((category) => {
      
        result.push({
          label: category.name,
          value: category.id,
          key: `key-${category.id}`,
        });

    });
    return result;
  };
 
  const resetFilters = () =>{
    setAccountId(undefined);
    setCategoryId(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    return;
  }

  const handleAccountChange = e => {
    setAccountId(e);
  };

  const handleCategoryChange = e => {
    setCategoryId(e);
  };

  const handleStartChange = e => {
    setStartDate(e);
  };

  const handleEndChange = e => {
    setEndDate(e);
  };

  return (
    <>
      <Card>
        <Space direction="horizontal" size="large" align="start">
          <div>Filters</div>
          <div>
            <DatePicker  format={dateFormat} placeholder="Start Date" value={filterSelected?startDate:undefined} onChange={handleStartChange}/>
          </div>
          <div>
            <DatePicker format={dateFormat} placeholder="End Date" value={endDate} onChange={handleEndChange}/>
          </div>
          <div>
            <Select placeholder="Category" options={getCategoryOptions(categoriesData.categoriesData)}  style={{ width: 150 }} value={categoryId} onChange={handleCategoryChange}></Select>
          </div>
          <div>
            <Select placeholder="Account" options={getAccountOptions(categoriesData.accountsData)} style={{ width: 250 }} value={accountId} onChange={handleAccountChange}></Select>
          </div>
          <div>
            <Button type="primary" onClick={resetFilters}>Reset filters</Button>
          </div>          
        </Space>
      </Card>
      <Card>
        <TransactionListing title={''} maxTransactions={200}  categoryFilter = {filters.categoryFilter} accountFilter = {filters.accountFilter} startDateFilter = {filters.startFilter} endDateFilter = {filters.endFilter} />
        {/* {
          TransactionListing('',200,categoryId,accountId,startDate,endDate)
        } */}
      </Card>

    </>
  );
};

export default TransactionFilteredTable;
