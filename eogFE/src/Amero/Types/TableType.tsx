import { ChangeEvent, ReactNode, JSX } from "react";

interface DetailsTableProp {
  text?: string;
  code?: string;
}

interface DataTableProp {
  title: string;
  tdClassName?: string;
  tableColData?: JSX.Element;
  details: DetailsTableProp[];
}

export interface CommonTableComponentProp {
  title: string;
  tableClass?: string;
  tdClassName?: string;
  tableColData?: JSX.Element;
  data: DataTableProp[];
}

export interface TableActionType {
  id: string;
}

export interface ZeroConfigurationTableColumnsType {
  id: number;
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
  action: string;
}

export interface CustomCellInterFace {
  position: string;
  color: string;
}

export interface TableActionTypes {
  id: string;
}

export interface StateSavingTableDataType {
  id: number;
  name: string;
  position: string;
  color: string;
  office: string;
  age: string;
  startDate: string;
  salary: string;
  action: string;
}

export interface ScrollImageType {
  image: string;
  title: string;
}

export interface ScrollVerticalType {
  name:string;
  title:string
  position: string;
  office: string;
  age: string;
  startDate: string;
  salary: string;
  action: string;
}

export interface StockResultTableData {
  name: string;
  symbol: string;
  price: string;
  difference: number;
  last: JSX.Element;
}

export interface CustomCellInterFaceProp {
  value: number;
}

export interface RowCreateCallBackData {
  name: string;
  email: string;
  experience: string;
  sex: string;
  contactNumber: string;
  salary: number;
}

export interface AddRowsTable {
  column1: number;
  column2: number;
  column3: number;
  column4: number;
  column5: number;
}

export interface CustomExpandableComponentProp {
  data: {
    id: number;
    name: string;
    position: string;
    office: string;
    age: number;
    startDate: string;
    salary: string;
    action: string;
  };
}

export interface DeleteRowData {
  name: string;
  id:number,
  job: string;
  companyName: string;
  invoiceNumber: string;
  credit: JSX.Element;
  date: string;
  priority: ReactNode;
  budget: string;
  action: JSX.Element;
}

export interface DeleteRowDataProp {
  position: string;
  office: string;
  age: number;
  startDate: string;  
  salary: string;
  image:string;
  name:string;
}

export interface FilteringTableNameProp {
  image: string;
  name: string;
}

export interface TableSearchBarPropsType {
  handleMinAgeChange: (eve: ChangeEvent<HTMLInputElement>) => void;
  handleMaxAgeChange: (eve: ChangeEvent<HTMLInputElement>) => void;
}

export interface HtmlColumnsInterface {
  name: string;
  position: string;
  salary: string;
  office: string;
  cv: JSX.Element;
  email: string;
  color: string;
  badge: string;
  id: number;
}

export interface ActionDataSourceProp {
  id: number;
}

export interface CustomCellInterFaces {
  position: string;
  color: string;
}

export interface AjaxSourcedColumnsInterface {
  name: string;
  position: string;
  office: string;
  date: string;
  extends: string;
  salary: string;
}

export interface ServerSideProcessingColumnsInterface {
  name: string;
  position: string;
  office: string;
  lastName: string;
  date: string;
  salary: string;
}
interface HeadDataProp {
  id: number;
  head: string;
}

export interface CommonTableProp {
  tableClass?: string;
  strip?: boolean;
  caption?: string;
  size?: string;
  hover?: boolean;
  headClass?: string;
  headRowClass?: string;
  headData: HeadDataProp[];
  children: ReactNode;
}