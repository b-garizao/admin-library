import { GetProp, Image, Modal, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const PreviewImage = ({ file, open, onClose }: any) => {
  const previewImage = file?.url || (file?.preview as string);
  const previewTitle =
    file?.name || file?.url!.substring(file?.url!.lastIndexOf("/") + 1);

  return (
    <Modal
      open={open}
      title={previewTitle}
      footer={null}
      onCancel={() => onClose(false)}
      destroyOnHidden={true}
    >
      {previewImage?.includes("video") ||
      previewTitle?.match(/\.(mp4|webm|ogg)$/i) ||
      previewImage?.match(/\.(mp4|webm|ogg)(\?|$)/i) ? (
        <video controls className="w-full" autoPlay>
          <source src={previewImage} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          alt="preview"
          style={{ width: "100%" }}
          src={previewImage}
          preview={false}
        />
      )}
    </Modal>
  );
};
