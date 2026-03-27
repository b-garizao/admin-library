import { GetProp, UploadProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export declare const getBase64: (file: FileType) => Promise<string>;
export declare const PreviewImage: ({ file, open, onClose }: any) => import("react/jsx-runtime").JSX.Element;
export {};
