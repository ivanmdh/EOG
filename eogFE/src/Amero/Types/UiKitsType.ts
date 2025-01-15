import { Direction } from "reactstrap/types/lib/Dropdown";
import { JSX } from "react";
export interface SimpleTabContentProp {
    tabId: string;
}
interface ModalDataTypes {
    isOpen: boolean;
    header?: boolean;
    class?: string;
    footer?: boolean;
    toggler: () => void
    title?: string;
    size?: string;
    bodyClass?: string;
    button?: string;
    center?: boolean;
}

export interface CommonModalProps {
    modalData: ModalDataTypes
    children: string | JSX.Element | JSX.Element[]
}

export interface OtherModalProps {
    modal: boolean;
    toggle: () => void;
}

export interface StaticModalFormProp {
    toggle: () => void;
}

export interface BasicDropdownType {
    class: string;
    divClass?: string;
    bodyClass?: string;
    position?: Direction
    text: string;
    menulist: string[];
}

export interface DropdownCommonProp {
    item: BasicDropdownType;
    toggleClass?: string;
}
export interface CollapseStateProp {
    collapse1: boolean;
    collapse2: boolean;
}

export interface CollapseBodyProp {
    collapseId: CollapseStateProp
}

export interface TooltipStateProps {
    tooltip1: boolean;
    tooltip2: boolean;
    tooltip3: boolean;
}
interface GridTableBodyList {
    id: number;
    text: string | JSX.Element;
    span?: number;
}

export interface GridTableBodyItems {
    id: number;
    head: string;
    data: GridTableBodyList[]
}

export interface GridFooterProps {
    code: string;
    value: string;
}

interface CommonPopoverItems {
    id?: string;
    placement?: any;
    popoverHeader?: string;
    popoverBody?: string;
    btnColor?: string;
    btnText?: string;
    trigger?: string;
    size?: string;
    btnClass?: string;
}
export interface CommonPopoverType {
    data: CommonPopoverItems
}
