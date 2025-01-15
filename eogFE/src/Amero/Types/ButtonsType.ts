export interface CommonButtonsDataType {
    id: string;
    color: string;
    title: string;
    size?: string;
    active?: boolean;
    disabled?: boolean;
    outline?: boolean;
    btnClass?: string;
    toolTipText?: string
}
export interface CommonButtonsInterface {
    commonButtonsData: CommonButtonsDataType[];
    title: string;
    subTitle?: SubTitleObjectType[];
}

export interface CommonToolTipProp {
    id: string;
    toolTipText?: string;
}

export interface ButtonGroupProps {
    color: string;
    btnClass?: string;
    title1: string;
    title2: string;
    title3: string;
    colClass?: string;
}

export interface SubTitleObjectType {
    text?: string;
    code?: string;
};