interface FaqItemData {
  id: number;
  title: string;
  paragraph: string;
}

export interface AccordionCardPropsType {
  item: FaqItemData;
}

export interface SupportDataType {
  id: number;
  image: string;
  position: string;
  salary: string;
  office: string;
  skill: number;
  extn: number;
  email: string;
  name: string;
  skillColor:string
}

export interface SkillsDataProp{
  value: number;
  skillColor:string
}

export interface ImageDataProp{
  image:string;
  title:string
}

export interface CommonLearningHeaderProp {
  heading: string;
  isOpen: boolean;
  setIsOpen: (parameter: boolean) => void;
}
export interface HeaderWithIconPropsTypes {
  setIsOpen: (parameter: boolean) => void;
  isOpen: boolean;
  heading: string;
}

export interface SimilarJobsCardsType {
  limit: number;
  jobClass: string;
  ribbon: boolean;
  column: boolean;
}
export interface UserCommentPropsType {
  ImageSrc: string;
  text: string;
  userReplay?: boolean;
}
