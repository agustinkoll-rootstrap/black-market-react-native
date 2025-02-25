import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Settings = ({ color = '#000', ...props }: SvgProps) => (
    <Svg width={24} height={24} viewBox="0 0 16 12" fill="none" {...props}>
      <Path
        d="M1.5 11.625C1.28333 11.625 1.10433 11.5543 0.963 11.413C0.821 11.271 0.75 11.0917 0.75 10.875C0.75 10.675 0.821 10.5 0.963 10.35C1.10433 10.2 1.28333 10.125 1.5 10.125H17.5C17.7167 10.125 17.896 10.2 18.038 10.35C18.1793 10.5 18.25 10.675 18.25 10.875C18.25 11.0917 18.1793 11.271 18.038 11.413C17.896 11.5543 17.7167 11.625 17.5 11.625H1.5ZM1.5 6.75C1.28333 6.75 1.10433 6.679 0.963 6.537C0.821 6.39567 0.75 6.21667 0.75 6C0.75 5.78333 0.821 5.604 0.963 5.462C1.10433 5.32067 1.28333 5.25 1.5 5.25H17.5C17.7167 5.25 17.896 5.32067 18.038 5.462C18.1793 5.604 18.25 5.78333 18.25 6C18.25 6.21667 18.1793 6.39567 18.038 6.537C17.896 6.679 17.7167 6.75 17.5 6.75H1.5ZM1.5 1.875C1.28333 1.875 1.10433 1.8 0.963 1.65C0.821 1.5 0.75 1.325 0.75 1.125C0.75 0.908333 0.821 0.729333 0.963 0.588C1.10433 0.446 1.28333 0.375 1.5 0.375H17.5C17.7167 0.375 17.896 0.446 18.038 0.588C18.1793 0.729333 18.25 0.908333 18.25 1.125C18.25 1.325 18.1793 1.5 18.038 1.65C17.896 1.8 17.7167 1.875 17.5 1.875H1.5Z"
        fill={color}
      />
    </Svg>
  );
