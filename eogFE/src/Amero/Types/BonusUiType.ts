import { ReactNode } from "react";
interface TimelineItem {
  id: number;
  colClass: string;
  color: string;
  date: string;
  header: string;
  paragraph: string;
  verticalLine1?: string;
  verticalLine2?: string;
}

export interface HorizontalTimelineType {
  id: number;
  mainClass: string;
  child: TimelineItem[];
}
export interface AlertOptions {
  [key: string]: any;
}

export interface DefaultSliderItem {
  id: number;
  image: string;
  captionHeader?: string;
  captionText?: string;
  interval?: string;
}

export interface CarouselItemData extends DefaultSliderItem {
  "data-interval": number;
}

export interface DefaultPaginationListProp {
  pageClass?: string;
  pageColor: string;
}
export interface SocialMediaProp {
  className?: string;
}

export interface UniqueToastContentProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export interface CommonToastProps {
  icon: ReactNode;
  smallClass?: string;
  strongText: string;
  smallText: string;
  bodyText: string;
}

export interface ToastPlacementContentProp {
  selectedPosition: string;
}

export interface HorizontalTimelineProp {
  mainClass: string;
  child: Child[];
}

interface Child {
  colClass: string;
  color: string;
  date: string;
  header: string;
  paragraph: string;
  verticalLine1?: string;
  verticalLine2?: string;
}
export interface ImageLabelProp {
  onSelectFile: React.ChangeEventHandler<HTMLInputElement> | undefined;
  scale: string | number | readonly string[] | undefined;
  imgSrc: string;
  setScale: (arg0: number) => void;
  rotate: string | number | readonly string[] | undefined;
  setRotate: (arg0: number) => void;
  aspect: number | undefined;
  handleToggleAspectClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface CommonDataProp {
  headerClass?: string;
  headingClass?: string;
  title: string;
  text: string;
  span: string;
  bodyClass?: string;
  sm?: string;
  footerClass?: string;
  textClass?: string;
  footerTextClass?: string
}

export interface CommonCardProp {
  data: CommonDataProp;
}
export interface CarouselDataProp {
  id: number;
  image: string;
  captionText?: string;
  captionHeader?: string;
}

export interface CommonCarouselProp {
  data: { id: number; image: string }[];
  control?: boolean;
  indecators?: boolean;
  caption?: boolean;
  slide?: boolean;
  interval?: string;
  ride?: "carousel";
  fade?: boolean;
  lightCaption?: boolean;
  dark?: boolean;
}

export interface ReactstrapCarouselItem {
  id: number;
  image: string;
  captionHeader?: string;
  captionText?: string;
  interval?: string;
}

interface Span {
  text: string;
  spanText?: string;
}

export interface RibbonProp {
  className: string;
  ribbonClass: string;
  title?: string;
  span: Span[];
  icon?: JSX.Element;
}

export interface CommonFileUploadProp {
  maxFiles?: number;
  multiple?: boolean;
  body?: boolean;
}

export interface CommonTourSocialMediaProp {
  time?: string;
  className?: string;
}

export interface CommonTourHeaderProp {
  date: string;
  time: string;
}
export interface BasicTreesProp {
  variant?: string;
  isOpen?: boolean;
  className?: string;
  onClick?: (e: object) => void;
}