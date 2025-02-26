import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Fav = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 16" {...props}>
    <Path
      d="M8.33947 15.565L6.98947 14.284C5.3 12.721 3.79621 11.1861 2.47811 9.67927C1.15937 8.17305 0.5 6.5579 0.5 4.83384C0.5 3.46425 0.954105 2.31605 1.86232 1.38924C2.76989 0.463081 3.89474 0 5.23684 0C5.99474 0 6.74884 0.181108 7.49916 0.543323C8.24884 0.906183 8.91579 1.49043 9.5 2.29607C10.0842 1.49043 10.7515 0.906183 11.5018 0.543323C12.2515 0.181108 13.0053 0 13.7632 0C15.1053 0 16.2301 0.463081 17.1377 1.38924C18.0459 2.31605 18.5 3.46425 18.5 4.83384C18.5 6.57402 17.8289 8.20528 16.4868 9.72761C15.1447 11.2506 13.6447 12.7774 11.9868 14.3082L10.6605 15.5408C10.3289 15.8469 9.94211 16 9.5 16C9.05789 16 8.67105 15.855 8.33947 15.565Z"
      fill={color}
    />
  </Svg>
);
