'use client';

import { useRef, useState } from 'react';

type UploadImageProps = {
    onUploadFiles: ((formData: FormData) => void) | (() => void);
    multiple?: boolean;
    uploadfileLength?: number;
    id: string;
    imgpreviewWidth?: number;
    imgpreviewHeight?: number;
    imgClassName?: string;
    buttonpositionClassName?: string;
    showPreview?: boolean;
    imgUrl?: string[];
};

const UploadImage = ({
    id,
    onUploadFiles,
    multiple,
    uploadfileLength = 5,
    imgpreviewWidth,
    imgpreviewHeight,
    imgClassName,
    buttonpositionClassName,
    showPreview = true,
    imgUrl,
}: UploadImageProps) => {
    const [uploadedFiles, setUploadedFiles] = useState<(string | File)[]>(imgUrl || []);
    const ref = useRef<HTMLInputElement | null>(null);

    const handleuploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);

            const updatedFiles = [...uploadedFiles, ...newFiles];
            setUploadedFiles(updatedFiles);

            const formData = new FormData();
            updatedFiles.forEach(file => formData.append('files', file));

            onUploadFiles(formData);
        }
    };

    const handledeleteFile = (index: number) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);

        const formData = new FormData();
        updatedFiles.forEach(file => formData.append('files', file));

        onUploadFiles(formData);
    };

    return (
        <>
            <div className='relative flex flex-row gap-2 items-start'>
                <input
                    id={id}
                    type='file'
                    className='hidden'
                    onChange={handleuploadFile}
                    multiple={multiple}
                    ref={ref}
                />
                <div className='absolute flex gap-x-[9px] bottom-16 z-10'>
                    {showPreview &&
                        uploadedFiles?.map((file, index) => (
                            <div
                                key={index}
                                className='relative '
                                style={{
                                    width: `${imgpreviewWidth}px`,
                                    height: `${imgpreviewHeight}px`,
                                }}
                            >
                                {typeof file === 'string' ? (
                                    <img src={file} alt={`uploaded-${index}`} className={imgClassName} />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`uploaded-${index}`}
                                        className={imgClassName}
                                    />
                                )}
                                <button
                                    type='button'
                                    onClick={() => handledeleteFile(index)}
                                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center'
                                >
                                    x
                                </button>
                            </div>
                        ))}
                </div>
                {uploadedFiles.length < uploadfileLength && (
                    <label
                        className={`cursor-pointer ${buttonpositionClassName} ml-auto`}
                        onClick={event => {
                            event.stopPropagation();
                            ref.current?.click();
                        }}
                    >
                        <button
                            className='rounded-full overflow-hidden aspect-square w-[3.6rem] cursor-pointer'
                            type='button'
                        >
                            <img
                                src='/icon/icon-gallery.svg'
                                alt='gallery'
                                className='w-full h-full object-cover p-[.6rem]'
                                width={36}
                                height={36}
                            />
                        </button>
                    </label>
                )}
            </div>
        </>
    );
};

export default UploadImage;
