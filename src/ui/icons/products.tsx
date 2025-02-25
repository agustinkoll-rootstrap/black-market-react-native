import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Products = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M23.3625 31.5C23.1625 31.5 22.9668 31.4583 22.7755 31.375C22.5835 31.2917 22.4208 31.1833 22.2875 31.05L13.4875 22.25C13.3375 22.1 13.2208 21.9333 13.1375 21.75C13.0542 21.5667 13.0125 21.3667 13.0125 21.15V14C13.0125 13.5833 13.1585 13.2293 13.4505 12.938C13.7418 12.646 14.0958 12.5 14.5125 12.5H21.6625C21.8625 12.5 22.0585 12.5417 22.2505 12.625C22.4418 12.7083 22.6042 12.8167 22.7375 12.95L31.5375 21.75C31.8375 22.05 31.9875 22.4123 31.9875 22.837C31.9875 23.2623 31.8458 23.6167 31.5625 23.9L24.4125 31.05C24.2792 31.1833 24.1208 31.2917 23.9375 31.375C23.7542 31.4583 23.5625 31.5 23.3625 31.5ZM17.0125 17.75C17.3625 17.75 17.6585 17.629 17.9005 17.387C18.1418 17.1457 18.2625 16.85 18.2625 16.5C18.2625 16.15 18.1418 15.854 17.9005 15.612C17.6585 15.3707 17.3625 15.25 17.0125 15.25C16.6625 15.25 16.3668 15.3707 16.1255 15.612C15.8835 15.854 15.7625 16.15 15.7625 16.5C15.7625 16.85 15.8835 17.1457 16.1255 17.387C16.3668 17.629 16.6625 17.75 17.0125 17.75Z"
      fill={color}
    />
  </Svg>
);
