import * as react_jsx_runtime from 'react/jsx-runtime';
import { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
declare const getBase64: (file: FileType) => Promise<string>;
declare const PreviewImage: ({ file, open, onClose }: any) => react_jsx_runtime.JSX.Element;

interface IconModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (iconName: string) => void;
    selectedValue?: string;
}
declare const IconModal: ({ open, onClose, onSelect, selectedValue, }: IconModalProps) => react_jsx_runtime.JSX.Element;

export { IconModal, PreviewImage, getBase64 };
